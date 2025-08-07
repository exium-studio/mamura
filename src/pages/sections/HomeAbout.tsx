import CContainer from "@/components/ui-custom/CContainer";
import Heading2 from "@/components/ui-custom/Heading2";
import Img from "@/components/ui-custom/Img";
import P from "@/components/ui-custom/P";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import { R_SPACING } from "@/constants/sizes";
import { Container, HStack, Icon } from "@chakra-ui/react";
import { IconSparkles } from "@tabler/icons-react";

const VisionItem = (props: any) => {
  // Props
  const { contentId, content } = props;

  return (
    <HStack>
      <Icon color={"p.500"}>
        <IconSparkles />
      </Icon>

      <EditableContentContainer contentId={contentId} content={content}>
        <P>{content}</P>
      </EditableContentContainer>
    </HStack>
  );
};

const HomeAbout = (props: any) => {
  // Props
  const { contents } = props;

  return (
    <CContainer py={"80px"}>
      <Container>
        <HStack gap={R_SPACING}>
          <CContainer w={["full", null, "40%"]}>
            <Img key={contents?.[24]} src={contents?.[24]} />
          </CContainer>

          <CContainer gap={4} w={["full", null, "60%"]}>
            <EditableContentContainer contentId={25} content={contents?.[25]}>
              <Heading2 fontSize={"3xl"} fontWeight={"bold"}>
                {contents?.[25]}
              </Heading2>
            </EditableContentContainer>

            <EditableContentContainer contentId={26} content={contents?.[26]}>
              <P>{contents?.[26]}</P>
            </EditableContentContainer>

            <CContainer gap={2}>
              <VisionItem contentId={27} content={contents?.[27]} />

              <VisionItem contentId={28} content={contents?.[28]} />

              <VisionItem contentId={29} content={contents?.[29]} />
            </CContainer>

            <EditableContentContainer contentId={30} content={contents?.[30]}>
              <P>{contents?.[30]}</P>
            </EditableContentContainer>
          </CContainer>
        </HStack>
      </Container>
    </CContainer>
  );
};

export default HomeAbout;
