import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BackLink({ href = "/" }: { href?: string }) {
  return (
    <Button render={<Link href={href} />} size="sm" variant="ghost">
      <ArrowLeftIcon data-icon="inline-start" />
      back
    </Button>
  );
}
