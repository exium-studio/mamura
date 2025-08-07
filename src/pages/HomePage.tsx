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
  const HomePromo = lazy(() => import("./sections/HomePromo"));
  const HomePricing = lazy(() => import("./sections/HomePricing"));
  const HomeHowToSubs = lazy(() => import("./sections/HomeHowToSubs"));
  const HomeAbout = lazy(() => import("./sections/HomeAbout"));
  const HomeContact = lazy(() => import("./sections/HomeContact"));

  // States
  const { error, loading, data, makeRequest } = useDataState<any>({
    initialData: DUMMY_CONTENTS,
    url: ``,
  });
  const contents = data?.contents;
  const promo = data?.promo;
  const pricing = data?.pricing;
  const render = {
    loading: <ComponentSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: (
      <>
        <HomeStats contents={contents} />
        <HomePromo promo={promo} />
        <HomePricing contents={contents} pricing={pricing} />
        <HomeHowToSubs contents={contents} />
        <HomeAbout contents={contents} />
        <HomeContact contents={contents} />
      </>
    ),
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
