"use client"
import Head from 'next/head';
// src/Login.jsx
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from "../../../utils/supabaseClient"
import { ThemeSupa } from '@supabase/auth-ui-shared';

const Login = () => {

    

    return (
        <>
            <div className="text-center">
                <Head>
                    <title>Google認証画面</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className="text-center">
                    <div className="grid">
                        <Auth
                            supabaseClient={supabase}
                            appearance={{ theme: ThemeSupa }}
                            providers={['google','email']}
                        />
                    </div>
                </main>
                <footer className="text-center">
                </footer>
            </div>
        </>
    );
};

export default Login;
