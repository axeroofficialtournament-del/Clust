import type { ReactNode } from "react";
import {
  ClipboardCheck,
  FileSignature,
  Send,
  Truck,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICE_PHOTOS } from "@/data/service-photos";
import { Band, Container, Mark, odBtn } from "./bits";

/*
 * Two bands that replace odoo.com's "level up your workflow" collage:
 *
 *   LevelUpBand — the four classes of job, as four photographs rather than four
 *   mock product panels. Same collage rhythm as the original (the panels are
 *   nudged up and down against each other), but the pictures are the work.
 *
 *   StepsBand — the clearance run, start to settled, on a single track line.
 */

const SHOWN: {
  photo: keyof typeof SERVICE_PHOTOS;
  step: string;
  label: string;
  note: string;
  offset: string;
}[] = [
  {
    photo: "storage",
    step: "01",
    label: "Storage units",
    note: "Lien-sale units read from the auction photos before the gavel.",
    offset: "lg:mt-0",
  },
  {
    photo: "property",
    step: "02",
    label: "Houses",
    note: "Probate and pre-foreclosure homes, contracted and assigned.",
    offset: "lg:mt-[2.5rem]",
  },
  {
    photo: "estate",
    step: "03",
    label: "Estates",
    note: "Family homes cleared free, contents consigned, heirs paid.",
    offset: "lg:mt-0",
  },
  {
    photo: "junk",
    step: "04",
    label: "Junk & scrap",
    note: "Anything past resale still pays, same day, at the yard.",
    offset: "lg:mt-[2.5rem]",
  },
];

export function LevelUpBand() {
  return (
    <section className="od-round-bottom relative bg-[var(--od-band)] py-[3rem] lg:py-[6rem]">
      {/* `o_illustration_doodle_02`, the orange doodle behind this band. */}
      <div className="od-shape od-shape-02" aria-hidden />

      <Container className="relative z-[1]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="od-d2">
            One crew, <Mark tone="yellow-03">one set of terms.</Mark>
          </h2>
          <p className="mt-[1rem] text-[1.125rem] leading-relaxed text-[var(--od-body)]">
            A ten-by-ten locker and a three-bedroom house run on the same agreement: we front
            the work, you get the space back and your share of what it held.
          </p>
        </div>

        <div className="mt-[2.5rem] grid gap-[1rem] sm:grid-cols-2 lg:grid-cols-4 lg:gap-[1.25rem]">
          {SHOWN.map((item) => (
            <figure
              key={item.photo}
              className={cn(
                "group relative m-0 overflow-hidden rounded-[0.75rem] border border-[var(--od-border)] bg-[var(--od-surface)] transition-transform duration-200 ease-out hover:-translate-y-[0.25rem]",
                item.offset,
              )}
            >
              <div className="od-photo aspect-[4/3]">
                <img
                  src={SERVICE_PHOTOS[item.photo].src}
                  alt={SERVICE_PHOTOS[item.photo].alt}
                  width={SERVICE_PHOTOS[item.photo].width}
                  height={SERVICE_PHOTOS[item.photo].height}
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute z-[1] top-[0.75rem] left-[0.75rem] text-[0.75rem] font-bold tracking-[0.14em] text-white/85">
                  {item.step}
                </span>
              </div>
              <figcaption className="p-[1.1rem]">
                <span className="block text-[1rem] font-semibold text-[var(--od-ink)]">
                  {item.label}
                </span>
                <span className="mt-[0.35rem] block text-[0.875rem] leading-relaxed text-[var(--od-body)]">
                  {item.note}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-[2.5rem] flex justify-center">
          <a href="#contact" className={odBtn}>
            Tell us what needs clearing
          </a>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------- the clearance run */

type Step = {
  icon: ReactNode;
  label: string;
  title: string;
  copy: string;
};

const STEPS: Step[] = [
  {
    icon: <Send size={16} />,
    label: "Step 1",
    title: "Tell us what is there",
    copy: "One form, or a call. The address, the size of the job and anything that needs a licensed hand.",
  },
  {
    icon: <ClipboardCheck size={16} />,
    label: "Step 2",
    title: "Site check and inventory",
    copy: "We walk the space, photograph it and price what is worth selling against real resale comps.",
  },
  {
    icon: <FileSignature size={16} />,
    label: "Step 3",
    title: "Fixed plan, signed",
    copy: "A written authorization with the split stated up front: what we do, what you keep and what it costs, which is nothing.",
  },
  {
    icon: <Truck size={16} />,
    label: "Step 4",
    title: "Clear, sort, transport",
    copy: "The crew pulls the sellable items first, the scrap goes to the yard, and the space gets swept.",
  },
  {
    icon: <Wallet size={16} />,
    label: "Step 5",
    title: "Settle and hand back",
    copy: "Your share is remitted with the payout maths in writing, and the room is handed over empty.",
  },
];

export function StepsBand() {
  return (
    <Band id="process" className="pt-[1rem] pb-[3rem] lg:pb-[4rem]">
      <div className="max-w-3xl">
        <h2 className="od-d2">
          From first call to <Mark tone="blue">empty room.</Mark>
        </h2>
      </div>

      {/* The track: a vertical rule on small screens, a horizontal one from lg. */}
      <div className="relative mt-[2.5rem]">
        <span
          aria-hidden
          className="absolute top-[1.1rem] bottom-[1.1rem] left-[1.1rem] w-[2px] rounded-full bg-[linear-gradient(180deg,rgba(109,40,217,0.55),rgba(147,51,234,0.15))] lg:top-[1.1rem] lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-[2px] lg:w-auto lg:bg-[linear-gradient(90deg,rgba(109,40,217,0.55),rgba(147,51,234,0.15))]"
        />

        <ol className="relative grid gap-[1.5rem] lg:grid-cols-5 lg:gap-[1rem]">
          {STEPS.map((step) => (
            <li key={step.title} className="relative pl-[3.25rem] lg:pl-0">
              <span className="absolute top-0 left-0 z-[1] flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-full border-2 border-[var(--od-violet)] bg-white text-[var(--od-violet)] shadow-[0_0_0_4px_var(--od-band)] lg:relative lg:mb-[1rem]">
                {step.icon}
              </span>

              <div className="lg:pr-[0.75rem]">
                <span className="text-[0.6875rem] font-bold tracking-[0.12em] text-[var(--od-violet)] uppercase">
                  {step.label}
                </span>
                <h3 className="mt-[0.25rem] text-[1rem] leading-tight font-semibold text-[var(--od-ink)]">
                  {step.title}
                </h3>
                <p className="mt-[0.4rem] text-[0.875rem] leading-relaxed text-[var(--od-body)]">
                  {step.copy}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-[2.5rem] flex flex-wrap items-center gap-x-[1.5rem] gap-y-[0.5rem] rounded-[0.75rem] border border-[var(--od-border)] bg-[var(--od-surface)] px-[1.25rem] py-[1rem]">
        <span className="text-[0.8125rem] font-semibold text-[var(--od-ink)]">
          No cost to ask, and none to walk away.
        </span>
        <a
          href="#contact"
          className="text-[0.8125rem] font-semibold text-[var(--od-violet)] underline decoration-[rgba(109,40,217,0.35)] underline-offset-2 hover:decoration-[var(--od-violet)]"
        >
          Start at step one
        </a>
      </div>
    </Band>
  );
}
