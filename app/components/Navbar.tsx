"use client";

import Link from "next/link";
import { useState } from "react";

type NavLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  links: NavLink[];
};

export default function Navbar({ links }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:flex-nowrap">
        <Link
          href="/"
          aria-label="Go to homepage"
          className="flex items-center gap-2 rounded-full bg-white p-1"
        >
          <div className="h-25 w-25 overflow-hidden rounded-full">
            <img
              src="/Gauvaron.png"
              alt="Gauvaron logo"
              width={65}
              height={65}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>

        <button
          type="button"
          className="md:hidden rounded-full border border-slate-200 bg-white px-4 py-1 text-sm font-semibold text-slate-700 shadow-sm"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <nav
          id="primary-navigation"
          className={`${
            menuOpen ? "flex" : "hidden"
          } w-full flex-col gap-2 text-sm font-semibold text-slate-600 md:flex md:w-auto md:flex-row`}
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2 transition hover:text-[#237B80] md:px-5"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
