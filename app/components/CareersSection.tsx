"use client";


type CareerOpening = {
  title: string;
  description: string;
  note: string;
};

type CareersSectionProps = {
  openings: CareerOpening[];
  imageUrl: string;
};

export default function CareersSection({ openings, imageUrl }: CareersSectionProps) {
  return (
    <section
      id="careers"
      className="space-y-10 rounded-[32px] border border-slate-200 bg-white p-10 shadow-[0_20px_40px_rgba(15,15,15,0.08)]"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Careers</p>
          <h3 className="text-3xl font-semibold text-slate-900">Grow with GAUVARON CORPORATE SOLUTIONS</h3>
          <p className="mt-3 text-md text-slate-600">
            We invest in people who thrive in fast-paced, collaborative environments and bring ownership to every engagement.
          </p>
          <div className="mt-6 space-y-4 text-md text-slate-600">
            {openings.map((opening) => (
              <div key={opening.title}>
                <p className="font-semibold text-slate-900">{opening.title}</p>
                <p>{opening.description}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{opening.note}</p>
              </div>
            ))}
          </div>
          <a
            href="/careers"
            className="mt-6 inline-flex rounded-full border border-slate-200 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-900 transition hover:border-slate-400"
          >
            Explore open roles
          </a>
        </div>
        <div className="relative h-72 w-full overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50">
          <img
            src={imageUrl}
            alt="Team working together"
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
