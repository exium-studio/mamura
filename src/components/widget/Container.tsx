import CContainer from "@/components/ui-custom/CContainer";
import { R_SPACING } from "@/constants/sizes";
import { StackProps } from "@chakra-ui/react";

interface Props extends StackProps {}

const Container = (props: Props) => {
  // Props
  const { children, ...restProps } = props;

  return (
    <CContainer px={R_SPACING} maxW={"1440px"} {...restProps}>
      {children}
    </CContainer>
  );
};

export default Container;
