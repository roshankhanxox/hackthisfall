import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="sticky flex justify-between items-center w-full">
            <div className="text-white flex">
                <motion.div
                    animate={{ x: 0 }}
                    initial={{ x: 100 }}
                    transition={{ duration: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    className="pt-1 font-ibm font-bold font-yang text-xl md:text-2xl lg:text-4xl"
                >
                    <Link to="/">Dr. Blunt</Link>
                </motion.div>
            </div>
            <div
                className="flex justify-end p-2 space-x-3 bg-[#101111] border-2 rounded-md border-x-0 border-neutral-500 sm-w-[20%] md:w-[30%] lg:w-[20%]"
            >
                <motion.div
                    animate={{ x: 0 }}
                    initial={{ x: -100 }}
                    transition={{ duration: 1.5 }}
                    whileHover={{ scale: 1.1 }}
                >
                    <Link to="/about">
                        <Button className="text-neutral-300 font-itim px-4 py-2 text-lg">
                            About
                        </Button>
                    </Link>
                </motion.div>
                <motion.div
                    animate={{ x: 0 }}
                    initial={{ x: -100 }}
                    transition={{ duration: 1.5 }}
                    whileHover={{ scale: 1.1 }}
                >
                    <Link to="/about">
                        <Button className="text-neutral-300 font-itim px-4 py-2 text-lg">
                            About
                        </Button>
                    </Link>
                </motion.div>
                <motion.div
                    animate={{ x: 0 }}
                    initial={{ x: -100 }}
                    transition={{ duration: 1.5 }}
                    whileHover={{ scale: 1.1 }}
                >
                    <Link to="/about">
                        <Button className="text-neutral-300 font-itim px-4 py-2 text-lg">
                            About
                        </Button>
                    </Link>
                </motion.div>

            </div>
        </nav>
    );
}

export default Navbar;
