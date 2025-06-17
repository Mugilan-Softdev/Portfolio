"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const errors = {
  AccessDenied: {
    title: "Access Denied",
    message:
      "You don't have permission to access this resource. Please sign in with an authorized account.",
  },
  Configuration: {
    title: "Configuration Error",
    message:
      "There is a problem with the server configuration. Please contact support.",
  },
  Database: {
    title: "Database Error",
    message:
      "There was an error while accessing the database. Please try again later.",
  },
  DatabaseConnection: {
    title: "Database Connection Error",
    message:
      "Could not connect to the database. Please check your internet connection and try again.",
  },
  Default: {
    title: "Authentication Error",
    message: "An error occurred during authentication. Please try again.",
  },
};

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorDetails = errors[error] || errors.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-red-500">
            {errorDetails.title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            {errorDetails.message}
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <Link
            href="/auth/signin"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
