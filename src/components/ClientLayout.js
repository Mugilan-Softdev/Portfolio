"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </SessionProvider>
  );
}
