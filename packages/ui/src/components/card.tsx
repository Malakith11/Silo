import * as React from "react";
import { clsx } from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "outline" | "subtle";
}

const variantStyles: Record<Required<CardProps>["variant"], string> = {
  elevated: "bg-white shadow-lg shadow-brand-dark/5",
  outline: "border border-brand-dark/10 bg-white",
  subtle: "bg-brand-light",
};

export const Card = ({
  variant = "elevated",
  className,
  children,
  ...props
}: CardProps) => (
  <div
    className={clsx(
      "rounded-3xl p-6 sm:p-8 transition-all",
      variantStyles[variant],
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
