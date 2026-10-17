import { SERVICE_PHOTOS } from "@/data/service-photos";
import { Container, Mark, odBtn, odBtnLight } from "./bits";

/*
 * The hero, in two columns: the promise on the left, the thing being sold on
 * the right — one apartment photographed twice, furnished and then cleared.
 *
 * The split is the whole pitch in one image, so the words stay short: a
 * headline, a line of what and who for, two buttons, and the terms underneath.
 */

export default function Hero() {
  return (
    <section className="pt-[calc(2rem+60px)] pb-[3.5rem] lg:pt-[calc(4rem+60px)] lg:pb-[5rem]">
      <Container>
        <div className="grid items-center gap-[2rem] lg:grid-cols-[1.02fr_1fr] lg:gap-[3.5rem]">
          {/* ------------------------------------------------------ words */}
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-[0.5rem] rounded-full bg-[var(--od-tone-violet-bg)] px-[0.75rem] py-[0.3rem] text-[0.75rem] font-semibold tracking-[0.08em] text-[var(--od-tone-violet-fg)] uppercase">
              <span aria-hidden className="h-[0.4rem] w-[0.4rem] rounded-full bg-[var(--od-violet)]" />
              Clearance · resale · payout
            </p>

            <h1 className="od-d1 mt-[1.25rem]">
              Clear the space.
              <br />
              <Mark>Keep the value.</Mark>
            </h1>

            <p className="mx-auto mt-[1.5rem] max-w-[34rem] text-[1.125rem] leading-relaxed text-[var(--od-body)] lg:mx-0 lg:text-[1.25rem]">
              Storage units, probate homes and closing businesses — cleared, sorted and sold,
              with nothing to pay upfront. You get the empty room and your share of what it held.
            </p>

            <div className="mt-[2rem]">
              <a href="#contact" className={odBtn + " mb-[0.5rem] me-[0.5rem]"}>
                Request a clearance
              </a>
              <a href="#services" className={odBtnLight + " mb-[0.5rem]"}>
                See what we clear
              </a>
            </div>

            <p className="mt-[1.25rem] text-[0.875rem] text-[var(--od-muted)]">
              No deposit · written agreement · one crew from first look to handover
            </p>
          </div>

          {/* ------------------------------------------------------ picture */}
          <figure className="relative m-0">
            <div className="grid grid-cols-2 gap-[0.5rem] sm:gap-[0.75rem]">
              <div className="od-photo aspect-[3/4] rounded-[0.75rem]">
                <img
                  src={SERVICE_PHOTOS.furnished.src}
                  alt={SERVICE_PHOTOS.furnished.alt}
                  width={SERVICE_PHOTOS.furnished.width}
                  height={SERVICE_PHOTOS.furnished.height}
                  loading="eager"
                  decoding="async"
                />
                <span className="od-photo-flag od-photo-flag-left !text-[0.625rem]">
                  Furnished
                </span>
              </div>

              <div className="od-photo aspect-[3/4] rounded-[0.75rem]">
                <img
                  src={SERVICE_PHOTOS.cleared.src}
                  alt={SERVICE_PHOTOS.cleared.alt}
                  width={SERVICE_PHOTOS.cleared.width}
                  height={SERVICE_PHOTOS.cleared.height}
                  loading="eager"
                  decoding="async"
                />
                <span className="od-photo-flag od-photo-flag-right !text-[0.625rem] !bg-[rgba(109,40,217,0.85)]">
                  Cleared
                </span>
              </div>
            </div>

            <figcaption className="mx-auto -mt-[1.25rem] w-[86%] rounded-[0.6rem] border border-[var(--od-border)] bg-white px-[1rem] py-[0.7rem] text-center shadow-[0_0.75rem_2rem_rgba(23,16,43,0.10)]">
              <span className="block text-[0.8125rem] font-semibold text-[var(--od-ink)]">
                One apartment, two states
              </span>
              <span className="block text-[0.75rem] leading-snug text-[var(--od-muted)]">
                Part furnished, part empty — that is the handover we sell.
              </span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
