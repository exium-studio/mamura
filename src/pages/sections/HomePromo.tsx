import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import Img from "@/components/ui-custom/Img";
import Container from "@/components/widget/Container";
import useIsSmScreenWidth from "@/hooks/useIsSmScreenWidth";
import useScreen from "@/hooks/useScreen";
import { HStack, Icon } from "@chakra-ui/react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useRef } from "react";

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
      {...restProps}
    >
      <Icon>
        <IconArrowRight />
      </Icon>
    </BButton>
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
              return (
                <Img
                  key={`${p.image?.[0]?.id}${p.image?.[0]?.file_url}`}
                  src={p.image?.[0]?.file_url}
                  alt={p.image?.[0]?.file_name}
                  aspectRatio={16 / 9}
                  scrollSnapAlign={"center"}
                  h={"full"}
                  maxW={[
                    "calc(100vw)",
                    null,
                    overMax ? "calc(1440px - 80px)" : "calc(100vw - 80px)",
                  ]}
                />
              );
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
