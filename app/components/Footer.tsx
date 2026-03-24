import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

const socialIcons = [
  { label: "LinkedIn", href: "https://www.linkedin.com", Icon: FaLinkedinIn },
  { label: "Facebook", href: "https://www.facebook.com", Icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com", Icon: FaInstagram },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-[#050814] text-slate-300">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="space-y-5 md:max-w-sm">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden   bg-white">
              <img src="/Gauvaron.png" alt="GAUVARON CORPORATE SOLUTIONS logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-lg font-semibold  text-[#237B80]">GAUVARON CORPORATE SOLUTIONS</p>
            </div>
          </div>
          <p className="text-md leading-relaxed text-slate-400">
            Global BPO, IT, and HR services wrapped in transparency, uptime, and modern collaboration.
          </p>
          <div className="space-y-2 text-md text-slate-400">
            <p>📍 Madhapur Hyderabad, Telangana, India</p>
            <p>✉️ info@gauvaron.com</p>
            <p>☎️ +91 8341174141</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-semibold   text-slate-500">Quick Links</h4>
          <nav aria-label="Footer quick links">
            <div className="space-y-2 text-md text-slate-300">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={`Go to ${link.label}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="space-y-4">
          <h4 className=" font-semibold text-xl  text-slate-500">Follow Us</h4>
          <div className="flex gap-3">
            {socialIcons.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 transition hover:border-white"
              >
                <Icon className="text-slate-300" size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 bg-[#030512] py-4">
        <div className="mx-auto flex max-w-6xl justify-center px-4 text-[15px]  text-slate-500">
          <span>© {year} GAUVARON CORPORATE SOLUTIONS . All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
