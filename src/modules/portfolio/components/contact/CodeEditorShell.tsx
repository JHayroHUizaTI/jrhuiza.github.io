import type { ReactNode } from 'react';

interface CodeEditorShellProps {
  children: ReactNode;
  className?: string;
  fileName?: string;
  fileBadge?: string;
  fileIcon?: string;
  accent?: 'primary' | 'secondary';
  showWindowControls?: boolean;
}

export const CodeEditorShell = ({
  children,
  className = '',
  fileName,
  fileBadge,
  fileIcon,
  accent = 'secondary',
  showWindowControls = false,
}: CodeEditorShellProps) => {
  const topGlowColor =
    accent === 'primary'
      ? 'rgba(57, 255, 20, 0.4)'
      : 'rgba(37, 197, 197, 0.4)';

  return (
    <div
      className={`glass-card group ${className}`}
      style={{
        // Override glass-card with a thin top highlight
        boxShadow: [
          '0 22px 60px rgba(0, 0, 0, 0.5)',
          '0 0 0 1px rgba(255, 255, 255, 0.03) inset',
          '0 1px 0 rgba(57, 255, 20, 0.05) inset',
        ].join(', '),
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${topGlowColor} 50%, transparent 100%)`,
        }}
      />

      {/* Inner ambient glow on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: [
            'radial-gradient(circle at top right, rgba(57, 255, 20, 0.04), transparent 28%)',
            'radial-gradient(circle at bottom left, rgba(37, 197, 197, 0.04), transparent 28%)',
          ].join(', '),
        }}
      />

      {showWindowControls ? (
        <div
          className="relative flex items-center justify-between px-4 py-3 transition-colors duration-300 sm:px-5"
          style={{
            borderBottom: '1px solid rgba(57, 255, 20, 0.06)',
            background: 'rgba(3, 10, 5, 0.5)',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ background: '#ff5f56', boxShadow: '0 0 6px rgba(255, 95, 86, 0.3)' }} />
            <span className="h-3 w-3 rounded-full" style={{ background: '#ffbd2e', boxShadow: '0 0 6px rgba(255, 189, 46, 0.3)' }} />
            <span className="h-3 w-3 rounded-full" style={{ background: '#28c840', boxShadow: '0 0 6px rgba(40, 200, 64, 0.3)' }} />
          </div>
          {fileName ? (
            <div className="flex items-center gap-2 text-[11px] text-zinc-500">
              {fileIcon ? <span className="font-label text-secondary">{fileIcon}</span> : null}
              <span className="font-label normal-case tracking-[0.08em] text-zinc-400">{fileName}</span>
            </div>
          ) : null}
        </div>
      ) : (
        <div
          className="relative flex min-h-10 items-end px-3 pt-2 sm:px-4"
          style={{
            borderBottom: '1px solid rgba(57, 255, 20, 0.06)',
            background: 'rgba(3, 10, 5, 0.5)',
          }}
        >
          <div
            className="rounded-t-md px-4 py-2"
            style={{
              border: '1px solid rgba(57, 255, 20, 0.06)',
              borderBottom: 'none',
              background: 'rgba(4, 16, 8, 0.6)',
              boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.18)',
            }}
          >
            <div className="relative flex items-center gap-2 font-label text-[12px]">
              {fileBadge ? <span className="font-semibold text-secondary">{fileBadge}</span> : null}
              <span className="text-zinc-300">{fileName}</span>
              <span className="ml-3 text-zinc-600">x</span>
            </div>
          </div>
        </div>
      )}
      <div className="relative">{children}</div>
    </div>
  );
};
