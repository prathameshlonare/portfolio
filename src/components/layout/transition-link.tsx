"use client";

import React, { AnchorHTMLAttributes } from "react";
import { useTransitionNavigate } from "@/components/providers/transition-provider";

interface TransitionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function TransitionLink({
  href,
  children,
  onClick,
  ...props
}: TransitionLinkProps) {
  const { navigate } = useTransitionNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // Allow external or internal hash links to function normally
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) {
      return;
    }

    e.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
