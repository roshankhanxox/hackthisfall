import React from "react";
import Navbar from "../../components/functions/Navbar";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [formData, setFormData] = React.useState({
        email: "",
        username: "",
        password: "",
    });

    const Navigate = useNavigate();

    async function handleSignup(e) {
        e.preventDefault();

        const apiUrl = "http://127.0.0.1:8000/register/";

        try {
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            console.log(formData);

            if (res.status === 400) {
                alert("Please provide all the required fields");
            } else if (res.status === 409) {
                alert("User already exists");
            } else if (res.status === 500) {
                alert("An error occurred");
            } else if (res.status === 201) {
                alert("User created");
                Navigate("/dashboard");
            } else {
                alert("An error occurred");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred while signing up.");
        }

        // Reset form data
        setFormData({
            email: "",
            username: "",
            password: "",
        });

        console.log("Submitted");
    }

    return (
        <div className="bg-[#161716] px-8 py-6 h-dvh bg-stripes bg-cover">
            <Navbar />
            <div className="text-white size-full flex h-[90%] items-center justify-center">
                <Card className="w-[90%] md:w-[50%] lg:w-[30%] bg-neutral-700 text-white font-ibm">
                    <CardHeader>
                        <h1 className="text-2xl font-semibold text-center uppercase">
                            Sign Up
                        </h1>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignup}>
                            <div className=" text-slate-900 space-y-8">
                                <div>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Email..."
                                        className="w-full bg-card text-black p-2 rounded-md"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                    />
                                </div>
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
                                        className="w-full bg-card text-black p-2 rounded-md"
                                        placeholder="Password..."
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                    />
                                </div>
                                <p className="font-semibold text-neutral-300">
                                    Already signed up?{" "}
                                    <Link to="/login" className="underline-offset-4">
                                        Login here
                                    </Link>
                                </p>
                                <div>
                                    <button
                                        className="w-full bg-amber-200 text-neutral-800 p-2 rounded-md"
                                        type="submit"
                                    >
                                        Sign Up
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
