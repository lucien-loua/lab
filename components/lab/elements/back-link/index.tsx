import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function BackLink({ href = "/" }: { href?: string }) {
  return (
    <Link
      className={buttonVariants({ variant: "ghost", size: "sm" })}
      href={href}
    >
      <ArrowLeftIcon data-icon="inline-start" weight="duotone" />
      back
    </Link>
  );
}
