import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Mukilan Rajaram - Full Stack Developer",
  description:
    "Full Stack Developer specializing in MERN stack development. Experienced in building modern web applications with React, Next.js, Node.js, and MongoDB.",
  keywords:
    "Mukilan Rajaram, Full Stack Developer, MERN Stack, React, Next.js, Node.js, MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
