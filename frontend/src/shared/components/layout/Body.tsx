import type { JSX, ReactNode } from "react";
import { useTheme } from "@/app/theme/useTheme";
import { themeClasses } from "@/app/theme/ThemeContext";

interface BodyProps {
  children: ReactNode;
  className?: string
}

export default function Body({ children, className = "mx-auto max-w-7xl w-full px-4" }: BodyProps,): JSX.Element {

  const {theme} = useTheme();

  return (
    <main className={`flex-1 w-full overflow-x-hidden ${themeClasses[theme]} `}>
      <div className = {className}>
        {children}
      </div>
    </main>
  );
}

