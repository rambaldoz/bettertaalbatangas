import { Link } from 'react-router';
import {
  ArrowRight,
  Flame,
  Hospital,
  Phone,
  Shield,
  Ship,
  Siren,
  type LucideIcon,
} from 'lucide-react';
import { HOTLINES, isPlaceholderNumber, type Hotline } from '../../data/taal';

const ICONS: Record<string, LucideIcon> = {
  Siren,
  Shield,
  Flame,
  Ship,
  Hospital,
};

// "0917 230 2003" -> "tel:09172302003"
const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`;

// Deep red strip (#c10008, as on betteraparri.org) with Taal's
// emergency numbers, shown above the main header.
// Shows the hotlines that have a `strip` label in data/taal.ts.
export default function EmergencyStrip() {
  const items = HOTLINES.filter(
    (h): h is Hotline & { strip: NonNullable<Hotline['strip']> } => !!h.strip
  );

  return (
    <div className="bg-[#c10008] text-white">
      <div className="container mx-auto flex items-center gap-3 whitespace-nowrap px-4 py-1 text-xs">
        <span className="flex shrink-0 items-center gap-1.5 font-bold uppercase tracking-wide">
          <Phone className="h-3 w-3" aria-hidden="true" />
          Emergency
        </span>

        {/* Only the list scrolls on narrow screens, so "All hotlines" stays visible. */}
        <ul className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto [scrollbar-width:none]">
          {items.map(h => {
            const Icon = ICONS[h.strip.icon] ?? Phone;
            // First number, without notes like "(Hotline)".
            const number = h.numbers[0]?.replace(/\s*\(\D+\)$/, '');
            const placeholder = !number || isPlaceholderNumber(number);
            const content = (
              <>
                <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span>{h.strip.label}</span>
                <span className="font-bold tabular-nums">
                  {number ?? '09XX XXX XXXX'}
                </span>
              </>
            );
            const pill =
              'flex items-center gap-1 rounded-full bg-white/15 px-2 py-px';
            return (
              <li key={h.name}>
                {placeholder ? (
                  <span
                    className={`${pill} opacity-90`}
                    title="Number to be confirmed"
                  >
                    {content}
                  </span>
                ) : (
                  <a
                    href={telHref(number)}
                    className={`${pill} transition-colors hover:bg-white/25`}
                    aria-label={`Call ${h.strip.label}: ${number}`}
                  >
                    {content}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <Link
          to="/taal/hotlines"
          className="flex shrink-0 items-center gap-1 font-bold hover:underline"
        >
          <span className="hidden sm:inline">All hotlines</span>
          <span className="sm:hidden">All</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
