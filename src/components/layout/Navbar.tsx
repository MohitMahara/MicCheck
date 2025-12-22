"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <nav className={` mx-auto md:px-[165px] fixed top-0 left-0 z-50 w-full transition-all duration-300
        ${scrolled
          ? "bg-gray-900/70 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
        }
      `}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-6">
        <Link href="/" className="text-2xl font-bold text-white">
          🎙 MicTest
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/" className="hidden md:block text-md text-[#9E9E9E] hover:text-white transition-colors">
            Home
          </Link>
          
          <Button>Get Started</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;