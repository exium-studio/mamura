import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import Heading2 from "@/components/ui-custom/Heading2";
import Img from "@/components/ui-custom/Img";
import NavLink from "@/components/ui-custom/NavLink";
import P from "@/components/ui-custom/P";
import Container from "@/components/widget/Container";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import { IMAGES_PATH } from "@/constants/paths";
import { R_SPACING } from "@/constants/sizes";
import { HStack, Icon, SimpleGrid } from "@chakra-ui/react";
import { IconBrandWhatsappFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const HomeContact = (props: any) => {
  // Props
  const { contents } = props;

  return (
    <CContainer py={["32px", null, "80px"]}>
      <Container>
        <SimpleGrid
          columns={[1, null, 2]}
          gap={R_SPACING}
          p={[4, null, 10]}
          bg={"p.500"}
          borderRadius={30}
          color={"white"}
          bgImage={`url(${IMAGES_PATH}/id_map.png)`}
          bgPos={"center"}
          bgSize={"cover"}
        >
          <CContainer gap={4} py={8}>
            <EditableContentContainer contentId={31} content={contents?.[31]}>
              <Heading2 fontSize={"2xl"} fontWeight={"bold"}>
                {contents?.[31]}
              </Heading2>
            </EditableContentContainer>

            <EditableContentContainer contentId={32} content={contents?.[32]}>
              <P>{contents?.[32]}</P>
            </EditableContentContainer>

            <CContainer gap={2}>
              <EditableContentContainer contentId={33} content={contents?.[33]}>
                <P>{contents?.[33]}</P>
              </EditableContentContainer>

              <EditableContentContainer contentId={34} content={contents?.[34]}>
                <P>{contents?.[34]}</P>
              </EditableContentContainer>

              <EditableContentContainer contentId={35} content={contents?.[35]}>
                <P>{contents?.[35]}</P>
              </EditableContentContainer>
            </CContainer>

            <HStack wrap={"wrap"} mt={4}>
              <NavLink to="/contact" w={"fit"}>
                <BButton bg={"white"} color={"dark"}>
                  Dapatkan Penawaran Sekarang
                </BButton>
              </NavLink>

              <EditableContentContainer contentId={36} content={contents?.[36]}>
                <Link to={contents?.[36]} target="_blank">
                  <BButton colorPalette={"green"}>
                    <Icon>
                      <IconBrandWhatsappFilled />
                    </Icon>
                    Hubungi Tim Kami
                  </BButton>
                </Link>
              </EditableContentContainer>
            </HStack>
          </CContainer>

          <CContainer my={"auto"}>
            <EditableContentContainer
              contentId={37}
              content={contents?.[37]}
              fileInput
            >
              <Img
                key={contents?.[37]}
                src={contents?.[37]}
                alt={contents?.[37]}
                borderRadius={16}
              />
            </EditableContentContainer>
          </CContainer>
        </SimpleGrid>
      </Container>
    </CContainer>
  );
};

export default HomeContact;
