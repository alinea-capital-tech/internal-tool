import { type SVGProps } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function Icon({
  name,
  childClassName,
  className,
  children,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: any;
  childClassName?: string;
}) {
  if (children) {
    return (
      <span
        className={cn(`inline-flex items-center font gap-1.5`, childClassName)}
      >
        <Icon name={name} className={className} {...props} />
        {children}
      </span>
    );
  }
  return (
    <svg
      {...props}
      className={cn("inline self-center w-[1em] h-[1em]", className)}
    >
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
