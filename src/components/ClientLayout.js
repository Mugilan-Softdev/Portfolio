"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col">
        {!isAdminPage && <Navbar />}
        <main className={`flex-grow ${!isAdminPage ? "" : ""}`}>
          {children}
        </main>
        {!isAdminPage && <Footer />}
      </div>
    </SessionProvider>
  );
}
