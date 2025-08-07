import CContainer from "@/components/ui-custom/CContainer";
import Heading2 from "@/components/ui-custom/Heading2";
import P from "@/components/ui-custom/P";
import Container from "@/components/widget/Container";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import { Box, Center, HStack } from "@chakra-ui/react";
import { useState } from "react";

const HomePricing = (props: any) => {
  const { contents, pricing } = props;

  // States
  const [show, setShow] = useState<"home" | "bussiness">("home");

  return (
    <CContainer id="pricing" py={"80px"}>
      <Container gap={8} align={"center"}>
        <CContainer gap={2} align={"center"}>
          <EditableContentContainer contentId={14} content={contents?.[14]}>
            <Heading2 fontWeight={"bold"} fontSize={"3xl"} textAlign={"center"}>
              {contents?.[14]}
            </Heading2>
          </EditableContentContainer>

          <EditableContentContainer contentId={15} content={contents?.[15]}>
            <P textAlign={"center"} color={"fg.muted"}>{`${contents?.[15]}`}</P>
          </EditableContentContainer>
        </CContainer>

        <CContainer align={"center"}>
          <HStack
            p={1}
            borderRadius={"full"}
            pos={"relative"}
            bg={"p.50"}
            w={"368px"}
            h={"48px"}
          >
            <Box
              w={"180px"}
              h={"40px"}
              bg={"p.500"}
              borderRadius={"full"}
              pos={"absolute"}
              left={show === "home" ? "0" : "180px"}
              transition={"200ms"}
              zIndex={1}
            />

            <Center
              w={"180px"}
              cursor={"pointer"}
              onClick={() => {
                setShow("home");
              }}
              zIndex={2}
            >
              <P
                color={show === "home" ? "white" : "fg.subtle"}
                transition={"200ms"}
              >
                Kebutuhan Rumah
              </P>
            </Center>

            <Center
              w={"180px"}
              cursor={"pointer"}
              onClick={() => {
                setShow("bussiness");
              }}
              zIndex={2}
            >
              <P
                color={show === "bussiness" ? "white" : "fg.subtle"}
                transition={"200ms"}
              >
                Kebutuhan Bisnis
              </P>
            </Center>
          </HStack>
        </CContainer>
      </Container>
    </CContainer>
  );
};

export default HomePricing;
