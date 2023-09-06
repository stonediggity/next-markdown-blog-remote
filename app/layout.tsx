import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import ProfilePic from "./components/ProfilePic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sir Ribbington's Blog",
  description: "Created by a slippery frog in a tophat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en">
      <body className={`${inter.className} dark:text-white dark:bg-slate-800`}>
        <Navbar />
        <ProfilePic />
        {children}
      </body>
    </html>
  );
}
