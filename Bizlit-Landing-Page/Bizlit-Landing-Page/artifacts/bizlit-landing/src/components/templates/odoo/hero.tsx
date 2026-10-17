import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { MoveHorizontal } from "lucide-react";
import { SERVICE_PHOTOS } from "@/data/service-photos";
import { Container, Mark, odBtn, odBtnLight } from "./bits";

/*
 * The hero, in two columns: the promise on the left, the thing being sold on
 * the right — one apartment photographed twice, clustered and then cleared,
 * stacked into a single frame with a handle you drag from one state to the
 * other.
 *
 * The split is the whole pitch in one image, so the words stay short: a
 * headline, a line of what and who for, and two buttons.
 */

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/** One frame, two states: the clustered side follows the handle as you drag. */
function SplitComparison() {
  const frame = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);
  const [dragging, setDragging] = useState(false);

  function track(clientX: number) {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setSplit(clamp(((clientX - rect.left) / rect.width) * 100));
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    track(event.clientX);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (dragging) track(event.clientX);
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const step = event.shiftKey ? 10 : 2;
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        setSplit((n) => clamp(n - step));
        break;
      case "ArrowRight":
      case "ArrowUp":
        setSplit((n) => clamp(n + step));
        break;
      case "Home":
        setSplit(0);
        break;
      case "End":
        setSplit(100);
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  const clustered = SERVICE_PHOTOS.clustered;
  const cleared = SERVICE_PHOTOS.cleared;

  return (
    <div
      ref={frame}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className="od-photo relative aspect-[5/4] cursor-ew-resize rounded-[0.75rem] select-none"
      style={{ touchAction: "pan-y" }}
    >
      {/* the cleared room holds the whole frame */}
      <div className="absolute inset-0">
        <img
          src={cleared.src}
          alt={cleared.alt}
          width={cleared.width}
          height={cleared.height}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      {/* the clustered room is revealed to the left of the handle */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
      >
        <img
          src={clustered.src}
          alt={clustered.alt}
          width={clustered.width}
          height={clustered.height}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      <span className="od-photo-flag od-photo-flag-left !text-[0.625rem]">
        Clustered
      </span>
      <span className="od-photo-flag od-photo-flag-right !text-[0.625rem] !bg-[rgba(109,40,217,0.85)]">
        Cleared
      </span>

      {/* the swipe line */}
      <span
        aria-hidden
        className="absolute inset-y-0 z-[2] w-[3px] -translate-x-1/2 bg-white/90 shadow-[0_0_0.5rem_rgba(23,16,43,0.35)]"
        style={{ left: `${split}%` }}
      />

      {/* the drag handle */}
      <button
        type="button"
        role="slider"
        aria-label="Drag to compare the clustered and cleared states"
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(split)}
        aria-valuetext={`${Math.round(split)}% clustered`}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 z-[3] flex h-[2.75rem] w-[2.75rem] -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-[var(--od-border)] bg-white text-[var(--od-violet)] shadow-[0_0.35rem_1rem_rgba(23,16,43,0.3)] outline-none focus-visible:ring-4 focus-visible:ring-[rgba(109,40,217,0.3)]"
        style={{ left: `${split}%` }}
      >
        <MoveHorizontal size={20} aria-hidden />
      </button>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="pt-[calc(2rem+60px)] pb-[3.5rem] lg:pt-[calc(4rem+60px)] lg:pb-[5rem]">
      <Container>
        <div className="grid items-center gap-[2rem] lg:grid-cols-[1.02fr_1fr] lg:gap-[3.5rem]">
          {/* ------------------------------------------------------ words */}
          <div className="text-center lg:text-left">
            <h1 className="od-d1">
              Clear the space.
              <br />
              <Mark>Keep the value.</Mark>
            </h1>

            <p className="mx-auto mt-[1.5rem] max-w-[34rem] text-[1.125rem] leading-relaxed text-[var(--od-body)] lg:mx-0 lg:text-[1.25rem]">
              Storage units, probate homes and closing businesses, cleared, sorted and sold,
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
          </div>

          {/* ------------------------------------------------------ picture */}
          <figure className="relative m-0">
            <SplitComparison />
          </figure>
        </div>
      </Container>
    </section>
  );
}
