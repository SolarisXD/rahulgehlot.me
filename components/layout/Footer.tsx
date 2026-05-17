import ViewerCounter from "@/components/ui/ViewerCounter";

export default function Footer() {
  return (
    <footer className="w-full py-6 text-sm text-muted">
      <div className="relative flex items-center px-4 sm:px-10">
        <div className="flex-shrink-0">
          <ViewerCounter />
        </div>
        <p className="absolute left-1/2 -translate-x-1/2 text-center">
          © 2026 Rahul Gehlot &middot;
          <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
}
