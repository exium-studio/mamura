import CContainer from "@/components/ui-custom/CContainer";
import { LP_NAVS_1, LP_NAVS_2 } from "@/constants/navs";
import useBackOnClose from "@/hooks/useBackOnClose";
import useIsSmScreenWidth from "@/hooks/useIsSmScreenWidth";
import back from "@/utils/back";
import { HStack, Icon, useDisclosure } from "@chakra-ui/react";
import { IconMenu } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BButton from "../ui-custom/BButton";
import NavLink from "../ui-custom/NavLink";
import P from "../ui-custom/P";
import { CloseButton } from "../ui/close-button";
import {
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
} from "../ui/drawer";
import EditableContentContainer from "./EditableContentContainer";
import HashLink from "./HashLink";
import MamuraLogo from "./MamuraLogo";

const NavDrawer = (props: any) => {
  // Props
  const { activePath } = props;

  // Hooks
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose("menu-drawer", open, onOpen, onClose);

  return (
    <>
      <BButton iconButton onClick={onOpen}>
        <Icon>
          <IconMenu />
        </Icon>
      </BButton>

      <DrawerRoot open={open}>
        <DrawerContent>
          <DrawerHeader pr={4} pt={4}>
            <HStack justify={"space-between"} w={"full"}>
              <MamuraLogo />

              <CloseButton onClick={back} />
            </HStack>
          </DrawerHeader>

          <DrawerBody px={2}>
            <CContainer gap={1}>
              {LP_NAVS_1.map((nav) => {
                return (
                  <BButton unclicky variant={"ghost"} textAlign={"left"}>
                    <P textAlign={"left"} w={"full"}>
                      {nav.label}
                    </P>
                  </BButton>
                );
              })}

              {LP_NAVS_2.map((nav) => {
                const active = activePath === nav.path;

                return (
                  <BButton unclicky variant={"ghost"} textAlign={"left"}>
                    <P
                      textAlign={"left"}
                      w={"full"}
                      color={active ? "p.500" : ""}
                    >
                      {nav.label}
                    </P>
                  </BButton>
                );
              })}
            </CContainer>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </DrawerRoot>
    </>
  );
};

const SmNavs = (props: any) => {
  // Props
  const { activePath, scrolled, rootPath } = props;

  return (
    <HStack
      justify={"space-between"}
      px={4}
      h={"70px"}
      w={"full"}
      position={"fixed"}
      top={0}
      left={0}
    >
      <MamuraLogo type={rootPath || !scrolled ? "light" : "color"} />

      <NavDrawer activePath={activePath} />
    </HStack>
  );
};

const LgNavs = (props: any) => {
  // Props
  const { activePath, scrolled, rootPath } = props;

  return (
    <HStack
      justify={"center"}
      w={"full"}
      px={4}
      py={2}
      gap={4}
      h={"70px"}
      position={"fixed"}
      top={0}
      left={0}
    >
      <HStack w={"280px"} gap={1}>
        {LP_NAVS_1.map((nav) => {
          const active = activePath === nav.path;

          return (
            <HashLink key={nav.path}>
              <BButton
                unclicky
                variant={"ghost"}
                color={active ? "p.500" : scrolled ? "" : "body"}
                className="btn"
              >
                {nav.label}
              </BButton>
            </HashLink>
          );
        })}
      </HStack>

      <EditableContentContainer contentId={1}>
        <MamuraLogo type={rootPath || !scrolled ? "light" : "color"} />
      </EditableContentContainer>

      <HStack w={"280px"} gap={1}>
        {LP_NAVS_2.map((nav) => {
          const active = activePath === nav.path;

          return (
            <NavLink w={"fit"}>
              <BButton
                unclicky
                variant={"ghost"}
                color={active ? "p.500" : scrolled ? "" : "body"}
                className="btn"
              >
                {nav.label}
              </BButton>
            </NavLink>
          );
        })}
      </HStack>
    </HStack>
  );
};

const TopNav = (props: any) => {
  // Props
  const { activePath } = props;

  // Hooks
  const iss = useIsSmScreenWidth();
  const location = useLocation();
  const rootPath = location.pathname === "/";

  // States
  const [top, setTop] = useState<number>(0);
  const scrolled = top > 0;

  useEffect(() => {
    function handleScroll() {
      setTop(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <CContainer
      bg={top > 0 ? "body" : "transparent"}
      // color={top > 0 ? "ibody" : "body"}
    >
      {iss && (
        <SmNavs
          activePath={activePath}
          scrolled={scrolled}
          rootPath={rootPath}
        />
      )}

      {!iss && (
        <LgNavs
          activePath={activePath}
          scrolled={scrolled}
          rootPath={rootPath}
        />
      )}
    </CContainer>
  );
};

export default TopNav;
