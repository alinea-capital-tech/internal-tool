"use client";

import Logo from "./Logo";
import AvatarDropdown from "./AvatarDropdown";
import AlineaLink from "./AlineaLink";
import { Link } from "@tanstack/react-router";

const Header = () => {
  const navLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Risk Management",
      href: "/risk-center",
    },
    {
      label: "OMS/Execution",
      href: "/oms",
    },
    {
      label: "Macro Panel",
      href: "/macro",
    },
    {
      label: "Agent Monitoring",
      href: "/agent-monitoring",
    },
    {
      label: "Portfolio Live",
      href: "/portfolio-live",
    },
    {
      label: "Backtest Hub",
      href: "/backtest-hub",
    },
    {
      label: "Strategy Health",
      href: "/strategy-health",
    },
  ];

  return (
    <div className="h-[84px] flex justify-between items-center px-8 bg-[#D9D8D6]/70 fixed w-full top-0 backdrop-blur-md z-50">
      <Logo height={36} width={78} className="h-[36px] w-[78px]" />
      <AvatarDropdown>
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <AlineaLink href={link.href} key={link.label}>
              {link.label}
            </AlineaLink>
          ))}
          <Link
            className={`primary-color font-bold text-sm`}
            to="/"
            onClick={() => {
              console.log("Cerrar sesión clicked");
            }}
          >
            Cerrar sesión
          </Link>
        </div>
      </AvatarDropdown>
    </div>
  );
};

export default Header;
