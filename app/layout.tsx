import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { LanguageProvider } from "@/components/lprovider";

export const metadata: Metadata = {
  title: "MyWeb",
  description: "เว็บแรกด้วย Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body className="min-h-screen w-full overflow-x-hidden bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white">
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}