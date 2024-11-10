import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { UserCircle, LogOut, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "../components/ui/dialog";

export default function Dashboard() {
    const [inpData, setInpData] = useState({
        input: "",
    });
    const [responseMessage, setResponseMessage] = useState("");
    const [diseases, setDiseases] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isClosed, setIsClosed] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility

    const Navigate = useNavigate();

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiUrl = "http://127.0.0.1:8000/api/ml/predict/";

        try {
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ problem_text: inpData.input }),
            });

            const data = await res.json();

            if (res.status === 400) {
                setResponseMessage("It looks like you missed some details. Please describe how you're feeling.");
            } else if (res.status === 200) {
                const topDiseasesData = data.top_diseases;
                const diseasesInfo = topDiseasesData.map((disease) => ({
                    name: capitalizeFirstLetter(disease.disease),
                    confidence: (disease.probability * 100).toFixed(2), // Convert to percentage
                }));
                setDiseases(diseasesInfo);
                setIsClosed(false);
            } else {
                setResponseMessage("We encountered an unexpected issue. Please try again later.");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            setResponseMessage("Something went wrong while processing your input.");
        }

        setInpData({
            input: "",
        });
    };

    const handleSlide = () => {
        if (currentIndex < diseases.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0); // Loop back to the first disease
        }
    };

    const handleLogout = () => {
        Navigate("/");
    };

    const user = {
        username: "DrBlunt12",
        email: "drblunt12@example.com",
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Elegant pattern overlay */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M30 0L30 60M0 30L60 30M0 0L60 60M60 0L0 60'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '30px 30px',
                }}
            ></div>

            {/* Shimmering effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-shimmer"></div>

            {/* Header with the website name */}
            <motion.div className="absolute top-4 left-5 text-3xl text-white font-bold font-caveat" initial={{ opacity: 0.2 }} animate={{ opacity: 1 }} transition={{ duration: 3 }}>
                Dr. Blunt
            </motion.div>

            {/* Logout and Profile buttons */}
            <div className="absolute top-4 right-4 flex items-center space-x-4">
                {/* Profile Button with Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="ghost" size="icon" className="text-gray-300  transition-colors duration-200">
                                <UserCircle className="h-6 w-6" />
                                <span className="sr-only">Profile</span>
                            </Button>
                        </motion.div>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>User Profile</DialogTitle>
                            <DialogDescription>
                                Here are the details of your account.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                        </div>
                        <DialogClose>
                            <Button className="mt-4">Close</Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>

                {/* Logout Button */}
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-300  transition-colors duration-200"
                        onClick={handleLogout} // Handle logout
                    >
                        <LogOut className="h-10 w-10 size-10 hover:bg-black" />
                        <span className="sr-only">Logout</span>
                    </Button>
                </motion.div>
            </div>

            {/* Animated Card showcasing a cool feature */}
            <motion.div
                className="w-full max-w-sm bg-white/90 p-6 rounded-lg shadow-xl text-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome to Dr. Blunt</h2>
                <p className="text-gray-600">Get personalized health recommendations based on your symptoms.</p>
            </motion.div>

            {/* Main Card */}
            <Card className="w-full max-w-md shadow-2xl bg-white/80 backdrop-blur-md">
                <CardHeader className="pb-2">
                    <CardTitle className="text-2xl text-center text-gray-800 font-bold font-caveat">
                        How are you feeling today?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y">
                        <div className="relative">
                            <form onSubmit={handleSubmit}>
                                <Input
                                    placeholder="Describe your symptoms or feelings..."
                                    className="w-full p-4 py-6 my-4 pr-12 text-lg bg-white/90 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-200 ease-in-out rounded-full"
                                    value={inpData.input}
                                    onChange={(e) => setInpData({ ...inpData, input: e.target.value })}
                                />
                                <Button
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 transition duration-200 ease-in-out"
                                    aria-label="Submit"
                                    type="submit"
                                >
                                    <Send className="h-5 w-5" />
                                </Button>
                            </form>
                        </div>

                        {/* Cool display of disease result with sliding and closable box */}
                        {!isClosed && diseases.length > 0 && (
                            <div className="relative mt-4 bg-purple-600 text-white p-4 rounded-lg shadow-xl max-w-md mx-auto transition-all ease-in-out duration-500">
                                <div className="absolute top-2 right-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-white"
                                        onClick={() => setIsClosed(true)}
                                    >
                                        <LogOut className="h-5 w-5" />
                                    </Button>
                                </div>
                                <h3 className="text-lg font-semibold">Predicted Diagnosis:</h3>
                                <p className="text-2xl font-bold">{diseases[currentIndex].name}</p>
                                <p className="text-xl">{diseases[currentIndex].confidence}% Confidence</p>
                                {diseases.length > 1 && (
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            variant="outline"
                                            className="mt-4 mx-auto block text-purple-700"
                                            onClick={handleSlide}
                                        >
                                            Next
                                        </Button>
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {responseMessage && <p className="text-red-500 mt-4">{responseMessage}</p>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
