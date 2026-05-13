import { copy } from "@/content/copy";

export default function About() {
  return (
    <div className="max-w-[680px] space-y-4">
      {copy.about.map((paragraph, i) => (
        <p key={i} className="text-base leading-relaxed text-foreground/80">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
