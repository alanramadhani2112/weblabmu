"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Resources", href: "/resources" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-headline-md font-bold tracking-tight text-primary"
        >
          LabMu
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center text-label-md">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-primary transition-colors"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="hidden md:block bg-primary text-on-primary text-label-md px-6 py-3 hover:opacity-80 transition-opacity"
        >
          Hubungi Kami
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant/20 px-margin-mobile py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-label-md text-on-surface-variant hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-primary text-on-primary text-label-md px-6 py-3 text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Hubungi Kami
          </Link>
        </div>
      )}
    </nav>
  );
}
