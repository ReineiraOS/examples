import { useState, type MouseEvent } from 'react';

interface CopyableIdProps {
  value: string;
  max?: number;
  className?: string;
}

function truncate(s: string, max: number): string {
  return s.length > max ? `${s.slice(0, max)}…` : s;
}

async function copyToClipboard(value: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // fall through to legacy fallback
    }
  }

  const ta = document.createElement('textarea');
  ta.value = value;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.top = '0';
  ta.style.left = '0';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  document.body.removeChild(ta);
  return ok;
}

export function CopyableId({ value, max = 12, className = '' }: CopyableIdProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const ok = await copyToClipboard(value);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <span className={'relative inline-flex items-center group ' + className}>
      <button
        type="button"
        onClick={handleClick}
        title={`Click to copy: ${value}`}
        aria-label={`Copy ${value}`}
        className={
          'font-mono text-xs cursor-pointer transition-colors duration-200 ' +
          'inline-flex items-center gap-1.5 ' +
          (copied
            ? 'text-emerald-400'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]')
        }
      >
        <span>{truncate(value, max)}</span>
        <CopyIcon copied={copied} />
      </button>

      <span
        aria-hidden
        role="status"
        className={
          'pointer-events-none absolute left-1/2 -translate-x-1/2 ' +
          'whitespace-nowrap rounded-md px-2 py-0.5 text-[10px] font-medium ' +
          'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 ' +
          'transition-all duration-200 ease-out ' +
          (copied
            ? 'opacity-100 -top-7 scale-100'
            : 'opacity-0 -top-5 scale-95')
        }
      >
        Copied
      </span>
    </span>
  );
}

function CopyIcon({ copied }: { copied: boolean }) {
  return (
    <span className="relative inline-block h-3 w-3 shrink-0">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={
          'absolute inset-0 h-3 w-3 transition-all duration-200 ' +
          (copied ? 'opacity-0 scale-50' : 'opacity-50 group-hover:opacity-100 scale-100')
        }
      >
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={
          'absolute inset-0 h-3 w-3 transition-all duration-200 ' +
          (copied ? 'opacity-100 scale-100' : 'opacity-0 scale-50')
        }
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}
