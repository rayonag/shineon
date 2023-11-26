"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";

import Loading from "./home/loading/Loading";
import Home from "./home/page";
import "./page.css";

const inter = Inter({
    subsets: ["latin"],
});

export default function App(): React.ReactNode {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Home />
        </main>
    );
}
