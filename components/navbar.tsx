"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NavbarProps {
  isLoggedIn?: boolean;
  setIsLoggedIn?: (value: boolean) => void;
}

export default function Navbar({
  isLoggedIn = false,
  setIsLoggedIn
}: NavbarProps) {
  const handleLoginClick = () => {
    if (setIsLoggedIn) {
      setIsLoggedIn(!isLoggedIn);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <p></p>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex gap-1 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
            onClick={handleLoginClick}
          >
            <User className="h-4 w-4" />
            {isLoggedIn ? "Logout" : "Login"}
          </Button>
          <Button
            size="sm"
            className="hidden md:flex bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-500 hover:to-yellow-400"
          >
            Sign Up
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-400 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}
