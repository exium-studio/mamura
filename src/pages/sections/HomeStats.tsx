import CContainer from "@/components/ui-custom/CContainer";
import Heading2 from "@/components/ui-custom/Heading2";
import Img from "@/components/ui-custom/Img";
import P from "@/components/ui-custom/P";
import Container from "@/components/widget/Container";
import { R_SPACING } from "@/constants/sizes";
import { HStack, SimpleGrid } from "@chakra-ui/react";

const StatItem = (props: any) => {
  // Props
  const { value, label, ...restProps } = props;

  return (
    <CContainer align={"center"} {...restProps}>
      <P fontSize={"2xl"} fontWeight={"bold"} color={"s.500"}>{`${value}`}</P>
      <P>{`${label}`}</P>
    </CContainer>
  );
};

const HomeStats = (props: any) => {
  const { contents } = props;

  return (
    <CContainer
      mt={"-50px"}
      borderRadius={"30px 30px 0 0 "}
      bg={"white"}
      zIndex={2}
    >
      <Container py={"80px"}>
        <HStack wrap={"wrap"} gap={R_SPACING}>
          <CContainer flex={"1 1 600px"} gap={4}>
            <Heading2 fontWeight={"bold"}>{contents?.[6]?.content}</Heading2>

            <SimpleGrid
              columns={[1, null, 3]}
              borderRadius={16}
              bg={"bg.subtle"}
              p={4}
              gap={4}
            >
              <StatItem
                value={contents?.[7]?.content}
                label={contents[8]?.content}
              />

              <StatItem
                value={contents?.[9]?.content}
                label={contents[10]?.content}
              />

              <StatItem
                value={contents?.[11]?.content}
                label={contents[12]?.content}
              />
            </SimpleGrid>
          </CContainer>

          <CContainer w={"fit"} align={"center"} p={4} mx={"auto"}>
            <Img
              key={contents?.[13]?.content}
              w={"320px"}
              src={contents?.[13]?.content}
            />
          </CContainer>
        </HStack>
      </Container>
    </CContainer>
  );
};

export default HomeStats;
