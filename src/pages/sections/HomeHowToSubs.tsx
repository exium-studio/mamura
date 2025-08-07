import CContainer from "@/components/ui-custom/CContainer";
import Heading2 from "@/components/ui-custom/Heading2";
import P from "@/components/ui-custom/P";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import { Container, SimpleGrid } from "@chakra-ui/react";

const HowToSubsItem = (props: any) => {
  // Props
  const { titleId, descriptionId, title, description } = props;

  return (
    <CContainer bg={"p.600"} borderRadius={16} p={4} gap={2} align={"center"}>
      <EditableContentContainer contentId={titleId} content={title}>
        <P fontWeight={"bold"} textAlign={"center"} fontSize={"lg"}>
          {title}
        </P>
      </EditableContentContainer>

      <EditableContentContainer contentId={descriptionId} content={description}>
        <P textAlign={"center"}>{description}</P>
      </EditableContentContainer>
    </CContainer>
  );
};
const HomeHowToSubs = (props: any) => {
  // Props
  const { contents } = props;

  return (
    <CContainer py={"80px"}>
      <Container>
        <CContainer
          borderRadius={"0 30px 0 30px"}
          bg={"p.500"}
          p={10}
          color={"white"}
          gap={8}
        >
          <CContainer gap={2} align={"center"}>
            <EditableContentContainer contentId={16} content={contents?.[16]}>
              <Heading2
                fontSize={"3xl"}
                fontWeight={"bold"}
                textAlign={"center"}
              >
                {contents?.[16]}
              </Heading2>
            </EditableContentContainer>

            <EditableContentContainer contentId={17} content={contents?.[17]}>
              <P textAlign={"center"}>{contents?.[17]}</P>
            </EditableContentContainer>
          </CContainer>

          <CContainer>
            <SimpleGrid columns={[1, null, 3]} gap={4}>
              <HowToSubsItem
                titleId={18}
                descriptionId={19}
                title={contents?.[18]}
                description={contents?.[19]}
              />

              <HowToSubsItem
                titleId={20}
                descriptionId={21}
                title={contents?.[20]}
                description={contents?.[21]}
              />

              <HowToSubsItem
                titleId={22}
                descriptionId={23}
                title={contents?.[22]}
                description={contents?.[23]}
              />
            </SimpleGrid>
          </CContainer>
        </CContainer>
      </Container>
    </CContainer>
  );
};

export default HomeHowToSubs;
