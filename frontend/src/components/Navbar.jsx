"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Importa los iconos de Heroicons
import { HomeIcon, CubeIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Define items con iconos
  const navItems = [
    { label: "Inicio", href: "/", icon: HomeIcon },
    { label: "Producto", href: "/productos", icon: CubeIcon },
  ];

  return (
    <nav
      className={`navbar fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        scrolled ? "bg-[#0d0d0d]/60 backdrop-blur-md" : "bg-[#0d0d0d]"
      }`}
    >
      <div className="max-w-5xl mx-auto flex justify-center gap-12 py-4 px-6 font-semibold text-white select-none">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="relative flex items-center gap-2 cursor-pointer transition-colors duration-300 hover:text-yellow-400"
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            {label}
            <span className="underline-animation"></span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
