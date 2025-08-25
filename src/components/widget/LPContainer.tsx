import CContainer from "@/components/ui-custom/CContainer";
import useContents from "@/context/useContents";
import useDataState from "@/hooks/useDataState";
import Footer from "@/pages/sections/Footer";
import empty from "@/utils/empty";
import { useEffect } from "react";
import ComponentSpinner from "../ui-custom/ComponentSpinner";
import FeedbackNoData from "../ui-custom/FeedbackNoData";
import FeedbackRetry from "../ui-custom/FeedbackRetry";
import TopNav from "./TopNav";

const LPContainer = (props: any) => {
  // Props
  const { children, activePath } = props;

  // Contexts
  const setData = useContents((s) => s.setData);

  // States
  const { error, initialLoading, data, makeRequest } = useDataState<any>({
    url: `/api/mamura/public-request/get-all-content`,
    dataResource: false,
  });
  const render = {
    loading: <ComponentSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: (
      <>
        <TopNav activePath={activePath} />

        {children}

        <Footer contents={data?.contents} />
      </>
    ),
  };

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <CContainer minH={"100dvh"}>
      {initialLoading && render.loading}

      {!initialLoading && (
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
    </CContainer>
  );
};

export default LPContainer;
