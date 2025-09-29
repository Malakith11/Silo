import * as React from "react";
import { clsx } from "clsx";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padded?: boolean;
  width?: "default" | "narrow" | "wide";
}

const widthStyles: Record<Required<SectionProps>["width"], string> = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
};

export const Section = ({
  padded = true,
  width = "default",
  className,
  children,
  ...props
}: SectionProps) => (
  <section
    className={clsx(
      "w-full",
      padded && "py-16 sm:py-24",
      "px-6 sm:px-8",
      className,
    )}
    {...props}
  >
    <div className={clsx("mx-auto", widthStyles[width])}>{children}</div>
  </section>
);
