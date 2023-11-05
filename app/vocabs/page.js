
import AuthForm from './auth-form'

export default function Home() {
    return (
        <div className="row">
            <div className="col-6">
                <h1 className="header">Supabase Auth + Storage</h1>
                <p className="">
                    Experience our Auth and Storage through a simple profile management example. Create a user
                    profile and upload an avatar image. Fast, simple, secure.
                </p>
            </div>
            <div className="col-6 auth-widget">
                <AuthForm />
            </div>
        </div>
    )
}

// import Home from "./components/Home";
// import Login from "./components/Login";

// import { supabase } from "./../../utils/supabaseClient"

// const App = async () => {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//             queryParams: {
//                 access_type: 'offline',
//                 prompt: 'consent',
//             },
//         },
//     })
//     console.log(data);

//     return (
//         <div
//             style={{ minWidth: "100vw", minHeight: "100vh", backgroundColor: "#F5F5F5", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
//         >
//             <Login />
//             <Home />
//         </div>
//     );
// };

// export default App;
