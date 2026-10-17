import {
  BellRing,
  Check,
  ChevronDown,
  ClipboardList,
  Gavel,
  Mail,
  Radar,
  Recycle,
  Truck,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Band, Container, Mark, Underline } from "./bits";

/*
 * The middle of the odoo.com landing page, in order: what the product does, the
 * "level up" card row, the native-AI band and the "done right" leaf that closes
 * with the plan.
 *
 * Every band carries odoo.com's own padding (`pb-5 pb-lg-6`, `py-5 py-lg-7`,
 * `pb-5 pb-lg-10`, `pt-7`), its headings are display-2 with `mb-6`, and each
 * card is Odoo's white `s_wd_features_item`: 2rem of padding, 0.75rem radius,
 * a 1px #E9E3F7 border and a 70px leaf-shaped icon tile in the top corner.
 */

/* --------------------------------------------------------------- features */

/*
 * Odoo puts a quotation above the company artwork in the card under the
 * sources wall; we keep the card, the two-column split and the mark on the
 * right, and put the product's own list where the quotation was — one icon
 * tile per thing the desk does, in the order the pipeline runs: detect,
 * research, score, route, contact, monetize.
 */
type Tone = "violet" | "orchid" | "indigo" | "fuchsia" | "gold";

/** The tile a feature wears: the page's own violets at 12% behind its icon. */
const FEATURE_TONES: Record<Tone, string> = {
  violet: "bg-[var(--od-tone-violet-bg)] text-[var(--od-tone-violet-fg)]",
  orchid: "bg-[var(--od-tone-orchid-bg)] text-[var(--od-tone-orchid-fg)]",
  indigo: "bg-[var(--od-tone-indigo-bg)] text-[var(--od-tone-indigo-fg)]",
  gold: "bg-[var(--od-tone-gold-bg)] text-[var(--od-tone-gold-fg)]",
  fuchsia: "bg-[var(--od-tone-fuchsia-bg)] text-[var(--od-tone-fuchsia-fg)]",
};

const FEATURES: { icon: ReactNode; label: string; note: string; tone: Tone }[] = [
  {
    icon: <Radar size={17} />,
    label: "Signal sweep",
    note: "Storage lien lists, recorder notices, probate dockets and free sections, pulled on a set cadence",
    tone: "violet",
  },
  {
    icon: <ClipboardList size={17} />,
    label: "Four scoring engines",
    note: "Storage, wholesale, estate and scrap math that is fixed. Same inputs, same score, every time",
    tone: "orchid",
  },
  {
    icon: <Gavel size={17} />,
    label: "The master router",
    note: "Every lead leaves with one play: bid, wholesale, cleanout, runner-scrap or pass",
    tone: "gold",
  },
  {
    icon: <Mail size={17} />,
    label: "Owner outreach",
    note: "Storage tenants, executors and homeowners get a plain-English offer before anything else happens",
    tone: "indigo",
  },
  {
    icon: <Truck size={17} />,
    label: "Cleanout crews",
    note: "Estates cleared free, resold as agent, with heirs remitted 80 to 90% of net proceeds",
    tone: "fuchsia",
  },
  {
    icon: <Recycle size={17} />,
    label: "Scrap floor",
    note: "Same-day cash runs that fund the whole operation, with runners paid the day the yard pays us",
    tone: "violet",
  },
  {
    icon: <BellRing size={17} />,
    label: "Watchlist re-scores",
    note: "Every timeline event, from an auction date to a house closing, wakes its lead and rescores it",
    tone: "indigo",
  },
  {
    icon: <Wallet size={17} />,
    label: "Deal ledger & calibration",
    note: "Predicted vs. realized on every deal, feeding the category probabilities each month",
    tone: "orchid",
  },
];

