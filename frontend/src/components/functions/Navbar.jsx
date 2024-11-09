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
                    className="pt-1 font-ibm font-bold font-yang text-xl md:text-2xl lg:text-2xl"
                >
                    <Link to="/">Dr. Blunt</Link>
                </motion.div>
            </div>
            <motion.div className="flex justify-end p-2 space-x-3 sm-w-[20%] md:w-[30%] lg:w-[20%] text-base" animate={{ x: 0 }} initial={{ x: 200 }}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link to="/about">
                        <Button className="text-gray-900 bg-white px-8 py-4 font-ibm hover:bg-white" required>
                            About
                        </Button>
                    </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link to="/login">
                        <Button className="text-gray-900 bg-white px-8 py-4 font-ibm hover:bg-white" required>
                            Login
                        </Button>
                    </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link to="/signup">
                        <Button className="text-gray-900 bg-white px-8 py-4 font-ibm hover:bg-white" required>
                            Signup
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>


            {/* <div
                className="flex justify-end p-2 space-x-3 bg-[#101111] border-2 rounded-md border-x-0 border-neutral-500 sm-w-[20%] md:w-[30%] lg:w-[20%]"
            >
                <Link to="/about">
                    <Button className="text-neutral-300 font-itim px-4 py-2 text-lg">
                        About
                    </Button>
                </Link>

                <Link to="/about">
                    <Button className="text-neutral-300 font-itim px-4 py-2 text-lg">
                        
                    </Button>
                </Link>

                <Link to="/about">
                    <Button className="text-neutral-300 font-itim px-4 py-2 text-lg">
                        About
                    </Button>
                </Link>
            </div> */}
        </nav>
    );
}

export default Navbar;
