import Link from "next/link";

const footerLinks = [
  {
    col1: [
      { label: "Company", href: "/about" },
      { label: "Solutions", href: "/products" },
      { label: "Resources", href: "/resources" },
    ],
    col2: [
      { label: "Partnership", href: "/contact" },
      { label: "Legal", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant/20">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-component-gap px-margin-mobile md:px-margin-desktop py-section-gap max-w-[1440px] mx-auto">
        {/* Brand */}
        <div className="col-span-2 flex flex-col justify-between h-full">
          <div className="text-headline-md font-bold text-primary mb-8">
            LabMu
          </div>
          <div className="text-label-sm text-on-surface-variant">
            © 2024 LabMu. Institutional Excellence in Digital Infrastructure.
          </div>
        </div>

        {/* Links Col 1 */}
        <div className="col-span-1 flex flex-col gap-4 text-body-md">
          {footerLinks[0].col1.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-1 underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Links Col 2 */}
        <div className="col-span-1 flex flex-col gap-4 text-body-md">
          {footerLinks[0].col2.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-1 underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
