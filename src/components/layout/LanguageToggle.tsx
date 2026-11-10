import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n/languages';
import type { LanguageType } from '../../types';
import { cn } from '../../lib/utils';

const CODES = Object.keys(LANGUAGES) as LanguageType[];

/**
 * Language dropdown in the header: full names ("English", "Tagalog") in a
 * large, high-contrast button so older readers can find it. Works with the
 * mouse, touch and keyboard (arrows, Enter, Escape).
 */
export default function LanguageToggle({ className }: { className?: string }) {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage ?? 'en') as LanguageType;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Close when clicking or tapping outside the menu.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  // Move focus to the selected language when the menu opens.
  useEffect(() => {
    if (open) itemRefs.current[CODES.indexOf(current)]?.focus();
  }, [open, current]);

  const choose = (code: LanguageType) => {
    i18n.changeLanguage(code);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onMenuKey = (e: KeyboardEvent) => {
    const i = itemRefs.current.findIndex(el => el === document.activeElement);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      itemRefs.current[(i + step + CODES.length) % CODES.length]?.focus();
    } else if (e.key === 'Escape') {
      setOpen(false);
      buttonRef.current?.focus();
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Language: ${LANGUAGES[current].name}`}
        onClick={() => setOpen(o => !o)}
        onKeyDown={e => {
          if (e.key === 'ArrowDown' && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={cn(
          'flex items-center gap-1.5 rounded-lg border bg-white px-2.5 py-1.5 text-sm font-bold text-gray-900 transition-colors sm:gap-2 sm:px-3 sm:py-2 sm:text-base',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2',
          open
            ? 'border-primary-700 bg-primary-50'
            : 'border-gray-300 hover:border-primary-700 hover:bg-primary-50'
        )}
      >
        <Globe
          className="h-4 w-4 text-primary-700 sm:h-5 sm:w-5"
          aria-hidden="true"
        />
        <span>{LANGUAGES[current].name}</span>
        <ChevronDown
          className={cn(
            'hidden h-4 w-4 text-gray-700 transition-transform sm:block',
            open && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Choose a language"
          onKeyDown={onMenuKey}
          className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg"
        >
          {CODES.map((code, i) => {
            const selected = code === current;
            return (
              <button
                key={code}
                ref={el => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                lang={code}
                onClick={() => choose(code)}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base transition-colors',
                  'focus:outline-none focus-visible:bg-primary-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-700',
                  selected
                    ? 'bg-primary-50 font-bold text-primary-800'
                    : 'text-gray-900 hover:bg-gray-100'
                )}
              >
                {LANGUAGES[code].name}
                {selected && (
                  <Check
                    className="h-5 w-5 text-primary-700"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
