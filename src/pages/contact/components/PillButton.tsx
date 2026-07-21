import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  asChildHref?: string;
};

export function PillButton({ children, asChildHref, className = "", ...rest }: Props) {
  const classes = `group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md hover:opacity-90 ${className}`;
  const style = { backgroundColor: "#2563eb" };

  if (asChildHref) {
    return (
      <a href={asChildHref} className={classes} style={style}>
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    );
  }
  return (
    <button className={classes} style={style} {...rest}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
}
