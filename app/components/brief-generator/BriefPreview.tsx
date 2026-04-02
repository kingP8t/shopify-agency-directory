import type { BriefData } from "./types";

function Section({
  title,
  stepNumber,
  onEdit,
  children,
}: {
  title: string;
  stepNumber: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-gray-100 pt-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wide text-green-600">
          {title}
        </h3>
        <button
          onClick={() => onEdit(stepNumber)}
          className="text-xs font-medium text-gray-400 hover:text-green-600"
        >
          Edit
        </button>
      </div>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <span className="text-xs font-semibold uppercase text-gray-400">
        {label}
      </span>
      <p className="text-sm text-gray-800">{value}</p>
    </div>
  );
}

export default function BriefPreview({
  data,
  onEdit,
}: {
  data: BriefData;
  onEdit: (step: number) => void;
}) {
  return (
    <div className="space-y-5">
      <Section title="About Your Business" stepNumber={1} onEdit={onEdit}>
        <Field label="Company" value={data.companyName} />
        <Field label="Website" value={data.websiteUrl} />
        <Field label="Industry" value={data.industry} />
        <Field label="Current Platform" value={data.currentPlatform} />
        <Field label="Monthly Revenue" value={data.monthlyRevenue} />
      </Section>
      <Section title="Project Type" stepNumber={2} onEdit={onEdit}>
        <Field label="Project" value={data.projectType} />
      </Section>
      <Section title="Goals & Requirements" stepNumber={3} onEdit={onEdit}>
        {data.goals.length > 0 && (
          <Field label="Goals" value={data.goals.join(", ")} />
        )}
        <Field label="Must-Have Features" value={data.mustHaveFeatures} />
        <Field label="Nice-to-Have Features" value={data.niceToHaveFeatures} />
      </Section>
      <Section title="Design Preferences" stepNumber={4} onEdit={onEdit}>
        <Field label="Style" value={data.designStyle} />
        <Field label="Example Websites" value={data.exampleWebsites} />
        <Field label="Brand Guidelines" value={data.hasBrandGuidelines} />
      </Section>
      <Section title="Technical Requirements" stepNumber={5} onEdit={onEdit}>
        {data.integrations.length > 0 && (
          <Field label="Integrations" value={data.integrations.join(", ")} />
        )}
        <Field label="Catalog Size" value={data.catalogSize} />
        <Field label="Multi-Language" value={data.multiLanguage} />
        <Field label="Multi-Currency" value={data.multiCurrency} />
      </Section>
      <Section title="Timeline & Budget" stepNumber={6} onEdit={onEdit}>
        <Field label="Launch Date" value={data.launchDate} />
        <Field label="Budget" value={data.budgetRange} />
        <Field label="Flexibility" value={data.timelineFlexibility} />
      </Section>
      <Section title="Contact Information" stepNumber={7} onEdit={onEdit}>
        <Field label="Name" value={data.contactName} />
        <Field label="Email" value={data.contactEmail} />
        <Field label="Phone" value={data.contactPhone} />
        {data.additionalNotes && (
          <Field label="Additional Notes" value={data.additionalNotes} />
        )}
      </Section>
    </div>
  );
}
