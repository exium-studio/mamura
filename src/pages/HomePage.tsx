import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import { lazy, Suspense } from "react";
import HomeHero from "./sections/HomeHero";

const HomePage = () => {
  const HomeStats = lazy(() => import("./sections/HomeStats"));

  // States
  // const { error, loading, data, makeRequest } = useDataState<any>({
  //   url: ``,
  // });

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
