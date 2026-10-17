import { useState, type FormEvent } from "react";
import {
  Archive,
  ArrowRight,
  Building2,
  CircleAlert,
  FileBox,
  Home,
  PackageCheck,
  Check,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Band, Mark } from "./bits";

/*
 * The service-request form, carried over from the Client-Service-Request app so
 * a visitor on the marketing page can open a request without being handed off.
 *
 * Same shape as that app's form: three numbered steps, the six service classes
 * as a single-choice group, then the job and the contact details, a consent
 * line that must be ticked, and a receipt with a reference on success.
 *
 * Submissions go to `VITE_SERVICE_REQUEST_ENDPOINT` when the deployment sets
 * one, otherwise to the workspace API at `/api/service-requests`. If neither
 * answers, the form says so plainly and keeps the filled-in details on screen —
 * it never reports a success it did not get.
 */

type ServiceClass =
  | "storage"
  | "real_estate"
  | "estate"
  | "commercial"
  | "junk"
  | "package";

const SERVICE_OPTIONS: { value: ServiceClass; label: string; icon: typeof Archive }[] = [
  { value: "storage", label: "Storage unit", icon: Archive },
  { value: "real_estate", label: "Property", icon: Home },
  { value: "estate", label: "Estate / probate", icon: FileBox },
  { value: "commercial", label: "Commercial closure", icon: Building2 },
  { value: "junk", label: "Junk / cleanout", icon: Trash2 },
  { value: "package", label: "Item or package pickup", icon: PackageCheck },
];

const ENDPOINT =
  (import.meta.env.VITE_SERVICE_REQUEST_ENDPOINT as string | undefined) ??
  "/api/service-requests";

const fieldBase =
  "w-full rounded-[0.5rem] border border-[var(--od-border)] bg-[var(--od-surface)] px-[0.875rem] py-[0.625rem] text-[0.9375rem] text-[var(--od-ink)] shadow-[inset_0_1px_2px_rgba(23,16,43,0.04)] outline-none transition placeholder:text-[var(--od-muted)] focus:border-[var(--od-violet)] focus:ring-3 focus:ring-[rgba(109,40,217,0.18)]";
const labelBase =
  "mb-[0.375rem] flex items-center gap-[0.4rem] text-[0.8125rem] font-semibold text-[var(--od-ink)]";
const requiredChip =
  "text-[0.625rem] font-medium tracking-[0.12em] text-[var(--od-muted)] uppercase";

type Accepted = { requestId: string; submittedAt?: string; message: string };

