import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { Metadata } from "next";

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
        <main className="px-4 md:px-6 prose prose-md prose-slate dark:prose-invert mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
