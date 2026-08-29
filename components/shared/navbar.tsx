import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <nav className="w-full max-w-300 mx-auto flex items-center justify-between my-4">
      <Link href="/" className="text-3xl font-bold">
        Movi
        <span className="text-blue-500">go</span>
      </Link>

      <ModeToggle />
    </nav>
  );
}
