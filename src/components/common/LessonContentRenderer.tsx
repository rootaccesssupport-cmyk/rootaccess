import React from 'react';
import { Terminal, Info } from 'lucide-react';

interface LessonContentRendererProps {
  content: string;
}

/**
 * Parses inline formatting for **bold text**, *italic text*, and `inline code`.
 */
export function renderFormattedInline(text: string): React.ReactNode {
  // Normalize escaped backticks and escaped colons
  const clean = text.replace(/\\`/g, '`');

  // Match **bold**, *italic*, _italic_, or `code`
  const tokens = clean.split(/(\*\*.*?\*\*|`[^`]+`|\*[^*\n]+\*|_[^_\n]+_)/g);

  return tokens.map((token, i) => {
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      return (
        <strong key={i} className="font-bold text-slate-900">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 bg-slate-100 text-indigo-700 font-mono text-xs rounded border border-slate-200"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    if ((token.startsWith('*') && token.endsWith('*') && token.length >= 2) ||
        (token.startsWith('_') && token.endsWith('_') && token.length >= 2)) {
      return (
        <em key={i} className="italic text-slate-800">
          {token.slice(1, -1)}
        </em>
      );
    }
    return token;
  });
}

/**
 * Robust markdown block renderer that splits on lines and groups them into:
 * - Headings (###)
 * - Subheadings (####)
 * - Fenced code blocks (```)
 * - Tables (| Header |)
 * - Bullet lists (•, -, *)
 * - Numbered lists (1., 2.)
 * - Callouts (*Note, _Note)
 * - Standard paragraphs
 */
export const LessonContentRenderer: React.FC<LessonContentRendererProps> = ({ content }) => {
  if (!content) return null;

  const rawLines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let lineIdx = 0;

  while (lineIdx < rawLines.length) {
    const rawLine = rawLines[lineIdx];
    const trimmed = rawLine.trim();

    // 1. Skip completely empty lines
    if (!trimmed) {
      lineIdx++;
      continue;
    }

    // 2. Fenced code blocks
    if (trimmed.startsWith('```')) {
      const lang = trimmed.replace('```', '').trim() || 'javascript';
      const codeLines: string[] = [];
      lineIdx++;
      while (lineIdx < rawLines.length && !rawLines[lineIdx].trim().startsWith('```')) {
        codeLines.push(rawLines[lineIdx]);
        lineIdx++;
      }
      if (lineIdx < rawLines.length) {
        lineIdx++; // skip closing ```
      }

      elements.push(
        <div
          key={`code-${lineIdx}`}
          className="my-3 rounded-xl overflow-hidden bg-slate-900 text-slate-100 border border-slate-800 shadow-sm"
        >
          <div className="bg-slate-800/90 px-4 py-2 border-b border-slate-700/80 flex items-center justify-between text-xs text-slate-300 font-mono">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>{lang}</span>
            </span>
          </div>
          <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
      continue;
    }

    // 3. Markdown Tables (starts with |)
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (lineIdx < rawLines.length && rawLines[lineIdx].trim().startsWith('|')) {
        tableLines.push(rawLines[lineIdx].trim());
        lineIdx++;
      }

      if (tableLines.length >= 2) {
        const headerRow = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        // skip separator line (e.g. |---|---|)
        const bodyRows = tableLines.slice(2).map((row) =>
          row
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim())
        );

        elements.push(
          <div key={`table-${lineIdx}`} className="overflow-x-auto my-4 border border-slate-200 rounded-xl shadow-xs">
            <table className="min-w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                <tr>
                  {headerRow.map((cell, cIdx) => (
                    <th key={cIdx} className="p-3">
                      {renderFormattedInline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {bodyRows.map((r, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                    {r.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 text-slate-700">
                        {renderFormattedInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // 3.5. ASCII Art Diagrams (starts with ┌ or contains box-drawing characters)
    if (trimmed.startsWith('┌') || trimmed.startsWith('+--') || trimmed.includes('┌───────')) {
      const artLines: string[] = [];
      while (
        lineIdx < rawLines.length &&
        rawLines[lineIdx].trim() !== '' &&
        (rawLines[lineIdx].includes('│') ||
          rawLines[lineIdx].includes('┌') ||
          rawLines[lineIdx].includes('└') ||
          rawLines[lineIdx].includes('├') ||
          rawLines[lineIdx].includes('──'))
      ) {
        artLines.push(rawLines[lineIdx]);
        lineIdx++;
      }

      elements.push(
        <div key={`ascii-${lineIdx}`} className="my-3 p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto shadow-inner">
          <pre>{artLines.join('\n')}</pre>
        </div>
      );
      continue;
    }

    // 3.8. Blockquotes and Callout boxes (> ...)
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (lineIdx < rawLines.length && rawLines[lineIdx].trim().startsWith('>')) {
        quoteLines.push(rawLines[lineIdx].trim().replace(/^>\s*/, ''));
        lineIdx++;
      }
      elements.push(
        <div
          key={`quote-${lineIdx}`}
          className="my-3.5 p-4 rounded-xl bg-indigo-50/80 border-l-4 border-indigo-500 text-xs sm:text-sm text-indigo-950 shadow-2xs flex items-start gap-3"
        >
          <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed font-medium">
            {renderFormattedInline(quoteLines.join(' '))}
          </div>
        </div>
      );
      continue;
    }

    // 4. Headings: #, ##, ###
    if (trimmed.startsWith('# ') || trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
      const headingText = trimmed.replace(/^#{1,3}\s+/, '');
      elements.push(
        <h3
          key={`h3-${lineIdx}`}
          className="text-base sm:text-lg font-extrabold text-slate-900 mt-6 mb-2.5 pt-4 border-t border-slate-100 first:border-t-0 first:pt-0 flex items-center gap-2"
        >
          <span className="w-1.5 h-4 rounded-full bg-indigo-600 inline-block"></span>
          <span>{renderFormattedInline(headingText)}</span>
        </h3>
      );
      lineIdx++;
      continue;
    }

    // 5. Subheadings: ####
    if (trimmed.startsWith('#### ')) {
      const subHeadingText = trimmed.replace(/^####\s+/, '');
      elements.push(
        <h4 key={`h4-${lineIdx}`} className="text-sm sm:text-base font-bold text-slate-900 mt-4 mb-1.5 text-indigo-900">
          {renderFormattedInline(subHeadingText)}
        </h4>
      );
      lineIdx++;
      continue;
    }

    // 6. Bullet Lists: lines starting with •, -, or * (excluding *Note)
    const isBulletLine = (line: string) =>
      /^(\s*[•\-*]\s+)/.test(line) && !line.trim().startsWith('*Note') && !line.trim().startsWith('*Security');

    if (isBulletLine(rawLine)) {
      const bulletItems: string[] = [];
      while (lineIdx < rawLines.length && (isBulletLine(rawLines[lineIdx]) || rawLines[lineIdx].trim() === '')) {
        if (rawLines[lineIdx].trim() !== '') {
          bulletItems.push(rawLines[lineIdx].replace(/^\s*[•\-*]\s+/, ''));
        }
        lineIdx++;
      }

      elements.push(
        <ul key={`ul-${lineIdx}`} className="space-y-2 my-2.5 pl-1">
          {bulletItems.map((item, bIdx) => (
            <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="text-indigo-600 font-bold shrink-0 mt-0.5">•</span>
              <span>{renderFormattedInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 7. Numbered Lists: lines starting with digits like 1. or 2.
    const isNumberedLine = (line: string) => /^\s*\d+\.\s+/.test(line);

    if (isNumberedLine(rawLine)) {
      const numberedItems: { num: string; text: string }[] = [];
      while (lineIdx < rawLines.length && (isNumberedLine(rawLines[lineIdx]) || rawLines[lineIdx].trim() === '')) {
        if (rawLines[lineIdx].trim() !== '') {
          const match = rawLines[lineIdx].match(/^\s*(\d+)\.\s+(.*)$/);
          if (match) {
            numberedItems.push({ num: match[1], text: match[2] });
          }
        }
        lineIdx++;
      }

      elements.push(
        <ol key={`ol-${lineIdx}`} className="space-y-2 my-2.5 pl-1">
          {numberedItems.map((item, nIdx) => (
            <li key={nIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {item.num}
              </span>
              <span>{renderFormattedInline(item.text)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 8. Informational Notes / Security Callouts: *Note: ... or *Security Note: ...
    if (trimmed.startsWith('*Note') || trimmed.startsWith('*Security') || trimmed.startsWith('*Cross-Browser')) {
      const calloutText = trimmed.replace(/^\*/, '').replace(/\*$/, '');
      elements.push(
        <div
          key={`note-${lineIdx}`}
          className="my-3 p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200/80 text-xs sm:text-sm text-indigo-950 flex items-start gap-2.5 leading-relaxed"
        >
          <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>{renderFormattedInline(calloutText)}</div>
        </div>
      );
      lineIdx++;
      continue;
    }

    // 9. Standard Paragraph
    const paragraphLines: string[] = [];
    while (
      lineIdx < rawLines.length &&
      rawLines[lineIdx].trim() !== '' &&
      !rawLines[lineIdx].trim().startsWith('#') &&
      !rawLines[lineIdx].trim().startsWith('>') &&
      !rawLines[lineIdx].trim().startsWith('```') &&
      !rawLines[lineIdx].trim().startsWith('|') &&
      !isBulletLine(rawLines[lineIdx]) &&
      !isNumberedLine(rawLines[lineIdx]) &&
      !rawLines[lineIdx].trim().startsWith('*Note') &&
      !rawLines[lineIdx].trim().startsWith('*Security') &&
      !rawLines[lineIdx].trim().startsWith('*Cross-Browser')
    ) {
      paragraphLines.push(rawLines[lineIdx].trim());
      lineIdx++;
    }

    if (paragraphLines.length > 0) {
      elements.push(
        <p key={`p-${lineIdx}`} className="text-xs sm:text-sm text-slate-700 leading-relaxed my-2">
          {renderFormattedInline(paragraphLines.join(' '))}
        </p>
      );
    }
  }

  return <div className="space-y-2">{elements}</div>;
};
