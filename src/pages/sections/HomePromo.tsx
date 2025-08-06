import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import Img from "@/components/ui-custom/Img";
import Container from "@/components/widget/Container";
import useScreen from "@/hooks/useScreen";
import { HStack, Icon } from "@chakra-ui/react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useRef } from "react";

const HomePromo = (props: any) => {
  // Props
  const { promos } = props;

  // Hooks
  const { sw } = useScreen();
  const overMax = sw > 1440;

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <CContainer align={"center"}>
      <Container align={"center"} pb={"100px"} pos={"relative"}>
        <BButton
          iconButton
          unclicky
          bg={"white"}
          color={"black"}
          size={"2xl"}
          pos={"absolute"}
          left={"8px"}
          top={"50%"}
          transform={"translateY(-50%)"}
          className="ss"
          onClick={() => {
            containerRef.current?.scrollBy({
              left: -containerRef.current.offsetWidth,
              behavior: "smooth",
            });
          }}
        >
          <Icon>
            <IconArrowLeft />
          </Icon>
        </BButton>

        <BButton
          iconButton
          unclicky
          bg={"white"}
          color={"black"}
          size={"2xl"}
          pos={"absolute"}
          right={"8px"}
          top={"50%"}
          transform={"translateY(-50%)"}
          className="ss"
          onClick={() => {
            containerRef.current?.scrollBy({
              left: containerRef.current.offsetWidth,
              behavior: "smooth",
            });
          }}
        >
          <Icon>
            <IconArrowRight />
          </Icon>
        </BButton>

        <CContainer
          fRef={containerRef}
          w={overMax ? "calc(1440px - 80px)" : "calc(100vw - 80px)"}
          overflowX={"auto"}
          borderRadius={"50px"}
          // overflowY={"clip"}
          className="noScroll"
          scrollSnapType={"x mandatory"}
          aspectRatio={16 / 9}
        >
          <HStack w={"max"}>
            {promos?.map((promo: any) => {
              return (
                <Img
                  key={promo.image}
                  src={promo.image?.file_url}
                  aspectRatio={16 / 9}
                  scrollSnapAlign={"center"}
                  maxW={overMax ? "calc(1440px - 80px)" : "calc(100vw - 80px)"}
                />
              );
            })}
          </HStack>
        </CContainer>
      </Container>
    </CContainer>
  );
};

export default HomePromo;
