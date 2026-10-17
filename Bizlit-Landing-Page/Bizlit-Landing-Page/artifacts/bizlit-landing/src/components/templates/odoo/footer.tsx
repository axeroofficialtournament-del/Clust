import { Container } from "./bits";

/*
 * The footer, kept short: the wordmark and one line of positioning above three
 * equal link columns, then a plain copyright strip. Nothing here repeats a
 * section of the page.
 */

const GROUPS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Storage units", href: "#services" },
      { label: "Houses", href: "#services" },
      { label: "Estates & probate", href: "#services" },
      { label: "Commercial closures", href: "#services" },
      { label: "Junk & scrap", href: "#services" },
    ],
  },
  {
    title: "How it works",
    links: [
      { label: "How a job runs", href: "#process" },
      { label: "What we look for", href: "#sources" },
      { label: "Before you sign up", href: "#faq" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "Request a clearance", href: "#contact" },
      { label: "Talk to us", href: "#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--od-footer)] text-[#cec7e4]">
      <Container className="py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <a href="/" className="inline-flex items-center gap-2 self-start" aria-label="Stuffout home">
            <img src="/logo.png" alt="" className="h-8 w-8 rounded-lg object-cover" />
            <span
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Stuffout
            </span>
          </a>

          <p className="max-w-sm text-[15px] leading-relaxed md:text-right">
            Clearance, resale and payout for storage units, houses, estates and closing
            businesses.
          </p>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-10 border-t border-white/10 pt-10 sm:grid-cols-3">
          {GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <p className="mb-3 text-sm font-semibold text-white">{group.title}</p>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[15px] text-[#cec7e4] transition-colors hover:text-white hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-sm text-[#a49ec2]">
            © {new Date().getFullYear()} Stuffout. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
