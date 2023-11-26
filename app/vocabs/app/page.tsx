"use client";
// vocabs.app.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Error from "next/error";

const Home = () => {
    type records = { vocab: string; meaning: string }[];
    const [records, setRecords] = useState<records>([]);
    const [vocab, setVocab] = useState("");
    const [meaning, setMeaning] = useState("");
    useEffect(() => {
        (async () => {
            const user = (async () => await supabase.auth.getUser())();
            const session = (async () => await supabase.auth.getSession())();
            console.log("user");
            console.log(user);
            console.log("session");
            console.log(session);
        })();
    }, []);

    // 成績を取得する
    const getRecords = async () => {
        try {
            const { data, error } = await supabase.from("vocabs").select("*").order("inserted_at", { ascending: false });
            if (error) throw error;

            setRecords(data);
        } catch (error: any) {
            alert(error.message);
            setRecords([]);
        }
    };
    // 成績を登録する
    const addRecord = async (e: any) => {
        e.preventDefault();

        try {
            const { error } = await supabase.from("vocabs").insert([
                {
                    vocab: vocab,
                    meaning: meaning,
                    user_id: (await supabase.auth.getUser()).data.user?.id,
                },
            ]);
            if (error) throw error;

            await getRecords();

            setVocab("");
            setMeaning("");
        } catch (error: any) {
            alert(error.message);
        }
    };

    useEffect(() => {
        (async () => await getRecords())();
    }, []);
    // ログアウトする
    const signOut = () => supabase.auth.signOut();

    //いまだけ
    const handleGoogleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: "http://localhost:3000/vocabs/app" } });
        if (error) {
            console.error("Google login error:", error.message);
        } else {
            debugger;
            //router.push("dashboard");
        }
    };
    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div>
                <h1>All Vocabs</h1>
            </div>
            <div style={{ marginBottom: "16px" }}>
                <button onClick={signOut}>Sign out</button>
            </div>
            <div style={{ marginBottom: "16px" }}>
                <button onClick={handleGoogleLogin}>Google lognin</button>
            </div>
            <div className="w-[60%] flex flex-col">
                <div style={{ width: "100%" }}>
                    <form onSubmit={addRecord}>
                        <div className="mb-8 w-full flex flex-row space-x-10 text-center">
                            <div style={{ flexBasis: "100px", textAlign: "center" }}>
                                <button type="submit">登録</button>
                            </div>
                            <div className="basis-96 text-center">
                                <span className="mx-5">Vocab</span>
                                <input className="w-20 bg-gray-600" type="text" value={vocab} onChange={(e) => setVocab(e.target.value)} />
                            </div>
                            <div className="basis-96 text-center">
                                <span className="mx-5">Meaning</span>
                                <input className="w-20 bg-gray-600" type="text" value={meaning} onChange={(e) => setMeaning(e.target.value)} />
                            </div>
                        </div>
                    </form>
                </div>
                <span>Record Here:</span>
                {records.map((record, idx) => (
                    <div key={idx} style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ flexBasis: "100px", textAlign: "center" }}>
                            <span>{record.vocab}</span>
                            <span>{record.meaning}</span>
                        </div>
                        {/* <div style={{ flexBasis: "60px", textAlign: "center" }}>
                            <span>{`${record.ranking}位`}</span>
                        </div>
                        <div style={{ flexBasis: "100px", textAlign: "center" }}>
                            <span>{`${record.score}点`}</span>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
