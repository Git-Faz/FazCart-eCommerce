import type { JSX } from "react";
import { cn } from "@/shared/utils/utils";
import { motion } from "framer-motion";


interface ErrorStateProps {
  errorTitle?: string,errorMsg: string, desClassName?: string
}

const container = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const letter = {
  initial: { y: 0 },
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 1
    }
  }
};

export default function Error({ errorTitle = "ERROR" ,errorMsg, desClassName }: ErrorStateProps): JSX.Element {

  const text = errorTitle.split("");

  return (
    <div className="w-full h-full m-auto">
      <motion.h1
        variants={container}
        initial="initial"
        animate="animate"
        className="mx-auto w-full font-[shock] text-[58px] sm:text-[70px] md:text-[100px] lg:text-[150px] text-center dark:text-blue-500/50 text-amber-300"
      >
        {text.map((char, index) => (
          <motion.span
            key={index}
            variants={letter}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <p className={cn("text-center font-bold text-2xl sm:text-2xl md:text-[30px] lg:text-[50px] dark:text-blue-500/50 text-amber-300", desClassName)}>{errorMsg}</p>
    </div>
  )
}