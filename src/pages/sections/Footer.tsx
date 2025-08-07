import CContainer from "@/components/ui-custom/CContainer";
import NavLink from "@/components/ui-custom/NavLink";
import P from "@/components/ui-custom/P";
import Container from "@/components/widget/Container";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import HashLink from "@/components/widget/HashLink";
import MamuraLogo from "@/components/widget/MamuraLogo";
import { LP_NAVS_1, LP_NAVS_2 } from "@/constants/navs";
import { HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = (props: any) => {
  // Props
  const { contents } = props;

  return (
    <CContainer bg={"p.800"} pt={16} pb={8} color={"white"}>
      <Container>
        <HStack wrap={"wrap"} gapX={20} gapY={8} align={"start"}>
          <CContainer gap={8} flex={"1 1 400px"}>
            <MamuraLogo type="light" w={"100px"} h={"fit"} />

            <EditableContentContainer contentId={42} content={contents?.[42]}>
              <P opacity={0.8}>{`${contents?.[42]}`}</P>
            </EditableContentContainer>
          </CContainer>

          <CContainer gap={2} flex={"1 1 240px"}>
            <P fontSize={"lg"} fontWeight={"bold"}>
              Menu
            </P>

            <HStack wrap={"wrap"} gap={8}>
              <CContainer gap={2} flex={"1 1 120px"}>
                {LP_NAVS_1.map((nav) => {
                  return (
                    <HashLink
                      key={nav.id}
                      id={nav.id}
                      path={nav.path}
                      cursor={"pointer"}
                      opacity={0.8}
                    >
                      {nav.label}
                    </HashLink>
                  );
                })}
              </CContainer>

              <CContainer gap={2} flex={"1 1 120px"}>
                {LP_NAVS_2.map((nav) => {
                  return (
                    <NavLink
                      key={nav.path}
                      to={nav.path}
                      cursor={"pointer"}
                      opacity={0.8}
                    >
                      {nav.label}
                    </NavLink>
                  );
                })}
              </CContainer>
            </HStack>
          </CContainer>

          <CContainer gap={2} flex={"1 1 240px"}>
            <P fontSize={"lg"} fontWeight={"bold"}>
              Informasi Kontak
            </P>

            <CContainer gap={2}>
              <P opacity={0.8}>{contents?.[43]}</P>

              <P opacity={0.8}>{contents?.[44]}</P>

              <P opacity={0.8}>{contents?.[45]}</P>
            </CContainer>
          </CContainer>
        </HStack>

        <HStack
          wrap={"wrap"}
          justify={"space-between"}
          mt={8}
          pt={8}
          borderTop={"1px solid"}
          borderColor={"d2"}
        >
          <HStack wrap={"wrap"} gap={8}>
            <P fontSize={"lg"} fontWeight={"bold"}>
              Social Media
            </P>

            <HStack gap={4}>
              <EditableContentContainer contentId={46} content={contents?.[46]}>
                <Link target="_blank" to={contents?.[46]}>
                  <P opacity={0.8}>Facebook</P>
                </Link>
              </EditableContentContainer>

              <EditableContentContainer contentId={47} content={contents?.[47]}>
                <Link target="_blank" to={contents?.[47]}>
                  <P opacity={0.8}>Instagram</P>
                </Link>
              </EditableContentContainer>

              <EditableContentContainer contentId={48} content={contents?.[48]}>
                <Link target="_blank" to={contents?.[48]}>
                  <P opacity={0.8}>X (Twitter)</P>
                </Link>
              </EditableContentContainer>

              <EditableContentContainer contentId={49} content={contents?.[49]}>
                <Link target="_blank" to={contents?.[49]}>
                  <P opacity={0.8}>LinkedIn</P>
                </Link>
              </EditableContentContainer>
            </HStack>
          </HStack>

          <HStack gap={1}>
            <P
              opacity={0.8}
            >{`&copy; Copyright ${new Date().getFullYear()} -`}</P>
            <EditableContentContainer contentId={50} content={contents?.[50]}>
              <P opacity={0.8}>{contents?.[50]}</P>
            </EditableContentContainer>
          </HStack>
        </HStack>
      </Container>
    </CContainer>
  );
};

export default Footer;
