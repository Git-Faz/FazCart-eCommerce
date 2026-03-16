import type { JSX } from "react";
import { cn } from "@/shared/utils/utils";
import { motion } from "framer-motion";
import { useTheme } from "@/app/theme/useTheme";
import darkBg from "@/assets/emptyDark.svg";
import lightBg from "@/assets/emptyLight.svg";

interface EmptyStateProps {
  message: string, desClassName?: string
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

export default function Empty({message, desClassName}: EmptyStateProps): JSX.Element {

    const {theme} = useTheme();

    const text = "EMPTY".split("");

    const bg = theme === "dark" ? darkBg : lightBg;

  return (
    <div
      className="m-auto flex h-full w-full shrink flex-col bg-contain bg-no-repeat"
    >
      <motion.h1
        variants={container}
        initial="initial"
        animate="animate"
        className="errorTitle mx-auto w-full font-[shock] text-[58px] sm:text-[70px] md:text-[100px] lg:text-[150px] text-center dark:text-blue-500/50 text-amber-300"
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
      <p className={cn("text-center font-bold text-2xl sm:text-2xl md:text-[30px] lg:text-[50px] dark:text-blue-500/50 text-amber-300", desClassName)}>{message}</p>
    </div>
  )
}