"use client";

import AuthForm from "./auth-form";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import { Session, UserResponse } from "@supabase/supabase-js";

export default function Vocabs() {
    const router = useRouter();
    router.push("/vocabs/app");

    // ログインは任意で、隠しボタンでもつける
    useEffect(() => {
        const checkUser = async () => {
            // auth.getUser()が取得できないのでgetSessionからUserを取る
            const session = await supabase.auth.getSession();
            if (session.data.session?.user.id) {
            }
        };
        checkUser();
    }, [router]);
    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) return;
            else console.log("no user");
        });
    }, []);
    return (
        <div className="row">
            <h1>Home Page</h1>
            <span>hello</span>
        </div>
    );
}
