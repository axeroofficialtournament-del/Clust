import type { ReactNode } from "react";
import {
  Archive,
  Building2,
  Check,
  FileBox,
  Home,
  Recycle,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PHOTO_CREDITS, SERVICE_PHOTOS } from "@/data/service-photos";
import { Band, Container, Mark, odBtn } from "./bits";

/*
 * The five classes the desk actually runs, and the work itself — the bands
 * that sit between the hero and the product story.
 *
 * Everything here comes from the operating blueprint: storage units heading to
 * lien sale, distressed property taken by assignment, estates cleared on
 * consignment, commercial closures lotting out before the lease ends, and the
 * junk runs whose scrap floor pays the crew the same day. Each card carries a
 * photograph of that class of work rather than a screenshot of software.
 *
 * Photographs are freely licensed (CC0 / public domain / CC BY) and credited
 * in the footer. Every one gets the same crop and the same violet wash
 * (`.od-photo`) so a mixed set reads as one campaign instead of five stock
 * images.
 */

type Tone = "violet" | "orchid" | "indigo" | "fuchsia" | "gold";

const TONE_BG: Record<Tone, string> = {
  violet: "bg-[var(--od-tone-violet-bg)] text-[var(--od-tone-violet-fg)]",
  orchid: "bg-[var(--od-tone-orchid-bg)] text-[var(--od-tone-orchid-fg)]",
  indigo: "bg-[var(--od-tone-indigo-bg)] text-[var(--od-tone-indigo-fg)]",
  fuchsia: "bg-[var(--od-tone-fuchsia-bg)] text-[var(--od-tone-fuchsia-fg)]",
  gold: "bg-[var(--od-tone-gold-bg)] text-[var(--od-tone-gold-fg)]",
};

type ServiceCard = {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  points: string[];
  stat: string;
  icon: ReactNode;
  photo: keyof typeof SERVICE_PHOTOS;
  tone: Tone;
};

const SERVICES: ServiceCard[] = [
  {
    id: "storage",
    eyebrow: "Storage · lien sale",
    title: "Units heading to auction",
    copy: "We read the auction photos before the gavel drops — brands, container mix, scrap floor — and bid only where the maths leaves room. If the bid passes the ceiling, we walk away.",
    points: ["Tenant keeps 25% of resale", "Facility gets a rentable unit", "Hard vetoes pass, no exceptions"],
    stat: "Bid ceiling = EV × 0.45",
    icon: <Archive size={17} />,
    photo: "storage",
    tone: "violet",
  },
  {
    id: "property",
    eyebrow: "Property · assignment",
    title: "Houses in distress",
    copy: "Pre-foreclosure, tax-delinquent and probate houses. We contract at or below 70% of value minus repairs and assign to a mapped cash buyer — no listing, no commissions, no repairs on your side.",
    points: ["Written offer this week", "Close in 14 days", "You pay zero commission"],
    stat: "70% rule, fixed",
    icon: <Home size={17} />,
    photo: "property",
    tone: "indigo",
  },
  {
    id: "estate",
    eyebrow: "Estates · consignment",
    title: "Estate & probate cleanouts",
    copy: "The house is cleared at no cost to the family, the contents are sold as liquidation agent, and 80–90% of the net comes back to the heirs. One signed authorization covers the whole job.",
    points: ["Clear at no cost", "Heirs keep 80–90%", "Inventory & payout published"],
    stat: "Free clear",
    icon: <FileBox size={17} />,
    photo: "estate",
    tone: "gold",
  },
  {
    id: "commercial",
    eyebrow: "Commercial · closure",
    title: "Closing businesses",
    copy: "Dissolutions, UCC liens and bankruptcy filings leave fixtures, stock and equipment behind. We lot it out before the lease ends and hand the space back empty.",
    points: ["Bulk lot resale", "Lease-end deadline", "Space returned clear"],
    stat: "Lot pricing",
    icon: <Building2 size={17} />,
    photo: "commercial",
    tone: "fuchsia",
  },
  {
    id: "junk",
    eyebrow: "Junk · scrap",
    title: "Junk & scrap runs",
    copy: "Anything past resale still pays. The scrap floor settles the same day, the crew is paid the day the yard pays us, and nothing here ever needs upfront capital.",
    points: ["Same-day cash", "Crew paid on the day", "Free removal on request"],
    stat: "Crew takes 30–40%",
    icon: <Recycle size={17} />,
    photo: "junk",
    tone: "orchid",
  },
];