export function FeaturesBand() {
  return (
    <Band className="pb-[3rem] lg:pb-[4rem]">
      <div className="overflow-hidden rounded-[0.75rem] border border-[var(--od-border)] bg-[var(--od-surface)]">
        {/* every job the desk runs, under the mark that runs it */}
        <div className="p-[1.5rem] md:p-[2.5rem] xl:p-[3rem]">
          <div className="flex items-start justify-between gap-[1.5rem] md:gap-[3rem]">
            <div className="min-w-0">
              <h3 className="od-h4">
                Everything the desk does <Mark>for you</Mark>
              </h3>

              <p className="mt-[0.75rem] max-w-[42rem] text-[1rem] leading-relaxed text-[var(--od-body)]">
                Every distress signal lands in one place, gets scored by fixed math and comes
                out the other end with a single play attached. Nothing sits around as a vague
                maybe.
              </p>
            </div>

            <span className="inline-flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-[1.2rem] bg-[var(--od-surface)] shadow-[0_0.5rem_1.25rem_rgba(109,40,217,0.10)] ring-1 ring-[rgba(109,40,217,0.16)] xl:h-[5.5rem] xl:w-[5.5rem] xl:rounded-[1.4rem]">
              <img
                src="/logo.png"
                width={72}
                height={72}
                alt="Stuffout"
                loading="lazy"
                className="h-[3.5rem] w-[3.5rem] xl:h-[4.25rem] xl:w-[4.25rem]"
              />
            </span>
          </div>

          <ul className="mt-[2rem] grid gap-x-[2.5rem] gap-y-[1.5rem] sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <li key={feature.label} className="flex items-start gap-[0.875rem]">
                <span
                  aria-hidden
                  className={cn(
                    "flex h-[2.25rem] w-[2.25rem] shrink-0 items-center justify-center rounded-[0.7rem]",
                    FEATURE_TONES[feature.tone],
                  )}
                >
                  {feature.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] leading-tight font-semibold text-[var(--od-ink)]">
                    {feature.label}
                  </span>
                  <span className="mt-[0.3rem] block text-[0.875rem] leading-relaxed text-[var(--od-body)]">
                    {feature.note}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </Band>
  );
}

/* ------------------------------------------------------------- done right */

/*
 * The four promises are set as one ruled panel rather than four floating
 * cards: each rule is a cell with its index, the promise, the reasoning, and a
 * one-line fact under a dashed score — the shape of a spec sheet, not a
 * feature grid.
 */
const PRINCIPLES: { title: string; body: string; fact: string }[] = [
  {
    title: "One desk, every asset class",
    body: "Storage, real estate, estates, commercial closures and junk all share one lead database, one pipeline and one sign-in.",
    fact: "One queue, one ledger",
  },
  {
    title: "Deterministic scoring",
    body: "Four engines with published weights and a master router that rejects what it should. Nothing is left to a mood.",
    fact: "Same inputs, same score",
  },
  {
    title: "Nothing paid upfront",
    body: "Revenue share, assignment or pay-after-sale. The float comes from scrap runs, never from your reserve.",
    fact: "No deposit, ever",
  },
  {
    title: "Hard vetoes built in",
    body: "Biohazards, unresolvable title defects and unlicensed jurisdictions are an automatic pass, whatever the score says.",
    fact: "Three automatic refusals",
  },
];

export function DoneRightBand() {
  return (
    <Band leaf className="py-[3rem] lg:py-[6rem]">
      <h2 className="od-d2 mb-[4rem] lg:text-center">
        Stuffout
        <br />
        done <Underline>right</Underline>.
      </h2>

      <div className="od-principles">
        {PRINCIPLES.map((item, index) => (
          <article key={item.title} className="od-principle">
            <span className="od-principle-num" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="od-principle-title">{item.title}</h3>
            <p className="od-principle-body">{item.body}</p>
            <p className="od-principle-fact">
              <Check size={12} strokeWidth={3} aria-hidden />
              {item.fact}
            </p>
          </article>
        ))}
      </div>
    </Band>
  );
}

/* -------------------------------------------------------------------- faq */

export type FaqItem = { q: string; a: string };

export function FaqBand({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className="pt-[6rem] pb-[3rem]">
      <Container>
        <h2 className="od-d2 mb-[4rem] lg:text-center">Before you sign up.</h2>

        <div className="mx-auto mt-[1.5rem] max-w-3xl">
          {items.map((item) => (
            <details key={item.q} className="group border-t border-[var(--od-border)] py-[1rem]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-[1.5rem] text-[1.25rem] font-semibold text-[var(--od-ink)] marker:hidden">
                {item.q}
                <ChevronDown
                  size={20}
                  className="shrink-0 text-[var(--od-muted)] transition group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="mt-[0.75rem] max-w-2xl text-[1rem] leading-relaxed text-[var(--od-body)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------- faq */