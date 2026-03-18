"use client";

import Image from "next/image";

type NavLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  links: NavLink[];
};

export default function Navbar({ links }: NavbarProps) {
  return (
    <div className="w-full border-b border-slate-200 ">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-2">
          <div className=" overflow-hidden  bg-white">
            <Image src="/Gauvaron.png" alt="Techno Communications logo" width={65} height={65} className="h-full w-full object-cover" />
          </div>
        
        </div>
        <div className="hidden items-center gap-4 text-md  text-slate-600 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="rounded-full px-4  transition hover:text-emerald-500">
              {link.label}
            </a>
          ))}
        </div>
       
      </div>
    </div>
  );
}
