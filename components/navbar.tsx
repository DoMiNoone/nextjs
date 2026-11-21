"use client";

import Link from "next/link";
import BtMaode from "@/components/ttoggle";
import { useLang } from "@/components/lprovider"; // ปรับ path ให้ตรงกับที่เก็บ LanguageProvider

export default function Navbar() {
  const { lang, setLang, t } = useLang();

  const links = [
    { href: "/", label: t.home },
    { href: "/about", label: t.about },
    { href: "/posts", label: t.posts },
    { href: "/count", label: t.count },
    { href: "/hello", label: t.hell },
  ];

  return (
    <nav className="bg-slate-900 text-white">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          {t.hello}
        </Link>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-sky-400">
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setLang(lang === "th" ? "en" : "th")}
            className="rounded-lg border border-slate-600 px-3 py-1 hover:bg-slate-800"
          >
            {lang === "th" ? "EN" : "TH"}
          </button>
          <BtMaode />
        </div>
      </div>
    </nav>
  );
}