"use client"
// src/Home.jsx
import { useEffect, useState } from "react";

import { supabase } from "../../../utils/supabaseClient";
const Home = () => {
    const [records, setRecords] = useState([]);
    const [newRanking, setNewRanking] = useState("");
    const [newScore, setNewScore] = useState("");

    useEffect(() => { }, []);

    // 成績を登録する
    const addRecord = (e) => {
        e.preventDefault();
    };

    // 成績を取得する
    const getRecords = () => { };

    // ログアウトする
    const signOut = () => { supabase.auth.signOut(); };

    return (
        <div
            style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
            <div>
                <h1>成績</h1>
            </div>
            <div style={{ marginBottom: "16px" }}>
                <button onClick={signOut}>ログアウト</button>
            </div>
            <div
                style={{
                    width: "60%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div style={{ width: "100%" }}>
                    <form onSubmit={addRecord}>
                        <div
                            style={{
                                marginBottom: "8px",
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div style={{ flexBasis: "100px", textAlign: "center" }}>
                                <button type="submit">登録</button>
                            </div>
                            <div style={{ flexBasis: "60px", textAlign: "center" }}>
                                <input
                                    style={{ width: "30px" }}
                                    type="text"
                                    value={newRanking}
                                    onChange={(e) => setNewRanking(e.target.value)}
                                />
                            </div>
                            <div style={{ flexBasis: "100px", textAlign: "center" }}>
                                <input
                                    style={{ width: "70px" }}
                                    type="text"
                                    value={newScore}
                                    onChange={(e) => setNewScore(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                {records.map((record, idx) => (
                    <div
                        key={idx}
                        style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                    >
                        <div style={{ flexBasis: "100px", textAlign: "center" }}>
                            <span>{record.created_at.substr(0, 10)}</span>
                        </div>
                        <div style={{ flexBasis: "60px", textAlign: "center" }}>
                            <span>{`${record.ranking}位`}</span>
                        </div>
                        <div style={{ flexBasis: "100px", textAlign: "center" }}>
                            <span>{`${record.score}点`}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
