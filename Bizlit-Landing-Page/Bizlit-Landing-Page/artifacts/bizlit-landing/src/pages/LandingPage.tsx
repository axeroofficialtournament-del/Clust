import Header from "@/components/templates/odoo/header";
import Hero from "@/components/templates/odoo/hero";
import SourcesBand from "@/components/templates/odoo/apps-grid";
import { PhotoCreditLine, ServicesBand } from "@/components/templates/odoo/services";
import { LevelUpBand, StepsBand } from "@/components/templates/odoo/levelup";
import { ContactBand } from "@/components/templates/odoo/contact";
import { ArrowBand, UsersBand, TestimonialBand } from "@/components/templates/odoo/proof";
import { AiBand, DoneRightBand, FaqBand, FeaturesBand, type FaqItem } from "@/components/templates/odoo/story";
import Cta from "@/components/templates/odoo/cta";
import Footer from "@/components/templates/odoo/footer";

/*
 * The landing page, on odoo.com's design: the flat white header, the two-column
 * hero (promise on the left, the furnished-to-cleared split on the right),
 * the "imagine without" source wall straight underneath it, the five classes
 * of work with a photograph each, the clearance run on its track line, then
 * what the desk does, the four-class collage, a white AI band, the arched
 * "done right" band carrying the plan, social proof, the FAQ, the service
 * request form, and the closing call to action above the aubergine footer.
 *
 * It is pitched for the distress-intelligence operating desk: sources swept on
 * cadence, four scoring engines and a master router, one decision per lead —
 * bid, wholesale, cleanout, runner-scrap or pass — and revenue-share
 * monetization that never needs upfront cash.
 *
 * The skin lives in `.theme-odoo` (src/index.css) so none of it reaches the
 * signed-in workspace, and every section it composes is in
 * src/components/templates/odoo/.
 */

const FAQ: FaqItem[] = [
  {
    q: "Which assets does it cover?",
    a: "Five classes: storage units heading to lien sale, distressed real estate, estates and probate property, commercial closures, and bulk junk or scrap. Every lead is tagged, scored and routed by its own class engine.",
  },
  {
    q: "How do the scoring engines work?",
    a: "Each class has its own weighted rubric — brand visibility, container composition, owner motivation, title clarity and so on. The math is fixed: the same inputs always produce the same score, and the router turns the score into bid, conditional bid, contract, cleanout, scrap run or pass.",
  },
  {
    q: "What does it cost to run a deal?",
    a: "Nothing upfront. Every deal is structured as a revenue share, a wholesaling assignment fee, or pay-after-sale — and the same-day scrap floor pays the runners and crews first so the operation never needs capital.",
  },
  {
    q: "What do owners and heirs actually get?",
    a: "A written agreement and a plain-English deal: storage tenants keep a share of resale instead of getting nothing at auction, estates are cleared for free with 80–90% of net proceeds remitted, and homeowners get a cash offer through mapped investors with zero commissions.",
  },
  {
    q: "Do you handle everything encountered?",
    a: "No. Hard vetoes out regardless of the score: biohazards, unresolvable title defects, jurisdictions requiring licensure we don't hold. Those leads get logged, code-recorded and passed to a partner.",
  },
  {
    q: "How do the runners and crews get paid?",
    a: "On the day the job pays. Scrap yards settle same-day, runners take 30–40% of what each run nets, and nobody is ever paid upfront. Every payout's math is published in the deal ledger.",
  },
];

export function LandingPage() {
  return (
    <div className="theme-odoo w-full overflow-x-clip bg-white text-[var(--od-body)]">
      <Header />
      <main>
        <Hero />

        {/* "Imagine without BIZLIT" sits directly under the hero */}
        <SourcesBand />

        {/* the five classes of work, each with its own photograph */}
        <ServicesBand />
        <StepsBand />

        {/* the grey run — odoo.com keeps these bands contiguous */}
        <FeaturesBand />
        <LevelUpBand />

        <AiBand />
        <DoneRightBand />

        {/* white again for the proof, the request form and the close */}
        <ArrowBand />
        <UsersBand />
        <TestimonialBand />
        <FaqBand items={FAQ} />
        <ContactBand />
        <Cta />
        <PhotoCreditLine />
      </main>
      <Footer />
    </div>
  );
}
