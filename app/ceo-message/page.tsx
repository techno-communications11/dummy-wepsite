import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Careers", href: "/#careers" },
  { label: "Contact", href: "/#contact" },
];

const focusPillars = [
  {
    title: "Customer-First Delivery",
    body: "Every initiative starts with a deep listening session that informs measurable KPIs and transparent governance.",
  },
  {
    title: "People-Driven Culture",
    body: "We invest in continuous learning, psychological safety, and decisive leadership so teams can do their best work.",
  },
  {
    title: "Resilient Innovation",
    body: "Forecasting risk, hardening controls, and embracing automation keeps operations nimble for our partners.",
  },
];

// const timeline = [
//   {
//     year: "2022",
//     detail: "Expanded into new BPO & HR verticals with four large enterprise banking clients.",
//   },
//   {
//     year: "2024",
//     detail: "Launched the cloud-first DevOps studio that unifies infrastructure, security, and automation.",
//   },
//   {
//     year: "2025",
//     detail: "Invested in employee experience programs and community partnerships across Hyderabad.",
//   },
// ];

const heroImage =
  "/write.webp";

export default function CeoMessagePage() {
  return (
    <div className="bg-white text-slate-900">
      <Navbar links={navLinks} />

      <main className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-10 lg:py-16">
        <section className="grid gap-10  bg-white p-10  lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-4xl text-[#237B80]">Letter from the CEO</p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              Purposeful leadership that keeps our people and partners moving forward.
            </h1>
            <p className="text-lg text-slate-600">
              I am proud to lead GAUVARON CORPORATE SOLUTIONS as we redefine dependable IT, BPO, and HR delivery. Our
              teams partner with you, not just to solve today’s challenges, but to prepare you for what’s next.
              Transparency, measurable outcomes, and a relentless drive to elevate human potential are at the heart of
              our promise.
            </p>
  
          </div>
          <div className="relative h-80 w-full overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50">
            <Image
              src={heroImage}
              alt="CEO speaking"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
          </div>
        </section>

        <section className="space-y-6 bg-white p-10 ">
          <div>
            <h2 className="text-4xl font-bold text-center mb-3 text-[#237B80]">A message to our clients and colleagues</h2>
            <p className="mt-3 text-md text-slate-600 mt-3 text-center">
              The most meaningful work happens when we align around a shared definition of success. <br/>I invite every
              partner to hold us accountable to the promises we make—about uptime,<br/> strategic direction, and the wellbeing
              of the people who deliver your services.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 mt-3">
            {focusPillars.map((pillar) => (
              <article key={pillar.title} className="space-y-2 rounded-2xl border border-slate-200 p-5 text-md text-slate-600">
                <h3 className="text-base font-semibold text-slate-900">{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* <section className="space-y-6  bg-white p-10 ">
          <div>
            <h2 className="text-4xl font-semibold text-pink-900 text-center">Momentum & milestones</h2>
            <p className="mt-3 text-md text-slate-600 text-center">
              These milestones reflect how we stay future-ready while grounding every engagement in trust and clarity.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {timeline.map((item) => (
              <div key={item.year} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-md text-slate-600">
                <p className="text-lg font-semibold text-slate-900">{item.year}</p>
                <p className="mt-2 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
}
