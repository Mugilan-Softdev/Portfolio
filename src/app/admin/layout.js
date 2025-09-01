"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (status === "loading") return;

        if (status === "unauthenticated") {
          router.replace("/auth/signin");
          return;
        }

        setIsChecking(false);
      } catch (error) {
        console.error("Auth check error:", error);
        router.replace("/auth/error?error=AuthCheck");
      }
    };

    checkAuth();
  }, [session, status, router]);

  // Show loading state while checking auth or session is loading
  if (isChecking || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }


    return (
      <div className="min-h-screen bg-gray-900 flex">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    );
  


}
