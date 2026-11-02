import React from 'react';

interface FormattedContentProps {
  content: string;
  className?: string;
}

/**
 * Cleanly formats and renders text content.
 * Parses markdown tables into clean, aligned HTML tables,
 * formats bulleted lists with aligned icons, and strips any stray raw ** or ### artifacts.
 */
export const FormattedContent: React.FC<FormattedContentProps> = ({ content, className = '' }) => {
  if (!content) return null;

  // Pre-clean any accidental raw ** or stray markdown hashes
  const sanitized = content
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^###\s+/gm, '')
    .replace(/^##\s+/gm, '')
    .replace(/^#\s+/gm, '');

  // Split into structural blocks separated by double newlines or table boundaries
  const rawBlocks = sanitized.split(/\n\s*\n/);

  return (
    <div className={`space-y-3 ${className}`}>
      {rawBlocks.map((block, blockIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Check if block is a markdown table
        const lines = trimmed.split('\n').map((l) => l.trim());
        const isTable =
          lines.length >= 2 &&
          lines[0].startsWith('|') &&
          lines[0].endsWith('|') &&
          lines[1].startsWith('|') &&
          lines[1].includes('---');

        if (isTable) {
          const headerCells = lines[0]
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim());

          const bodyRows = lines
            .slice(2)
            .filter((l) => l.startsWith('|') && l.endsWith('|'))
            .map((l) =>
              l
                .split('|')
                .slice(1, -1)
                .map((c) => c.trim())
            );

          return (
            <div
              key={blockIdx}
              className="my-3 overflow-x-auto border border-slate-200/90 rounded-xl bg-white shadow-xs"
            >
              <table className="w-full text-left text-xs text-slate-800 border-collapse">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-900 font-bold">
                    {headerCells.map((head, hIdx) => (
                      <th
                        key={hIdx}
                        className="px-3.5 py-2.5 text-[11px] font-bold text-slate-800 tracking-wider"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {bodyRows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={rIdx % 2 === 1 ? 'bg-slate-50/40 hover:bg-slate-100/50' : 'hover:bg-slate-50/60'}
                    >
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3.5 py-2.5 align-top leading-relaxed whitespace-pre-line">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        // Check if block is a bulleted list
        const isBulletList = lines.every((l) => l.startsWith('•') || l.startsWith('-') || l.startsWith('* '));
        if (isBulletList) {
          return (
            <ul key={blockIdx} className="space-y-1.5 my-2">
              {lines.map((item, i) => {
                const text = item.replace(/^[•\-\*]\s*/, '').trim();
                return (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="text-purple-600 font-bold shrink-0 mt-0.5">•</span>
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Regular paragraph / text block
        return (
          <p key={blockIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
};
