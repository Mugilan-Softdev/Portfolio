"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const AdminSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      name: "Skills",
      href: "/admin/skills",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
  ];

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-6">
      <div className="flex items-center gap-4 mb-8">
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div>
          <h3 className="font-medium">{session?.user?.name}</h3>
          <p className="text-sm text-gray-400">Admin</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => {
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={item.icon}
                />
              </svg>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors w-full"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
