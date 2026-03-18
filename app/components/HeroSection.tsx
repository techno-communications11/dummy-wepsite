"use client";


type HeroSectionProps = {
  heroHighlights: string[];
  imageUrl: string;
  contactEmail: string;
};

export default function HeroSection({ heroHighlights, imageUrl }: HeroSectionProps) {
  return (
    <section
      id="about"
      className="space-y-10   bg-white p-10"
    >
      <p className="text-3xl font-semibold text-center text-[#237B80] sm:text-4xl">About us</p>
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            Innovation, reliability, and technology delivered under one roof.
          </h1>
          <p className="text-base text-slate-600 sm:text-lg">
            GAUVARON CORPORATE SOLUTIONS  brings together the energy of modern workspaces, collaboration, and the serene confidence you already appreciate on the reference site. We craft IT, BPO, and HR programs with transparency, uptime, and tomorrow’s vision.
          </p>
          <ul className="space-y-3 text-sm text-slate-600 sm:text-md">
            {heroHighlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#237B80]" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50">
          <div className="h-72 w-full md:h-[360px]">
            <img
              src={imageUrl}
              alt="Tech team at work"
              sizes="(max-width: 1024px) 100vw, 480px"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
     
    </section>
  );
}
