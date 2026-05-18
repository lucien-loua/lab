import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

export function BackLink({ href = "/" }: { href?: string }) {
  return (
    <Link
      className={buttonVariants({ variant: "ghost", size: "sm" })}
      href={href}
    >
      <ArrowLeftIcon data-icon="inline-start" />
      back
    </Link>
  );
}
