import CContainer from "@/components/ui-custom/CContainer";
import Heading2 from "@/components/ui-custom/Heading2";
import Img from "@/components/ui-custom/Img";
import P from "@/components/ui-custom/P";
import Container from "@/components/widget/Container";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import { SimpleGrid, Stack } from "@chakra-ui/react";

const StatItem = (props: any) => {
  // Props
  const { valueContentId, labelContentId, value, label, ...restProps } = props;

  return (
    <CContainer align={"center"} {...restProps}>
      <EditableContentContainer contentId={valueContentId} content={value}>
        <P
          fontSize={"2xl"}
          fontWeight={"bold"}
          color={"s.500"}
          textAlign={"center"}
        >{`${value}`}</P>
      </EditableContentContainer>

      <EditableContentContainer contentId={labelContentId} content={label}>
        <P textAlign={"center"}>{`${label}`}</P>
      </EditableContentContainer>
    </CContainer>
  );
};

const HomeStats = (props: any) => {
  const { contents } = props;

  return (
    <CContainer bg={"white"} zIndex={2}>
      <Container pb={["32px", null, "80px"]}>
        <Stack flexDir={["column", null, "row"]} gap={4} align={"center"}>
          <CContainer gap={4}>
            <EditableContentContainer
              contentId={6}
              content={contents?.[6]}
              mx={["auto", null, 0]}
            >
              <Heading2
                fontWeight={"bold"}
                fontSize={"3xl"}
                textAlign={["center", null, "left"]}
              >
                {contents?.[6]}
              </Heading2>
            </EditableContentContainer>

            <SimpleGrid
              columns={[1, null, 3]}
              borderRadius={16}
              bg={"d1"}
              p={4}
              gap={4}
            >
              <StatItem
                valueContentId={7}
                labelContentId={8}
                value={contents?.[7]}
                label={contents?.[8]}
              />

              <StatItem
                valueContentId={9}
                labelContentId={10}
                value={contents?.[9]}
                label={contents?.[10]}
              />

              <StatItem
                valueContentId={11}
                labelContentId={12}
                value={contents?.[11]}
                label={contents?.[12]}
              />
            </SimpleGrid>
          </CContainer>

          <CContainer w={"fit"} align={"center"} p={4} mx={"auto"}>
            <EditableContentContainer
              contentId={13}
              content={contents?.[13]}
              fileInput
            >
              <Img
                key={contents?.[13]}
                src={contents?.[13]}
                alt={contents?.[13]}
                w={"320px"}
              />
            </EditableContentContainer>
          </CContainer>
        </Stack>
      </Container>
    </CContainer>
  );
};

export default HomeStats;
