import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

function Landing() {
    return (
        <div className="bg-gradient-to-r from-[#44646b] via-[#44646b] to-[#78b2c1] h-dvh flex justify-start">
            <div className="relative bg-cover bg-center full flex w-[70%] justify-center items-center bg-image">
                <div className="absolute text-white top-4 left-6 font-extrabold text-xl font-caveat ">
                    Dr. Blunt
                </div>
                <motion.div
                    className="text-center text-white space-y-10 font-bold font-ibm"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <h1 class="text-3xl font-bold">Your Health, Our Insight – Get Symptom-Based Diagnosis Instantly</h1>
                    {/* <p class="text-lg">Description or other content goes here.</p> */}
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Link to="/login">
                            <Button className="uppercase rounded-xl text-sm md:text-base lg:text-lg w-[30%] border-white border-2 p-6">
                                Get Started
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
            <div className="flex gap-4 items-center p-10 w-[30%] font-ibm bg-cover bg-hero shadow-3xl">
                <motion.div whileHover={{ scale: 1.1 }} className="w-full" whileTap={{ scale: 0.9 }}>
                    <Button className="w-full py-6 uppercase">
                        <Link to="/login">
                            Login
                        </Link>
                    </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} className="w-full" whileTap={{ scale: 0.9 }}>
                    <Button className="w-full py-6 uppercase">
                        <Link to="/signup">
                            Signup
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}

export default Landing;