export function ServicesBand() {
  return (
    <Band id="services" className="pt-[4rem] pb-[2rem] lg:pt-[6rem]">
      <div className="max-w-3xl">
        <p className="flex items-center gap-[0.625rem] text-[0.75rem] font-semibold tracking-[0.16em] text-[var(--od-violet)] uppercase">
          <span aria-hidden className="h-[1px] w-[1.75rem] bg-[rgba(109,40,217,0.35)]" />
          Five classes of work
        </p>
        <h2 className="od-d2 mt-[1rem]">
          What we clear, <Mark>and what you get.</Mark>
        </h2>
        <p className="mt-[1.25rem] text-[1.125rem] leading-relaxed text-[var(--od-body)]">
          Every job starts the same way — a distress signal, a fixed score, one decision. What
          changes is the class: a storage unit, a house, an estate, a closing business, or a
          pile of junk. Here is what each one looks like, and what the owner walks away with.
        </p>
      </div>

      <div className="mt-[3rem] grid gap-[1.5rem] md:grid-cols-2 xl:grid-cols-3">
        {SERVICES.map((service) => (
          <article
            key={service.id}
            className="od-tile-shadow group flex flex-col overflow-hidden rounded-[0.75rem] border border-[var(--od-border)] bg-[var(--od-surface)]"
          >
            <div className="od-photo aspect-[16/10]">
              <img
                src={SERVICE_PHOTOS[service.photo].src}
                alt={SERVICE_PHOTOS[service.photo].alt}
                width={SERVICE_PHOTOS[service.photo].width}
                height={SERVICE_PHOTOS[service.photo].height}
                loading="lazy"
                decoding="async"
              />
              <span className="od-photo-tag">{service.eyebrow}</span>
            </div>

            <div className="flex flex-1 flex-col p-[1.5rem] md:p-[1.75rem]">
              <div className="flex items-start gap-[0.75rem]">
                <span
                  aria-hidden
                  className={cn(
                    "mt-[0.15rem] flex h-[2.25rem] w-[2.25rem] shrink-0 items-center justify-center rounded-[0.7rem]",
                    TONE_BG[service.tone],
                  )}
                >
                  {service.icon}
                </span>
                <h3 className="od-h4 !text-[1.25rem]">{service.title}</h3>
              </div>

              <p className="mt-[0.75rem] text-[0.9375rem] leading-relaxed text-[var(--od-body)]">
                {service.copy}
              </p>

              <ul className="mt-[1rem] space-y-[0.4rem]">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-[0.5rem] text-[0.875rem] text-[var(--od-body)]">
                    <Check
                      size={15}
                      aria-hidden
                      className="mt-[0.15rem] shrink-0 text-[var(--od-violet)]"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center justify-between gap-[0.75rem] border-t border-[var(--od-border)] pt-[1rem]">
                <span className="text-[0.8125rem] font-semibold text-[var(--od-ink)]">
                  {service.stat}
                </span>
                <a
                  href="#contact"
                  className="text-[0.8125rem] font-semibold text-[var(--od-violet)] underline decoration-[rgba(109,40,217,0.35)] underline-offset-2 hover:decoration-[var(--od-violet)]"
                >
                  Request this service
                </a>
              </div>
            </div>
          </article>
        ))}

        <article className="flex flex-col justify-between rounded-[0.75rem] border border-dashed border-[rgba(109,40,217,0.35)] bg-[var(--od-band-soft)] p-[1.75rem]">
          <div>
            <p className="flex items-center gap-[0.5rem] text-[0.75rem] font-semibold tracking-[0.16em] text-[var(--od-violet)] uppercase">
              <Truck size={14} aria-hidden /> Multi-asset
            </p>
            <h3 className="od-h4 mt-[0.75rem] !text-[1.25rem]">
              House, unit and car on one estate?
            </h3>
            <p className="mt-[0.75rem] text-[0.9375rem] leading-relaxed text-[var(--od-body)]">
              We score each asset, then price the whole thing as one package. A bundle discount
              for the owner usually beats what the parts would fetch separately.
            </p>
          </div>
          <a href="#contact" className={cn(odBtn, "mt-[1.5rem] self-start")}>
            Send the details
          </a>
        </article>
      </div>
    </Band>
  );
}

/* ------------------------------------------------ small print for photos */

export function PhotoCreditLine() {
  return (
    <Container className="pb-[2rem]">
      <p className="text-[0.6875rem] leading-relaxed text-[var(--od-muted)]">
        Service photography:{" "}
        {PHOTO_CREDITS.map((credit, index) => (
          <span key={credit.href}>
            {index > 0 ? " · " : ""}
            <a
              href={credit.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="underline decoration-[rgba(111,104,137,0.4)] underline-offset-2 hover:text-[var(--od-violet)]"
            >
              {credit.title}
            </a>{" "}
            by {credit.author} ({credit.licence})
          </span>
        ))}
      </p>
    </Container>
  );
}