export function ContactBand() {
  return (
    <Band id="contact" className="pt-[1rem] pb-[4rem] lg:pt-[2rem] lg:pb-[6rem]">
      {/* The page's main action, framed as its own lit panel. */}
      <div className="relative overflow-hidden rounded-[1.25rem] border border-[rgba(109,40,217,0.18)] bg-[var(--od-surface)] p-[1.5rem] shadow-[0_2rem_4rem_-2rem_rgba(76,29,149,0.45)] md:p-[2.5rem] lg:p-[3rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[10rem] -right-[8rem] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(109,40,217,0.16),transparent_70%)]"
        />

        <div className="relative grid gap-[2rem] lg:grid-cols-[0.8fr_1.2fr] lg:gap-[3rem]">
        <div>
          <h2 className="od-d2">
            Tell us what needs <Mark>clearing.</Mark>
          </h2>
          <p className="mt-[1.25rem] text-[1.0625rem] leading-relaxed text-[var(--od-body)]">
            One form, whichever class of work it is. Give us the address or general area and what
            is in the way. We come back with a fixed plan, a written agreement and no cost to
            find out.
          </p>

          <ul className="mt-[2rem] space-y-[0.875rem]">
            {[
              ["A real answer, not a call centre", "Your request lands with the desk that scores the job."],
              ["Nothing upfront, ever", "Revenue share, assignment or pay-after-sale. No deposits."],
              ["Your details stay with us", "Used to respond to this request and nothing else."],
            ].map(([title, note]) => (
              <li key={title} className="flex items-start gap-[0.75rem]">
                <span
                  aria-hidden
                  className="mt-[0.15rem] flex h-[1.5rem] w-[1.5rem] shrink-0 items-center justify-center rounded-full bg-[var(--od-tone-violet-bg)] text-[var(--od-tone-violet-fg)]"
                >
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>
                  <span className="block text-[0.9375rem] font-semibold text-[var(--od-ink)]">
                    {title}
                  </span>
                  <span className="block text-[0.875rem] leading-relaxed text-[var(--od-body)]">
                    {note}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-[2rem] rounded-[0.75rem] border border-[var(--od-border)] bg-[var(--od-band-soft)] p-[1.25rem]">
            <p className="text-[0.875rem] leading-relaxed text-[var(--od-body)]">
              Prefer to talk first? Reply to the acknowledgment email with a time and we will
              call you back inside one working day.
            </p>
          </div>
        </div>

          <ServiceRequestForm />
        </div>
      </div>
    </Band>
  );
}

export function ServiceRequestForm() {
  const [serviceClass, setServiceClass] = useState<ServiceClass | "">("");
  const [serviceError, setServiceError] = useState("");
  const [consented, setConsented] = useState(false);
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [accepted, setAccepted] = useState<Accepted | null>(null);

  function reset() {
    setAccepted(null);
    setServerError("");
    setServiceError("");
    setServiceClass("");
    setConsented(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    if (!serviceClass) {
      setServiceError("Choose the closest service type to continue.");
      document.getElementById("service-type")?.focus();
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    setServerError("");
    setPending(true);

    const payload = {
      serviceClass,
      jobLocation: String(data.get("jobLocation") ?? "").trim(),
      description: String(data.get("description") ?? "").trim(),
      preferredDate: String(data.get("preferredDate") ?? "").trim() || null,
      fullName: String(data.get("fullName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim() || null,
      consentToContact: consented,
    };

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => ({}))) as Partial<Accepted> & {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(body.error ?? "The request could not be sent right now.");
      }
      setAccepted({
        requestId: body.requestId ?? "Pending",
        submittedAt: body.submittedAt,
        message:
          body.message ??
          "Your request is in. The desk will come back to you within one working day.",
      });
      form.reset();
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "We could not send your request right now. Please try again.",
      );
    } finally {
      setPending(false);
    }
  }

  if (accepted) {
    return (
      <div
        role="status"
        className="flex flex-col justify-center rounded-[0.75rem] border border-[var(--od-border)] bg-[var(--od-surface)] p-[2rem] text-center shadow-[0_1px_2px_rgba(23,16,43,0.04),0_1.75rem_3.5rem_-2rem_rgba(45,20,90,0.28)] md:p-[2.5rem]"
      >
        <span className="mx-auto flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[var(--od-tone-violet-bg)] text-[var(--od-violet)]">
          <Check size={22} strokeWidth={2.6} />
        </span>
        <p className="mt-[1rem] text-[0.75rem] font-semibold tracking-[0.16em] text-[var(--od-violet)] uppercase">
          Request received
        </p>
        <h3 className="od-h4 mt-[0.5rem]">Thank you. We have it.</h3>
        <p className="mx-auto mt-[0.75rem] max-w-[26rem] text-[0.9375rem] leading-relaxed text-[var(--od-body)]">
          {accepted.message}
        </p>
        <div className="mx-auto mt-[1.25rem] rounded-[0.5rem] border border-[var(--od-border)] bg-[var(--od-band)] px-[1rem] py-[0.6rem]">
          <span className="block text-[0.6875rem] tracking-[0.12em] text-[var(--od-muted)] uppercase">
            Request reference
          </span>
          <strong className="mt-[0.15rem] block text-[1rem] text-[var(--od-ink)]">
            {accepted.requestId}
          </strong>
        </div>
        <button
          type="button"
          onClick={reset}
          className="mx-auto mt-[1.5rem] cursor-pointer rounded-[0.4rem] border border-[var(--od-border)] px-[1rem] py-[0.5rem] text-[0.875rem] font-semibold text-[var(--od-ink)] transition hover:border-[var(--od-violet)] hover:text-[var(--od-violet)]"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[0.75rem] border border-[var(--od-border)] bg-[var(--od-surface)] shadow-[0_1px_2px_rgba(23,16,43,0.04),0_1.75rem_3.5rem_-2rem_rgba(45,20,90,0.28)]">
      {/* the card's own masthead: this is the page's primary action */}
      <div className="od-form-head">
        <p className="od-form-kicker">Free assessment</p>
        <h3 className="od-form-title">Request service</h3>
        <p className="od-form-lede">
          A person reads every request. You hear back within one working day.
        </p>
      </div>

      <div className="p-[1.5rem] md:p-[2rem]">
      <form onSubmit={handleSubmit} noValidate={false}>
        <fieldset disabled={pending} className="m-0 min-w-0 border-0 p-0">
          <section>
            <p className="od-step-head">
              <span className="od-step-num">01</span> What do you need cleared?
            </p>
            <div
              id="service-type"
              role="radiogroup"
              aria-label="Service type"
              tabIndex={-1}
              aria-describedby={serviceError ? "service-type-error" : undefined}
              className="mt-[0.75rem] grid grid-cols-2 gap-[0.5rem] sm:grid-cols-3"
            >
              {SERVICE_OPTIONS.map(({ value, label, icon: Icon }) => {
                const selected = serviceClass === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => {
                      setServiceClass(value);
                      setServiceError("");
                      setServerError("");
                    }}
                    className={cn(
                      "flex cursor-pointer items-center gap-[0.4rem] rounded-[0.5rem] border px-[0.6rem] py-[0.5rem] text-left text-[0.8125rem] font-medium transition",
                      selected
                        ? "border-[var(--od-violet)] bg-[var(--od-tone-violet-bg)] text-[var(--od-tone-violet-fg)]"
                        : "border-[var(--od-border)] bg-[var(--od-surface)] text-[var(--od-ink)] hover:border-[rgba(109,40,217,0.45)]",
                    )}
                  >
                    <Icon size={15} strokeWidth={1.8} />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
            {serviceError && (
              <span
                id="service-type-error"
                role="alert"
                className="mt-[0.5rem] flex items-center gap-[0.35rem] text-[0.8125rem] font-medium text-[#b42318]"
              >
                <CircleAlert size={13} /> {serviceError}
              </span>
            )}
          </section>

          <section className="mt-[1.5rem]">
            <p className="od-step-head">
              <span className="od-step-num">02</span> Where and what?
            </p>

            <div className="mt-[0.75rem] space-y-[0.875rem]">
              <div>
                <label htmlFor="jobLocation" className={labelBase}>
                  Job location <span className={requiredChip}>Required</span>
                </label>
                <input
                  id="jobLocation"
                  name="jobLocation"
                  required
                  minLength={2}
                  maxLength={240}
                  autoComplete="street-address"
                  placeholder="Street, city, or general area"
                  className={fieldBase}
                />
              </div>

              <div>
                <label htmlFor="description" className={labelBase}>
                  Tell us about the job <span className={requiredChip}>Required</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  minLength={10}
                  maxLength={1600}
                  rows={4}
                  placeholder="What needs to be handled? Include anything that would help us understand the work."
                  className={cn(fieldBase, "resize-y")}
                />
              </div>

              <div className="sm:w-1/2">
                <label htmlFor="preferredDate" className={labelBase}>
                  Preferred date{" "}
                  <span className="text-[0.6875rem] font-medium text-[var(--od-muted)]">Optional</span>
                </label>
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  className={fieldBase}
                />
              </div>
            </div>
          </section>

          <section className="mt-[1.5rem]">
            <p className="od-step-head">
              <span className="od-step-num">03</span> How can we reach you?
            </p>

            <div className="mt-[0.75rem] grid gap-[0.875rem] sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className={labelBase}>
                  Full name <span className={requiredChip}>Required</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  required
                  maxLength={160}
                  autoComplete="name"
                  placeholder="Your name"
                  className={fieldBase}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelBase}>
                  Email <span className={requiredChip}>Required</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={fieldBase}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone" className={labelBase}>
                  Phone{" "}
                  <span className="text-[0.6875rem] font-medium text-[var(--od-muted)]">Optional</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={80}
                  autoComplete="tel"
                  placeholder="A number where we can reach you"
                  className={fieldBase}
                />
              </div>
            </div>
          </section>

          <label
            htmlFor="consentToContact"
            className="mt-[1.25rem] flex cursor-pointer items-start gap-[0.6rem] text-[0.8125rem] leading-relaxed text-[var(--od-body)]"
          >
            <input
              id="consentToContact"
              name="consentToContact"
              type="checkbox"
              required
              checked={consented}
              onChange={(event) => setConsented(event.target.checked)}
              className="mt-[0.15rem] h-[1rem] w-[1rem] shrink-0 accent-[var(--od-violet-solid)]"
            />
            <span>
              I agree that Stuffout may contact me about this request.{" "}
              <strong className="font-semibold text-[var(--od-ink)]">Required</strong>
            </span>
          </label>
        </fieldset>

        {serverError && (
          <div
            role="alert"
            className="mt-[1rem] flex items-start gap-[0.5rem] rounded-[0.5rem] border border-[#f3c1bd] bg-[#fdf2f1] px-[0.75rem] py-[0.6rem] text-[0.8125rem] text-[#b42318]"
          >
            <CircleAlert size={15} className="mt-[0.1rem] shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <div className="mt-[1.6rem] border-t border-[var(--od-border)] pt-[1.35rem]">
          <button type="submit" disabled={pending} className="od-btn-submit">
            {pending ? "Sending…" : "Send request"}
            {!pending && <ArrowRight size={17} aria-hidden className="od-btn-submit-arrow" />}
          </button>

          <p className="mt-[0.75rem] text-center text-[0.75rem] leading-relaxed text-[var(--od-muted)]">
            No cost to find out. Your details are used only to reply to this request.
          </p>
        </div>
        {pending && (
          <p role="status" className="mt-[0.75rem] text-[0.75rem] text-[var(--od-muted)]">
            Your request is being sent. Please keep this page open.
          </p>
        )}
      </form>
      </div>
    </div>
  );
}
