import { Link } from "@tanstack/react-router";
import React from "react";

const AlineaLink = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Link className={`primary-color font-bold text-sm ${className}`} to={href}>
      {children}
    </Link>
  );
};

export default AlineaLink;
