import CContainer from "@/components/ui-custom/CContainer";
import HomeHero from "./sections/HomeHero";
import { lazy, Suspense } from "react";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import useDataState from "@/hooks/useDataState";

const HomePage = () => {
  const HomeStats = lazy(() => import("./sections/HomeStats"));

  // States
  const { error, loading, data, makeRequest } = useDataState<any>({
    initialData: undefined,
    url: ``,
    dependencies: [],
  });

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
