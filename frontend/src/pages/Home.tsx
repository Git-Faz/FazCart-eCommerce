import Body from "@/shared/components/layout/Body";
import type { JSX } from "react";
import { useTheme } from "@/app/theme/useTheme";
import FloatingLines from "@/components/FloatingLines";
import ShapeGrid from "@/components/ShapeGrid";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";

export default function Home(): JSX.Element {
    const { theme } = useTheme();

    return (
        <Body classname="relative mx-auto min-h-screen min-w-screen w-full max-w-7xl">
            <div className="fixed inset-0 z-0 pointer-events-none">
                {theme === "dark" ? (
                    <FloatingLines
                        enabledWaves={["top", "bottom", "middle"]}
                        lineCount={5}
                        lineDistance={25.5}
                        bendRadius={5}
                        bendStrength={-0.5}
                        interactive={false}
                        parallax={false}
                    />
                ) : (
                    <ShapeGrid
                        speed={0.5}
                        squareSize={85}
                        direction="diagonal"
                        borderColor="#ffedb3"
                        hoverFillColor="transparent"
                        shape="square"
                        hoverTrailAmount={0}
                    />
                )}
            </div>

            <div className="relative z-10 h-screen">
                <div className="glassyContainer flex flex-row justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10 border min-h-fit h-auto sm:h-1/2 mt-10 sm:mt-16 md:mt-20 mx-2 sm:mx-6 md:mx-0">
                    <div className="flex flex-col mt-0 items-center justify-center text-center h-full w-full px-2 sm:px-4">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-gray-800 dark:text-white/80 tracking-wide mt-3 sm:mt-5">
                            FazCart
                        </h1>

                        <p className="text-gray-700 dark:text-white/80 mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide px-4">
                            Fast. Affordable. Reliable.
                        </p>

                        <Button variant={"secondary"} className="rounded-4xl bg-amber-400/70 hover:bg-amber-400 dark:bg-black/65 dark:hover:bg-black text-white font-bold text-base sm:text-lg tracking-wide p-3 h-12 sm:h-15 min-w-fit w-28 sm:w-30 my-6 sm:my-8 md:my-10 mx-auto">
                            <Link to={"/products"}>Explore</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </Body>
    );
}