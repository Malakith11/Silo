import * as React from "react";
import { clsx } from "clsx";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  align?: "left" | "center" | "right";
  eyebrow?: string;
}

const levelStyles: Record<HeadingLevel, string> = {
  1: "text-4xl font-semibold sm:text-5xl",
  2: "text-3xl font-semibold sm:text-4xl",
  3: "text-2xl font-semibold sm:text-3xl",
  4: "text-xl font-semibold sm:text-2xl",
  5: "text-lg font-semibold",
  6: "text-base font-semibold",
};

export const Heading = ({
  level = 2,
  align = "left",
  eyebrow,
  className,
  children,
  ...props
}: HeadingProps) => {
  const Component = (`h${level}` as unknown) as keyof JSX.IntrinsicElements;

  return (
    <div className={clsx("space-y-2", align === "center" && "text-center", align === "right" && "text-right")}>
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-secondary">
          {eyebrow}
        </p>
      ) : null}
      {React.createElement(
        Component,
        {
          className: clsx("font-display text-brand-dark", levelStyles[level], className),
          ...props,
        },
        children,
      )}
    </div>
  );
};
