import { randomUUID } from "node:crypto";
import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

/*
 * Service requests from the landing page's contact form.
 *
 * Validation is explicit rather than schema-driven so this route stays usable
 * with no database provisioned: submissions are held in memory and echoed back
 * with a reference the visitor can quote. Swap `REQUESTS` for the workspace
 * drizzle client once a table exists — the request shape is already the one the
 * Client-Service-Request app posts.
 *
 * NOTE: in-memory storage means a restart drops unclaimed requests. That is
 * fine for a preview; do not ship it as the only store.
 */

const SERVICE_CLASSES = [
  "storage",
  "real_estate",
  "estate",
  "commercial",
  "junk",
  "package",
] as const;

type ServiceClass = (typeof SERVICE_CLASSES)[number];

type ServiceRequest = {
  requestId: string;
  serviceClass: ServiceClass;
  fullName: string;
  email: string;
  phone: string | null;
  jobLocation: string;
  description: string;
  preferredDate: string | null;
  consentToContact: true;
  submittedAt: string;
};

const REQUESTS = new Map<string, ServiceRequest>();

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, min: number, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length < min || trimmed.length > max) return null;
  return trimmed;
}

const router: IRouter = Router();

router.post("/service-requests", (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;

  const serviceClass = body.serviceClass as ServiceClass;
  if (!SERVICE_CLASSES.includes(serviceClass)) {
    res.status(400).json({ error: "Choose a service type for this request." });
    return;
  }

  const fullName = text(body.fullName, 1, 160);
  const email = text(body.email, 3, 254);
  const jobLocation = text(body.jobLocation, 2, 240);
  const description = text(body.description, 10, 1600);

  if (!fullName) {
    res.status(400).json({ error: "A name is required so we know who to reply to." });
    return;
  }
  if (!email || !EMAIL.test(email)) {
    res.status(400).json({ error: "A valid email address is required." });
    return;
  }
  if (!jobLocation) {
    res.status(400).json({ error: "Add the job location or general area." });
    return;
  }
  if (!description) {
    res.status(400).json({ error: "Tell us a little about the job (10 characters or more)." });
    return;
  }
  if (body.consentToContact !== true) {
    res.status(400).json({ error: "Consent to be contacted is required." });
    return;
  }

  const request: ServiceRequest = {
    requestId: `DSR-${randomUUID().slice(0, 8).toUpperCase()}`,
    serviceClass,
    fullName,
    email,
    phone: text(body.phone, 1, 80),
    jobLocation,
    description,
    preferredDate: text(body.preferredDate, 1, 40),
    consentToContact: true,
    submittedAt: new Date().toISOString(),
  };

  REQUESTS.set(request.requestId, request);
  logger.info({ requestId: request.requestId, serviceClass }, "service request received");

  res.status(201).json({
    requestId: request.requestId,
    submittedAt: request.submittedAt,
    message:
      "Your request is on the desk. We will come back within one working day with a plan for the job.",
  });
});

export default router;
