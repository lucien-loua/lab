import { SiteFooter } from "@/components/lab/layout/site-footer";
import { SiteHeader } from "@/components/lab/layout/site-header";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delay={250}>
      <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </div>
    </TooltipProvider>
  );
}
