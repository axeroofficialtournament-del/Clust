import { Container, Doodle, odBtnLg } from "./bits";

/*
 * The close of the odoo.com landing page: `pt-10 pb-7` (12rem/6rem), one
 * display-1 line whose first word wears the sketched fireworks, the tail in
 * the page's orchid, a large violet button, then the small violet arrow pointing back
 * up at it and the two reassurances underneath.
 */

export default function Cta() {
  return (
    <section className="overflow-hidden pt-[12rem] pb-[6rem] text-center">
      <Container>
        <h3 className="od-d1 mb-[3rem]">
          <span className="od-fireworks">One desk,</span>
          <br />
          every distress <span className="text-[var(--od-accent)]">one decision</span>
        </h3>

        <a href="#contact" className={odBtnLg + " mb-[1rem]"}>
          Request service
        </a>

        <Doodle src="/img/odoo/green_arrow_sm_01.svg" width={15} className="mx-auto mb-[0.5rem]" />

        <small className="block text-[0.875rem] leading-normal">
          Nothing upfront, ever
          <br />
          Written agreement first
        </small>
      </Container>
    </section>
  );
}
