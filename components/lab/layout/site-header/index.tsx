import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-6 sm:px-6">
      <Link className="font-medium font-mono text-sm tracking-tight" href="/">
        lab
      </Link>
      <nav className="flex items-center gap-1">
        <Button
          render={
            <a
              aria-label="Open repository on GitHub"
              href="https://github.com/lucien-loua/lab"
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubLogoIcon />
            </a>
          }
          size="icon-sm"
          variant="ghost"
        />
        <ThemeToggle />
      </nav>
    </header>
  );
}
