import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import ApproachSection from "./components/ApproachSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "#contact" },
];

const heroHighlights = [
  "Technology that fades into the background so your business can advance.",
  "People-first delivery with proactive communication channels.",
  "Modern workspaces guarded by transparent governance and uptime monitoring.",
];

const services = [
  {
    title: "Complete Technology Solutions",
    caption: "End-to-end IT management, development, and cloud services.",
  },
  {
    title: "Custom Software Development",
    caption: "Product engineering from idea through deployment.",
  },

  {
    title: "System Integration & QA",
    caption:
      "Connect disparate platforms with secure workflows and QA disciplines.",
  },
  {
    title: "IT Consulting & Strategy",
    caption: "Roadmaps that align budgets, compliance, and innovation.",
  },
];

const focusAreas = [
  "Streamlining business operations through resilient technology.",
  "Ensuring maximum system uptime while adapting to growth.",
  "Delivering cost-effective infrastructure and automation.",
];

const processSteps = [
  {
    title: "Discovery & Analysis",
    detail:
      "We listen before we build, mapping your goals, infrastructure, and long-term expectations.",
  },
  {
    title: "Strategic Planning",
    detail:
      "Our leadership codifies a realistic roadmap that balances innovation with business continuity.",
  },
  {
    title: "Implementation & Support",
    detail:
      "Execute the plan with minimal disruption and keep systems optimized with ongoing observability.",
  },
];

const stats = [
  { label: "Expert Team Members", value: "50+" },
  { label: "Years in IT Services", value: "10+" },
  { label: "Uptime Guarantee", value: "99%" },
];

const contact = {
  address: "Madhapur, Hyderabad, Telangana 500081",
  email: "info@gauvaron.com",
  phone: "+918019507755",
};

const remoteImages = {
  hero: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80",
  services:
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=900&q=80",
  approach:
    "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&w=900&q=80",
};

export default function Home() {
  return (
    <div className="bg-white text-slate-900">
      <Navbar links={navLinks} />
      <div className="mx-auto max-w-7xl space-y-16 px-6 py-6 lg:py-10">
        <section className="rounded-[32px] ">
          <div className="space-y-5 text-center">
            <h2 className="text-5xl font-bold tracking-tight text-slate-900">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e10174] to-[#a504ff]">
                GAUVARON CORPORATE SOLUTIONS
              </span>
            </h2>
            <p className="text-lg text-slate-600 mx-auto max-w-3xl">
              We blend modern IT, BPO, and HR services with a human-first
              delivery model. Explore our vision, services, and leadership to
              find the right partnership path.
            </p>{" "}
            <p className="text-lg text-slate-600 mx-auto max-w-3xl">
              Build career with us
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 text-md font-semibold uppercase  md:flex-row md:justify-center">
            <a
              href="/careers"
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e10174] to-[#a504ff] px-8 py-3 text-white transition hover:opacity-90"
            >
              Join Our Team <span aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 rounded-full border border-pink-500 px-8 py-3 text-pink-600 transition hover:bg-pink-50"
            >
              Contact Us
            </a>
          </div>
        </section>

        <HeroSection
          heroHighlights={heroHighlights}
          imageUrl={remoteImages.hero}
          contactEmail={contact.email}
        />

        <section className="space-y-6 rounded-[32px]  bg-white p-10">
          <div>
            {/* <p className="text-5xl text-slate-500 text-center">Vision · Mission · Values</p> */}
            <h2 className="text-3xl font-semibold text-slate-900 space-y-8 text-center">
              A technology partner that listens, designs, and delivers.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-semibold text-slate-900">
                Our Mission
              </h3>
              <p className="mt-3 text-md text-slate-600">
                Empower businesses with exceptional IT solutions so leaders stay
                focused on their core competencies. We deliver scalable,
                reliable services that keep your people and infrastructure
                humming.
              </p>
              <ul className="mt-4 space-y-2 text-md text-slate-600">
                {focusAreas.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl  bg-slate-50 p-6">
              <h3 className="text-xl font-semibold text-slate-900">
                Our Vision
              </h3>
              <p className="mt-3 text-md text-slate-600">
                To become the most trusted technology partner for businesses
                across India and beyond—driving seamless digital transformation
                with expert guidance, innovative solutions, and unwavering
                support.
              </p>
              <div className="mt-4 space-y-2 text-md text-slate-600">
                <p>• Lead digital transformation initiatives</p>
                <p>• Expand expertise in emerging technologies</p>
                <p>• Build long-term strategic partnerships</p>
                <p>• Set industry standards for IT service delivery</p>
              </div>
            </article>
          </div>
        </section>

        <ServicesSection
          services={services}
          stats={stats}
          imageUrl={remoteImages.services}
        />

        <ApproachSection
          steps={processSteps}
          imageUrl={remoteImages.approach}
        />

        <section className="rounded-[32px]  bg-white p-10 ">
          <p className="text-5xl uppercase text-emerald-500">From our CEO</p>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">
                Leadership that you can hear from the very first conversation.
              </h2>
              <p className="mt-4 text-md text-slate-600">
                Arun Potharaju shares how transparency, human-first delivery,
                and a relentless focus on innovation keep TCGL moving ahead.
                Explore the full CEO message to understand what inspires every
                engagement.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="/ceo-message"
                  className="rounded-full bg-slate-900 px-6 py-3 text-[15px] font-semibold uppercase text-white transition hover:bg-slate-700"
                >
                  Read the CEO message
                </a>
                <a
                  href="/careers"
                  className="rounded-full border border-slate-900 px-6 py-3 text-[15px] uppercase font-semibold  text-slate-900 transition hover:border-emerald-500"
                >
                  Explore careers
                </a>
              </div>
            </div>
            <div className="relative h-72 w-full overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50">
              <Image
                src={remoteImages.hero}
                alt="CEO portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <ContactSection contact={contact} />
      </div>
      <Footer />
    </div>
  );
}
