"use client";


type ApproachStep = {
  title: string;
  detail: string;
};

type ApproachSectionProps = {
  steps: ApproachStep[];
  imageUrl: string;
};

export default function ApproachSection({ steps, imageUrl }: ApproachSectionProps) {
  return (
    <section className="space-y-10 rounded-[32px]  bg-white p-10 ">
      <p className="text-5xl text-semibold text-[#237B80]">Approach</p>
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          
          <h3 className="text-3xl font-semibold text-slate-900">Structure that keeps delivery predictable.</h3>
          <div className="mt-4 space-y-3 text-md text-slate-600">
            {steps.map((step) => (
              <p key={step.title}>
                <span className="font-semibold text-slate-900">{step.title}:</span> {step.detail}
              </p>
            ))}
          </div>
        </div>
        <div className="relative h-72 w-full overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50">
          <img
            src={imageUrl}
            alt="Modern workspace"
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
