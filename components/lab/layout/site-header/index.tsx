import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/toggle";
import { buttonVariants } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-6 sm:px-6">
      <Link className="font-medium font-mono text-sm tracking-tight" href="/">
        lab
      </Link>
      <nav className="flex items-center gap-1">
        <a
          aria-label="Open repository on GitHub"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
          href="https://github.com/lucien-loua/lab"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GithubLogoIcon weight="duotone" />
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
