import { Link as TLink, useRouterState } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

type LinkProps = Omit<ComponentProps<typeof TLink>, "to" | "params"> & {
  to: string;
  children?: ReactNode;
  className?: string;
  params?: Record<string, unknown>;
};

// Drop-in `Link` matching react-router-dom's API surface used in this project.
export function Link({ to, ...rest }: LinkProps) {
  const [path, hash] = to.split("#");
  return <TLink to={path || "/"} hash={hash} {...(rest as Record<string, unknown>)} />;
}

type NavLinkClassFn = (s: { isActive: boolean; isPending: boolean }) => string;
type NavLinkProps = Omit<LinkProps, "className" | "children"> & {
  className?: string | NavLinkClassFn;
  children?: ReactNode | ((s: { isActive: boolean; isPending: boolean }) => ReactNode);
  end?: boolean;
};

export function NavLink({ to, className, children, end, ...rest }: NavLinkProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [path] = to.split("#");
  const target = path || "/";
  const isActive = end || target === "/" ? pathname === target : pathname.startsWith(target);
  const state = { isActive, isPending: false };
  const resolvedClass = typeof className === "function" ? className(state) : className;
  const resolvedChildren = typeof children === "function" ? children(state) : children;
  return (
    <Link to={to} className={resolvedClass} {...rest}>
      {resolvedChildren}
    </Link>
  );
}

export { useLocation, useNavigate, useParams } from "@tanstack/react-router";
