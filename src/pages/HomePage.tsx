import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import { lazy, Suspense } from "react";
import HomeHero from "./sections/HomeHero";
import useDataState from "@/hooks/useDataState";
import { DUMMY_CONTENTS } from "@/constants/dummy";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import FeedbackNoData from "@/components/ui-custom/FeedbackNoData";
import empty from "@/utils/empty";

const HomePage = () => {
  const HomeStats = lazy(() => import("./sections/HomeStats"));

  // States
  const { error, loading, data, makeRequest } = useDataState<any>({
    initialData: DUMMY_CONTENTS,
    url: ``,
  });
  const contents = data;
  const render = {
    loading: <ComponentSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: <HomeStats contents={contents} />,
  };

  return (
    <CContainer overflowX={"clip"} minH={"100vh"}>
      <HomeHero />

      <Suspense fallback={<ComponentSpinner flex={1} />}>
        {loading && render.loading}
        {!loading && (
          <>
            {error && render.error}
            {!error && (
              <>
                {data && render.loaded}
                {(!data || empty(data)) && render.empty}
              </>
            )}
          </>
        )}
      </Suspense>
    </CContainer>
  );
};

export default HomePage;
