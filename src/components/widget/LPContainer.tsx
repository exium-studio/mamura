import CContainer from "@/components/ui-custom/CContainer";
import TopNav from "./TopNav";

const LPContainer = (props: any) => {
  // Props
  const { children, activePath } = props;

  return (
    <CContainer>
      <TopNav activePath={activePath} />

      {children}
    </CContainer>
  );
};

export default LPContainer;
