"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";

import Loading from "./loading/page";
import Component from "./page2/page";
import "./page.css";

const inter = Inter({
  subsets: ["latin"],
});

export default function Home(): React.ReactNode {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isLoading ? <Loading /> : <Component />}
    </main>
  );
}
