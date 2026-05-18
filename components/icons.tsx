// Phosphor icon re-exports with `weight="duotone"` as the project default.
// Override per usage by passing `weight={...}` on the icon, e.g.
//   <ArrowLeftIcon weight="bold" />
import type { Icon } from "@phosphor-icons/react";
import {
  ArrowLeftIcon as ArrowLeftRaw,
  ArrowUpRightIcon as ArrowUpRightRaw,
  GithubLogoIcon as GithubLogoRaw,
  MoonIcon as MoonRaw,
  SunIcon as SunRaw,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentProps } from "react";

function withDuotone(Component: Icon, displayName: string): Icon {
  function Wrapped(props: ComponentProps<Icon>) {
    return <Component weight="duotone" {...props} />;
  }
  Wrapped.displayName = displayName;
  return Wrapped as Icon;
}

export const ArrowLeftIcon = withDuotone(ArrowLeftRaw, "ArrowLeftIcon");
export const ArrowUpRightIcon = withDuotone(
  ArrowUpRightRaw,
  "ArrowUpRightIcon"
);
export const GithubLogoIcon = withDuotone(GithubLogoRaw, "GithubLogoIcon");
export const MoonIcon = withDuotone(MoonRaw, "MoonIcon");
export const SunIcon = withDuotone(SunRaw, "SunIcon");
