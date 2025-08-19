import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import Img from "@/components/ui-custom/Img";
import NavLink from "@/components/ui-custom/NavLink";
import P from "@/components/ui-custom/P";
import Container from "@/components/widget/Container";
import useIsSmScreenWidth from "@/hooks/useIsSmScreenWidth";
import useScreen from "@/hooks/useScreen";
import { HStack, Icon } from "@chakra-ui/react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCircleFilled,
} from "@tabler/icons-react";
import { useRef, useState } from "react";

const PrevButton = (props: any) => {
  // Props
  const { containerRef, ...restProps } = props;

  return (
    <BButton
      iconButton
      unclicky
      bg={"white"}
      color={"black"}
      size={["md", null, "xl"]}
      className="ss"
      onClick={() => {
        containerRef.current?.scrollBy({
          left: -containerRef.current.offsetWidth,
          behavior: "smooth",
        });
      }}
      zIndex={3}
      {...restProps}
    >
      <Icon>
        <IconArrowLeft />
      </Icon>
    </BButton>
  );
};
const NextButton = (props: any) => {
  // Props
  const { containerRef, ...restProps } = props;

  return (
    <BButton
      iconButton
      unclicky
      bg={"white"}
      color={"black"}
      size={["md", null, "xl"]}
      className="ss"
      onClick={() => {
        containerRef.current?.scrollBy({
          left: containerRef.current.offsetWidth,
          behavior: "smooth",
        });
      }}
      zIndex={3}
      {...restProps}
    >
      <Icon>
        <IconArrowRight />
      </Icon>
    </BButton>
  );
};
const PromoItem = (props: any) => {
  // Props
  const { promo } = props;

  // Hooks
  const { sw } = useScreen();
  const overMax = sw > 1440;

  const [showTerms, setShowTerms] = useState<boolean>(false);

  return (
    <CContainer
      pos={"relative"}
      overflow={"clip"}
      onClick={() => setShowTerms(!showTerms)}
    >
      <Img
        key={`${promo.id}`}
        src={promo.image?.[0]?.file_url}
        alt={promo.image?.[0]?.file_name}
        aspectRatio={16 / 9}
        scrollSnapAlign={"center"}
        h={"full"}
        maxW={[
          "calc(100vw)",
          null,
          overMax ? "calc(1440px - 80px)" : "calc(100vw - 80px)",
        ]}
      />

      <CContainer
        pos={"absolute"}
        bg={"blackAlpha.700"}
        w={"full"}
        maxW={[
          "calc(100vw)",
          null,
          overMax ? "calc(1440px - 80px)" : "calc(100vw - 80px)",
        ]}
        h={"full"}
        p={4}
        justify={"center"}
        align={"center"}
        opacity={showTerms ? 1 : 0}
        visibility={showTerms ? "visible" : "hidden"}
        transition={"200ms"}
        color={"white"}
      >
        <CContainer w={"fit"} maxW={"500px"} gap={2} className="scrollY">
          <P fontWeight={"semibold"} opacity={0.6}>
            Syarat & Ketentuan
          </P>

          {promo.terms?.map((term: string) => {
            return (
              <HStack key={term}>
                <Icon boxSize={1}>
                  <IconCircleFilled />
                </Icon>

                <P>{term}</P>
              </HStack>
            );
          })}

          <NavLink to="kontak">
            <BButton mt={2} bg={"white"} color={"p.500"}>
              Langganan Sekarang
            </BButton>
          </NavLink>
        </CContainer>
      </CContainer>
    </CContainer>
  );
};

const HomePromo = (props: any) => {
  // Props
  const { promo } = props;

  // Hooks
  const iss = useIsSmScreenWidth();
  const { sw } = useScreen();
  const overMax = sw > 1440;

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <CContainer id="promo" align={"center"} py={["32px", null, "80px"]}>
      <Container align={"center"} pos={"relative"}>
        {!iss && (
          <>
            <PrevButton
              containerRef={containerRef}
              pos={"absolute"}
              left={"8px"}
              top={"50%"}
              transform={"translateY(-50%)"}
            />

            <NextButton
              containerRef={containerRef}
              pos={"absolute"}
              right={"8px"}
              top={"50%"}
              transform={"translateY(-50%)"}
            />
          </>
        )}

        <CContainer
          fRef={containerRef}
          w={[
            "calc(100vw)",
            null,
            overMax ? "calc(1440px - 80px)" : "calc(100vw - 80px)",
          ]}
          overflowX={"auto"}
          borderRadius={[0, null, "30px"]}
          className="noScroll"
          scrollSnapType={"x mandatory"}
          aspectRatio={16 / 9}
        >
          <HStack w={"max"} h={"full"} align={"stretch"}>
            {promo?.map((p: any) => {
              return <PromoItem promo={p} />;
            })}
          </HStack>
        </CContainer>

        {iss && (
          <HStack mt={4}>
            <PrevButton containerRef={containerRef} />

            <NextButton containerRef={containerRef} />
          </HStack>
        )}
      </Container>
    </CContainer>
  );
};

export default HomePromo;
