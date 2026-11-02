import React from 'react';
import { Terminal, Info } from 'lucide-react';

interface LessonContentRendererProps {
  content: string;
  accentColor?: 'indigo' | 'emerald' | 'amber' | 'purple';
}

/**
 * Parses inline formatting for **bold text**, *italic text*, and `inline code`.
 */
export function renderFormattedInline(
  text: string,
  accentColor: 'indigo' | 'emerald' | 'amber' | 'purple' = 'indigo'
): React.ReactNode {
  if (!text) return null;
  // Normalize escaped backticks and escaped colons
  const clean = text.replace(/\\`/g, '`');

  // Match `code` first, then **bold**, then *italic*, then _italic_
  const tokens = clean.split(/(`[^`]+`|\*\*[^*\n]+?\*\*|\*[^*\n]+?\*|_[^_\n]+?_)/g);

  const codeColor = {
    indigo: 'bg-indigo-50/80 text-indigo-700 border-indigo-200/80',
    emerald: 'bg-emerald-50/80 text-emerald-800 border-emerald-200/80',
    amber: 'bg-amber-50/80 text-amber-800 border-amber-200/80',
    purple: 'bg-purple-50/80 text-purple-700 border-purple-200/80',
  }[accentColor];

  return tokens.map((token, i) => {
    if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      return (
        <code
          key={i}
          className={`px-1.5 py-0.5 mx-0.5 font-mono text-xs rounded border font-semibold ${codeColor}`}
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      return (
        <strong key={i} className="font-bold text-slate-900">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (
      (token.startsWith('*') && token.endsWith('*') && token.length >= 2) ||
      (token.startsWith('_') && token.endsWith('_') && token.length >= 2)
    ) {
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
 * - Standalone code statements (`...`)
 * - Tables (| Header |)
 * - Bullet lists (•, -, *)
 * - Numbered lists (1., 2.)
 * - Callouts (*Note, _Note)
 * - Standard paragraphs
 */
export const LessonContentRenderer: React.FC<LessonContentRendererProps> = ({
  content,
  accentColor = 'indigo',
}) => {
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

    // 2.5. Standalone single-line code (starts and ends with ` e.g. `SELECT column1, column2 FROM table_name;`)
    if (trimmed.startsWith('`') && trimmed.endsWith('`') && trimmed.length > 2 && !trimmed.slice(1, -1).includes('`')) {
      const codeContent = trimmed.slice(1, -1);
      const codeTheme = {
        emerald: 'text-emerald-400 border-emerald-900/60',
        amber: 'text-amber-400 border-amber-900/60',
        purple: 'text-purple-400 border-purple-900/60',
        indigo: 'text-indigo-400 border-indigo-900/60',
      }[accentColor];

      elements.push(
        <div
          key={`code-line-${lineIdx}`}
          className={`my-3 px-4 py-2.5 rounded-xl bg-slate-950 font-mono text-xs overflow-x-auto border shadow-2xs leading-relaxed ${codeTheme}`}
        >
          <code>{codeContent}</code>
        </div>
      );
      lineIdx++;
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
                      {renderFormattedInline(cell, accentColor)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {bodyRows.map((r, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                    {r.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 text-slate-700">
                        {renderFormattedInline(cell, accentColor)}
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

      const quoteTheme = {
        emerald: 'bg-emerald-50/80 border-emerald-500 text-emerald-950',
        amber: 'bg-amber-50/80 border-amber-500 text-amber-950',
        purple: 'bg-purple-50/80 border-purple-500 text-purple-950',
        indigo: 'bg-indigo-50/80 border-indigo-500 text-indigo-950',
      }[accentColor];

      const quoteIconColor = {
        emerald: 'text-emerald-600',
        amber: 'text-amber-600',
        purple: 'text-purple-600',
        indigo: 'text-indigo-600',
      }[accentColor];

      elements.push(
        <div
          key={`quote-${lineIdx}`}
          className={`my-3.5 p-4 rounded-xl border-l-4 text-xs sm:text-sm shadow-2xs flex items-start gap-3 ${quoteTheme}`}
        >
          <Info className={`w-4 h-4 shrink-0 mt-0.5 ${quoteIconColor}`} />
          <div className="leading-relaxed font-medium">
            {renderFormattedInline(quoteLines.join(' '), accentColor)}
          </div>
        </div>
      );
      continue;
    }

    // 4. Headings: #, ##, ###
    if (trimmed.startsWith('# ') || trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
      const headingText = trimmed.replace(/^#{1,3}\s+/, '');
      const headingBarColor = {
        emerald: 'bg-emerald-600',
        amber: 'bg-amber-600',
        purple: 'bg-purple-600',
        indigo: 'bg-indigo-600',
      }[accentColor];

      elements.push(
        <h3
          key={`h3-${lineIdx}`}
          className="text-base sm:text-lg font-extrabold text-slate-900 mt-6 mb-2.5 pt-4 border-t border-slate-100 first:border-t-0 first:pt-0 flex items-center gap-2"
        >
          <span className={`w-1.5 h-4 rounded-full inline-block ${headingBarColor}`}></span>
          <span>{renderFormattedInline(headingText, accentColor)}</span>
        </h3>
      );
      lineIdx++;
      continue;
    }

    // 5. Subheadings: ####
    if (trimmed.startsWith('#### ')) {
      const subHeadingText = trimmed.replace(/^####\s+/, '');
      elements.push(
        <h4 key={`h4-${lineIdx}`} className="text-sm sm:text-base font-bold text-slate-900 mt-4 mb-1.5">
          {renderFormattedInline(subHeadingText, accentColor)}
        </h4>
      );
      lineIdx++;
      continue;
    }

    // 6. Bullet Lists: lines starting with •, -, or * (excluding *Note)
    const isBulletLine = (line: string) =>
      /^(\s*[•\-*]\s+)/.test(line) && !line.trim().startsWith('*Note') && !line.trim().startsWith('*Security') && !line.trim().startsWith('*Cross-Browser');

    if (isBulletLine(rawLine)) {
      const bulletItems: string[] = [];
      while (lineIdx < rawLines.length && (isBulletLine(rawLines[lineIdx]) || rawLines[lineIdx].trim() === '')) {
        if (rawLines[lineIdx].trim() !== '') {
          bulletItems.push(rawLines[lineIdx].replace(/^\s*[•\-*]\s+/, ''));
        }
        lineIdx++;
      }

      const bulletColor = {
        emerald: 'text-emerald-600',
        amber: 'text-amber-600',
        purple: 'text-purple-600',
        indigo: 'text-indigo-600',
      }[accentColor];

      elements.push(
        <ul key={`ul-${lineIdx}`} className="space-y-2 my-2.5 pl-1">
          {bulletItems.map((item, bIdx) => (
            <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className={`font-bold shrink-0 mt-0.5 ${bulletColor}`}>•</span>
              <span className="flex-1">{renderFormattedInline(item, accentColor)}</span>
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

      const badgeColor = {
        emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
        amber: 'bg-amber-50 border-amber-200 text-amber-700',
        purple: 'bg-purple-50 border-purple-200 text-purple-700',
        indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      }[accentColor];

      elements.push(
        <ol key={`ol-${lineIdx}`} className="space-y-2 my-2.5 pl-1">
          {numberedItems.map((item, nIdx) => (
            <li key={nIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className={`w-5 h-5 rounded-full border text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${badgeColor}`}>
                {item.num}
              </span>
              <span className="flex-1">{renderFormattedInline(item.text, accentColor)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 8. Informational Notes / Security Callouts: *Note: ... or *Security Note: ...
    if (trimmed.startsWith('*Note') || trimmed.startsWith('*Security') || trimmed.startsWith('*Cross-Browser')) {
      const calloutText = trimmed.replace(/^\*/, '').replace(/\*$/, '');
      const noteTheme = {
        emerald: 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950',
        amber: 'bg-amber-50/70 border-amber-200/80 text-amber-950',
        purple: 'bg-purple-50/70 border-purple-200/80 text-purple-950',
        indigo: 'bg-indigo-50/70 border-indigo-200/80 text-indigo-950',
      }[accentColor];

      const noteIconColor = {
        emerald: 'text-emerald-600',
        amber: 'text-amber-600',
        purple: 'text-purple-600',
        indigo: 'text-indigo-600',
      }[accentColor];

      elements.push(
        <div
          key={`note-${lineIdx}`}
          className={`my-3 p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 leading-relaxed ${noteTheme}`}
        >
          <Info className={`w-4 h-4 shrink-0 mt-0.5 ${noteIconColor}`} />
          <div>{renderFormattedInline(calloutText, accentColor)}</div>
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
      !(rawLines[lineIdx].trim().startsWith('`') && rawLines[lineIdx].trim().endsWith('`') && !rawLines[lineIdx].trim().slice(1, -1).includes('`')) &&
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
        <div key={`p-${lineIdx}`} className="space-y-1.5 my-2.5">
          {paragraphLines.map((pLine, pIdx) => (
            <p key={pIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {renderFormattedInline(pLine, accentColor)}
            </p>
          ))}
        </div>
      );
    }
  }

  return <div className="space-y-3">{elements}</div>;
};
