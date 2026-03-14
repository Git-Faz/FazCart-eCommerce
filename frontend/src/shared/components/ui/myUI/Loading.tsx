import { motion, type Variants } from "framer-motion";
import type { JSX } from "react";

function Loading({message = "Loading..."}):JSX.Element {
    const dotVariants: Variants = {
        jump: {
            y: -30,
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            },
        },
    }

    return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] h-full w-full gap-4">
        <motion.div
            animate="jump"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="flex justify-center items-center gap-2"
        >
            <motion.div className="w-5 h-5 rounded-full dark:bg-purple-500 bg-blue-500" variants={dotVariants} />
            <motion.div className="w-5 h-5 rounded-full dark:bg-purple-500 bg-blue-500" variants={dotVariants} />
            <motion.div className="w-5 h-5 rounded-full dark:bg-purple-500 bg-blue-500" variants={dotVariants} />
        </motion.div>
        <p className="text-xl text-black dark:text-purple-300">{message}</p>
        </div>
    )
}

export default Loading
