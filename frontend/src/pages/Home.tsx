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
                <div className="glassyContainer flex flex-row justify-center items-center p-5 border min-h-fit h-1/2 mt-20 border-white/10 shadow-xl">
                    <div className="flex flex-col mt-0 items-center justify-center text-center h-full">
                        <h1 className="text-9xl font-bold text-white/80 tracking-wide mt-5">
                            FazCart
                        </h1>

                        <p className="text-white/80 mt-3 text-3xl tracking-wide">
                            Fast. Affordable. Reliable.
                        </p>

                        <Button variant={"secondary"} className="rounded-4xl bg-black/65 hover:bg-black text-white font-bold text-lg tracking-wide p-3 h-15 min-w-fit w-30 my-10 mx-auto">
                            <Link to={"/products"}>Explore</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </Body>
    );
}