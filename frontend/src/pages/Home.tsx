import Body from "@/shared/components/layout/Body";
import type { JSX } from "react";
import { useTheme } from "@/app/theme/useTheme";
import useIsDesktop from "@/app/hooks";
import FloatingLines from "@/components/FloatingLines";
import ShapeGrid from "@/components/ShapeGrid";
import { Button } from "@/shared/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { type CategoryCardProps } from "@/shared/types";
import { cn } from "@/shared/utils/utils";
import electronics from "@/assets/images/electronicCat.avif";
import food from "@/assets/images/food.png";
import clothing from "@/assets/images/clothing.png";
import software from "@/assets/images/software.png";
import ProductsList from "@/features/products/components/ProductsList";

export default function Home(): JSX.Element {
  const { theme } = useTheme();
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();

  const featuredSize: number = isDesktop ? 5 : 6;
  const p: string = "/products?category=";
  const categories = [
    { title: "Electronics", link: `${p}electronics`, image: electronics },
    { title: "Food", link: `${p}food`, image: food },
    { title: "Clothing", link: `${p}clothing`, image: clothing },
    { title: "Software", link: `${p}software`, image: software },
  ];

  return (
    <Body className="relative min-h-screen w-full px-3 sm:px-4 md:px-6 lg:px-8 py-5 lg:py-5">
      {/* Background */}
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

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero */}
        <section className="mt-5 lg:mt-0">
          <div className="glassyContainer w-full p-4 sm:p-6 md:p-8 lg:p-10 min-h-[50vh] flex items-center justify-center">
            <div className="flex flex-col items-center text-center w-full">
              <h1
                className="font-[retrofloral] font-bold tracking-wide
                text-gray-800 dark:text-white/80
                text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
              >
                FazCart
              </h1>

              <p
                className="font-[retrofloral] tracking-wide mt-3 px-2 sm:px-4
                text-gray-700 dark:text-white/80
                text-lg sm:text-xl md:text-2xl lg:text-3xl"
              >
                Fast. Affordable. Reliable.
              </p>

              <Button
                variant="secondary"
                className="mt-8 h-12 sm:h-14 w-28 sm:w-32 rounded-4xl
                  bg-amber-400/70 hover:bg-amber-400
                  dark:bg-black/70 dark:hover:bg-black
                  text-white font-bold tracking-wide"
              >
                <Link
                  to="/products"
                  className="text-md lg:text-lg md:text-lg sm:text-md"
                >
                  Explore
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* categories UI */}
        <section className="mt-10 lg:mt-10">
          <div className="glassyContainer w-full p-2 h-fit lg:p-3 md:p-3 backdrop-blur-lg!">
            <h2
              className="font-[retrofloral] text-center mb-0
              text-lg sm:text-xl md:text-2xl lg:text-3xl"
            >
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 my-5 md:grid-cols-4 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.title}
                title={cat.title}
                image={{ link: cat.image, alt: cat.title }}
                onClick={() => navigate(cat.link)}
                className="glassyContainer backdrop-blur-lg!"
              />
            ))}
          </div>
        </section>
        {/*Featured section */}
        <section className="mt-10 lg:mt-10">
          <div className="glassyContainer w-full mb-3 p-2 h-fit lg:p-3 md:p-3 backdrop-blur-lg!">
            <h2
              className="font-[retrofloral] text-center mb-0
              text-lg sm:text-xl md:text-2xl lg:text-3xl"
            >
              Featured Products
            </h2>
          </div>
          <ProductsList
            category="featured"
            size={featuredSize}
            hidePagination
            className="glassyContainer py-6 backdrop-blur-md!"
          />
        </section>
      </div>
    </Body>
  );
}

function CategoryCard({
  image,
  title,
  onClick,
  className,
}: CategoryCardProps): JSX.Element {
  return (
    <div className={cn("flex flex-col px-3 py-2", className)} onClick={onClick}>
      <img
        src={image.link}
        alt={image.alt}
        loading="lazy"
        className="w-full object-contain h-28 sm:h-34 lg:h-48 m-0 rounded-xl border-transparent"
      />
      <h4 className="font-[retrofloral] text-lg lg:text-2xl md:text-xl text-center">
        {title}
      </h4>
    </div>
  );
}
