import CContainer from "@/components/ui-custom/CContainer";
import HomeHero from "./sections/HomeHero";
import { lazy, Suspense } from "react";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";

const HomePage = () => {
  const HomeStats = lazy(() => import("./sections/HomeStats"));

  return (
    <CContainer overflowX={"clip"} minH={"100vh"}>
      <HomeHero />

      <Suspense fallback={<ComponentSpinner flex={1} />}>
        <HomeStats />
      </Suspense>
    </CContainer>
  );
};

export default HomePage;
