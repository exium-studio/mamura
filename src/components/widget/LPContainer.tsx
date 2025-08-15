import CContainer from "@/components/ui-custom/CContainer";
import TopNav from "./TopNav";
import useDataState from "@/hooks/useDataState";
import { DUMMY_CONTENTS } from "@/constants/dummy";
import { useEffect } from "react";
import useContents from "@/context/useContents";
import ComponentSpinner from "../ui-custom/ComponentSpinner";
import FeedbackRetry from "../ui-custom/FeedbackRetry";
import FeedbackNoData from "../ui-custom/FeedbackNoData";
import empty from "@/utils/empty";
import Footer from "@/pages/sections/Footer";

const LPContainer = (props: any) => {
  // Props
  const { children, activePath } = props;

  // Contexts
  const setData = useContents((s) => s.setData);

  // States
  const { error, loading, data, makeRequest } = useDataState<any>({
    initialData: DUMMY_CONTENTS,
    url: ``,
  });
  const render = {
    loading: <ComponentSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: (
      <>
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
      <TopNav activePath={activePath} />

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
    </CContainer>
  );
};

export default LPContainer;
