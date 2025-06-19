"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for initial data fetch
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust this time as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

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
