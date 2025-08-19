import CContainer from "@/components/ui-custom/CContainer";
import { R_SPACING } from "@/constants/sizes";
import { StackProps } from "@chakra-ui/react";

interface Props extends StackProps {
  fRef?: any;
}

const Container = (props: Props) => {
  // Props
  const { children, fRef, ...restProps } = props;

  return (
    <CContainer
      fRef={fRef}
      px={R_SPACING}
      maxW={"1440px"}
      mx={"auto"}
      {...restProps}
    >
      {children}
    </CContainer>
  );
};

export default Container;
