import CContainer from "@/components/ui-custom/CContainer";
import HomeHero from "./sections/HomeHero";
import { lazy, Suspense } from "react";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";

const HomePage = () => {
  const HomeStats = lazy(() => import("./sections/HomeStats"));

  return (
    <CContainer overflowX={"clip"}>
      <HomeHero />

      <Suspense fallback={<ComponentSpinner />}>
        <HomeStats />
      </Suspense>
    </CContainer>
  );
};

export default HomePage;
