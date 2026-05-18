export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto mt-16 flex w-full max-w-3xl items-center justify-between px-4 py-8 text-muted-foreground text-xs sm:px-6">
      <span>
        © {year}{" "}
        <a
          className="underline-offset-4 hover:text-foreground hover:underline"
          href="https://github.com/lucien-loua"
        >
          Lucien Loua
        </a>
      </span>
      <span className="font-mono">
        <kbd className="rounded border bg-muted px-1.5 py-0.5">d</kbd> to toggle
        theme
      </span>
    </footer>
  );
}
