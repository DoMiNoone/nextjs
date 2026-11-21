import Image from "next/image";
import Link from "next/link";
import Greeting from "@/components/inputsearch";
import Card from "@/components/card";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-50 p-6 font-sans dark:bg-black">
      <main className="grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card title="สวัสดี" body="การ์ดใบแรก" />
        <Card title="สวัสดี" body="การ์ดใบแรก" />
        <Card title="สวัสดี" body="การ์ดใบแรก" />
      </main>
    </div>
  );
}