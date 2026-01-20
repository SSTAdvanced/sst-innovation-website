type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  tone = "dark"
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center" : "text-left";
  const titleColor = tone === "light" ? "text-white" : "text-slate-900";
  const subtitleColor = tone === "light" ? "text-blue-100" : "text-slate-600";

  return (
    <div className={`${alignment} mb-10`}>
      <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight ${titleColor}`}>{title}</h2>
      {subtitle ? (
        <p className={`mt-3 text-base md:text-lg ${subtitleColor}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}
