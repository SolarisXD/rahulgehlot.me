export function SectionHeader({
  label,
  heading,
  subheading,
}: {
  label: string;
  heading: string;
  subheading?: string;
}) {
  return (
    <div className="mb-12">
      <p className="text-xs font-medium uppercase tracking-widest text-muted mb-2">
        {label}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight">{heading}</h2>
      {subheading && (
        <p className="mt-2 text-muted max-w-xl">{subheading}</p>
      )}
    </div>
  );
}
