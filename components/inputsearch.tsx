"use client";
import { useState } from "react";
type CardPorops= {
    name:string;
}

export default function Greeting({
        name
}: CardPorops){
  return (
    <div className="p-8">
      <p className="mt-4 text-xl">
        สวัสดี {name}
      </p>
    </div>
  );
}
