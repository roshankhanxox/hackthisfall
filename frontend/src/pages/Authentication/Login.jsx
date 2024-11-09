import React from "react";
import Navbar from "../../components/functions/Navbar";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Link, Navigate, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
    });

    const [isLogged, setIsLogged] = React.useState(false);

    function handleLogin(e) {
        e.preventDefault();

        const res = fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        res.then((res) => {
            if (res.status === 400) {
                alert("Please provide all the required fields");
            } else if (res.status === 404) {
                alert("User not found");
            } else if (res.status === 401) {
                alert("Password is incorrect");
            } else if (res.status === 200) {
                alert("User logged in");
                setIsLogged(true);
            } else {
                alert("An error occurred");
            }
        });

        setFormData({
            username: "",
            password: "",
        });

        if (isLogged) {
            console.log("Logged in");
        }
    }


    return (
        <div className="bg-[#161716] px-8 py-6 h-dvh bg-stripes bg-cover">
            <Navbar />
            <div className="text-white size-full flex h-[90%] items-center justify-center">
                <Card className="w-[90%] md:w-[50%] lg:w-[30%] bg-neutral-700 text-white font-ibm">
                    <CardHeader>
                        <h1 className="text-2xl font-semibold text-center uppercase">
                            Log In
                        </h1>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin}>
                            <div className="text-slate-900 space-y-8">
                                <div>
                                    <input
                                        type="username"
                                        id="username"
                                        placeholder="Username..."
                                        className="w-full bg-card text-black p-2 rounded-md"
                                        value={formData.username}
                                        onChange={(e) =>
                                            setFormData({ ...formData, username: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Password..."
                                        className="w-full bg-card text-black p-2 rounded-md"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                    />
                                </div>
                                <p className="font-semibold text-neutral-300">
                                    Already signed up?{" "}
                                    <Link to="/signup" className="underline-offset-4">
                                        Sign up!
                                    </Link>
                                </p>
                                <div>
                                    <button
                                        className="w-full bg-amber-200 text-neutral-800 p-2 rounded-md"
                                        type="submit"
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Signup;
