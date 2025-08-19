import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import Heading2 from "@/components/ui-custom/Heading2";
import NavLink from "@/components/ui-custom/NavLink";
import P from "@/components/ui-custom/P";
import CarouselControl from "@/components/widget/CarouselControl";
import Container from "@/components/widget/Container";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import SimplePopover from "@/components/widget/SimplePopover";
import formatNumber from "@/utils/formatNumber";
import { Box, Center, HStack, Icon, SimpleGrid } from "@chakra-ui/react";
import { IconArrowRight } from "@tabler/icons-react";
import { useRef, useState } from "react";

const PricingItem = (props: any) => {
  // Props
  const { pricing, ...restProps } = props;

  return (
    <CContainer gap={1} {...restProps}>
      <CContainer
        borderRadius={16}
        overflow={"clip"}
        bg={"p.500"}
        color={"white"}
        h={"fit"}
        mt={"auto"}
      >
        {!!pricing?.is_recommended && (
          <CContainer bg={"s.500"} p={2} borderRadius={16}>
            <P color={"white"} fontWeight={"bold"}>
              Rekomendasi untuk Anda
            </P>
          </CContainer>
        )}

        <CContainer p={4} gap={2}>
          <P>{`${pricing?.name}`}</P>

          <HStack align={"end"}>
            <SimplePopover
              content={<P>{`${formatNumber(pricing?.internet_speed)}`}</P>}
            >
              <P
                fontSize={"4xl"}
                fontWeight={"bold"}
                lineHeight={1}
                lineClamp={1}
              >{`${formatNumber(pricing?.internet_speed)}`}</P>
            </SimplePopover>

            <P flexShrink={0}>Mbps</P>
          </HStack>
        </CContainer>

        <CContainer bg={"p.700"} p={2} borderRadius={16}>
          <HStack align={"end"}>
            <SimplePopover
              content={<P>{`Rp ${formatNumber(pricing?.price)}`}</P>}
            >
              <P fontWeight={"semibold"} lineClamp={1}>{`Rp ${formatNumber(
                pricing?.price
              )}`}</P>
            </SimplePopover>

            <P fontSize={"xs"}>/Bulan</P>
          </HStack>
        </CContainer>
      </CContainer>

      <NavLink to="/kontak">
        <BButton
          variant={"ghost"}
          colorPalette={"p"}
          justifyContent={"space-between"}
        >
          <P>Langganan Sekarang</P>
          <Icon>
            <IconArrowRight />
          </Icon>
        </BButton>
      </NavLink>
    </CContainer>
  );
};

const HomePricing = (props: any) => {
  // Props
  const { contents, pricing } = props;

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // States
  const [pricingCategory, setPricingCategory] = useState<"Home" | "Business">(
    "Home"
  );

  return (
    <CContainer id="pricing" py={["32px", null, "80px"]} gap={8}>
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

        <CContainer align={"center"} gap={4}>
          <HStack
            p={1}
            borderRadius={"full"}
            pos={"relative"}
            bg={"d1"}
            w={["308px", null, "368px"]}
            h={"48px"}
          >
            <Box
              w={["150px", null, "180px"]}
              h={"40px"}
              bg={"p.500"}
              borderRadius={"full"}
              pos={"absolute"}
              left={
                pricingCategory === "Home" ? "4px" : ["154px", null, "184px"]
              }
              transition={"200ms"}
              zIndex={1}
            />

            <Center
              w={["150px", null, "180px"]}
              cursor={"pointer"}
              onClick={() => {
                setPricingCategory("Home");
              }}
              zIndex={2}
            >
              <P
                color={pricingCategory === "Home" ? "white" : "fg.subtle"}
                transition={"200ms"}
              >
                Kebutuhan Rumah
              </P>
            </Center>

            <Center
              w={["150px", null, "180px"]}
              cursor={"pointer"}
              onClick={() => {
                setPricingCategory("Business");
              }}
              zIndex={2}
            >
              <P
                color={pricingCategory === "Business" ? "white" : "fg.subtle"}
                transition={"200ms"}
              >
                Kebutuhan Bisnis
              </P>
            </Center>
          </HStack>
        </CContainer>
      </Container>

      <Container
        fRef={containerRef}
        overflowX={"auto"}
        className="noScroll"
        scrollSnapType={"x mandatory"}
      >
        <SimpleGrid columns={[4, null, 2, 4]} gap={4} w={["max", null, "full"]}>
          {pricing?.[pricingCategory]?.map((pricing: any) => (
            <PricingItem
              key={pricing?.id}
              pricing={pricing}
              scrollSnapAlign={"center"}
            />
          ))}
        </SimpleGrid>
      </Container>

      <Center>
        <CarouselControl
          carouselContainerRef={containerRef}
          dataLength={pricing?.[pricingCategory]?.length}
          showIndicator={false}
          buttonProps={{
            className: "ss",
          }}
        />
      </Center>
    </CContainer>
  );
};

export default HomePricing;
