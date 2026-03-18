"use client";

import Image from "next/image";

type Service = {
  title: string;
  caption: string;
};

type Stat = {
  label: string;
  value: string;
};

type ServicesSectionProps = {
  services: Service[];
  stats: Stat[];
  imageUrl: string;
};

export default function ServicesSection({ services, stats, imageUrl }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="space-y-10 rounded-[32px] bg-white p-10 "
    >
      <p className="text-5xl text-center text-slate-500">Our Services</p>
      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        
        <div>
          
          <h3 className="text-3xl font-semibold text-slate-900">Modern IT, BPO, and HR solutions.</h3>
          <div className="mt-6 space-y-4 text-md text-slate-600">
            {services.map((service) => (
              <p key={service.title}>
                <span className="block font-semibold text-slate-900">{service.title}</span>
                {service.caption}
              </p>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <article className="space-y-3 rounded-2xl bg-gradient-to-br from-[#2D9EA4] to-[#2DD7D1] p-5 text-white ">
              <h4 className="text-xl font-semibold">BPO Services</h4>
              <p className="text-md text-white/80">
                From contact center delivery to back-office operations and analytics, we embed automation and
                empathy so your customer experience is consistent.
              </p>
            </article>
            <article className="space-y-3 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-white ">
              <h4 className="text-xl font-semibold">HR Solutions</h4>
              <p className="text-md text-white/80">
                Strategic HR programs, payroll, compliance, and talent enablement that scale across regions with
                transparent governance.
              </p>
            </article>
          </div>
          <div className="mt-8 grid gap-6 text-slate-600 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-md  text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-72 w-full overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50">
          <Image
            src={imageUrl}
            alt="Collaboration illustration"
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
