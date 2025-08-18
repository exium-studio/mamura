import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import Heading2 from "@/components/ui-custom/Heading2";
import NavLink from "@/components/ui-custom/NavLink";
import BlogItem from "@/components/widget/BlogItem";
import CarouselControl from "@/components/widget/CarouselControl";
import Container from "@/components/widget/Container";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import { Interface__Blog } from "@/constants/interfaces";
import { R_SPACING } from "@/constants/sizes";
import useScreen from "@/hooks/useScreen";
import { HStack } from "@chakra-ui/react";
import { useRef } from "react";

const HomeBlogs = (props: any) => {
  // Props
  const { contents, blogs } = props;

  // Hooks
  const { sw } = useScreen();

  // Refs
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // States
  const px = sw < 1440 ? R_SPACING : "calc((100vw - 1440px + 64px) / 2)";

  return (
    <CContainer py={["32px", null, "80px"]}>
      <Container>
        <HStack justify={"space-between"} wrap={"wrap"} gap={4}>
          <EditableContentContainer contentId={41} content={contents?.[41]}>
            <Heading2 fontSize={"3xl"} fontWeight={"bold"}>
              {contents?.[41]}
            </Heading2>
          </EditableContentContainer>

          <NavLink to="/blog" w={"fit"}>
            <BButton colorPalette={"p"} size={"md"}>
              Lihat Semua
            </BButton>
          </NavLink>
        </HStack>
      </Container>

      <CContainer
        mt={8}
        fRef={carouselContainerRef}
        overflowX={"auto"}
        scrollSnapType={"x mandatory"}
        className="noScroll"
      >
        <HStack w={"max"} gap={4} align={"stretch"} px={px}>
          {blogs?.map((blog: Interface__Blog) => {
            return (
              <BlogItem
                key={blog?.id}
                blog={blog}
                minW={"300px"}
                maxW={"320px"}
                scrollSnapAlign={"center"}
                h={"full"}
              />
            );
          })}
        </HStack>
      </CContainer>

      <Container align={"center"} mt={4}>
        <CarouselControl
          carouselContainerRef={carouselContainerRef}
          dataLength={blogs?.length}
          showIndicator={false}
          buttonProps={{
            className: "ss",
            size: ["md", null, "xl"],
          }}
        />
      </Container>
    </CContainer>
  );
};

export default HomeBlogs;
