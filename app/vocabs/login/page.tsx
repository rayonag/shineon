"use client";
// vocabs/login.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import GoogleIcon from "./../../../public/Google-logo";

const Login: React.FC = () => {
    const router = useRouter();
    console.log(router);
    let user;
    const checkUser = async () => {
        user = await supabase.auth.getUser();
        console.log(user);
        // if (user) {
        //     // Redirect to home or another authenticated page
        //     // Replace '/dashboard' with your desired route
        //     router.push("/vocabs/dashboard");
        // }
        console.log(supabase.auth.getSession());
    };

    checkUser();
    console.log(user);
    const handleGoogleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: "http://localhost:3000/vocabs" } });
        if (error) {
            console.error("Google login error:", error.message);
        } else {
            debugger;
            //router.push("dashboard");
        }
    };

    const handleGuestLogin = async () => {
        // Implement guest login logic here
        console.log("handleguestlogin");
        //router.push("vacabs/dashboard"); // Redirect to the dashboard for guest users
    };
    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                queryParams: {
                    access_type: "offline",
                    prompt: "consent",
                },
            },
        });
        if (error) {
            console.error("Google login error:", error.message);
        } else {
            console.log(data);
            // Redirect to home or another authenticated page
            // Replace '/dashboard' with your desired route
            // router.push("/dashboard");
            //router.push("/vocabs");
            console.log("handlelogin error");
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-3xl font-bold mb-4">Login</h1>

                <button onClick={handleGoogleLogin} className="bg-blue-600 text-white hover:bg-blue-700 w-52 py-2 px-4 rounded-md flex items-center space-x-2">
                    <GoogleIcon />
                    <span>Sign in with Google</span>
                </button>

                <button onClick={handleGuestLogin} className="mt-4 bg-gray-500 text-white hover:bg-gray-600 w-52 py-2 px-4 rounded-md">
                    Continue as Guest
                </button>
            </div>
        </div>
    );
};

export default Login;
