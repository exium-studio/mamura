import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import FeedbackNoData from "@/components/ui-custom/FeedbackNoData";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import Heading1 from "@/components/ui-custom/Heading1";
import Heading2 from "@/components/ui-custom/Heading2";
import Img from "@/components/ui-custom/Img";
import NavLink from "@/components/ui-custom/NavLink";
import P from "@/components/ui-custom/P";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import BlogItem from "@/components/widget/BlogItem";
import CarouselControl from "@/components/widget/CarouselControl";
import Container from "@/components/widget/Container";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import { Interface__Blog } from "@/constants/interfaces";
import { R_SPACING } from "@/constants/sizes";
import useContents from "@/context/useContents";
import useDataState from "@/hooks/useDataState";
import useScreen from "@/hooks/useScreen";
import empty from "@/utils/empty";
import formatCount from "@/utils/formatCount";
import formatDate from "@/utils/formatDate";
import { handleShareBlog } from "@/utils/handleShare";
import { Breadcrumb, HStack, Icon, Stack } from "@chakra-ui/react";
import { IconCircleFilled, IconEye, IconShare } from "@tabler/icons-react";
import parse from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface BlogDetailProps {
  blog: Interface__Blog | undefined;
}
type TocItem = {
  id: string;
  level: number;
  text: string;
};

const OtherBlogs = (props: any) => {
  // Props
  const { contents, currentBlog } = props;

  // Hooks
  const { sw } = useScreen();

  // Refs
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // States
  const px = sw < 1440 ? R_SPACING : "calc((100vw - 1440px + 64px) / 2)";
  const { error, initialLoading, data, makeRequest } = useDataState<
    Interface__Blog[]
  >({
    url: `/api/mamura/public-request/get-blog-news/${currentBlog.id}`,
    dependencies: [],
  });
  const render = {
    loading: <ComponentSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: (
      <>
        <Container>
          <HStack justify={"space-between"} wrap={"wrap"} gap={4}>
            <EditableContentContainer contentId={41} content={contents?.[41]}>
              <Heading2 fontSize={"3xl"} fontWeight={"bold"}>
                {contents?.[41]}
              </Heading2>
            </EditableContentContainer>

            <NavLink to="/blogs" w={"fit"}>
              <BButton colorPalette={"p"} size={"md"}>
                Lihat Semua
              </BButton>
            </NavLink>
          </HStack>
        </Container>

        <CContainer
          fRef={carouselContainerRef}
          overflowX={"auto"}
          scrollSnapType={"x mandatory"}
          className="noScroll"
        >
          <HStack w={"max"} gap={4} align={"stretch"} px={px}>
            {data?.map((blog: Interface__Blog) => {
              return (
                <BlogItem
                  key={blog?.id}
                  blog={blog}
                  minW={"300px"}
                  maxW={"320px"}
                  scrollSnapAlign={"center"}
                />
              );
            })}
          </HStack>
        </CContainer>

        <Container align={"center"}>
          <CarouselControl
            carouselContainerRef={carouselContainerRef}
            dataLength={data?.length}
            showIndicator={false}
            buttonProps={{
              className: "ss",
              size: ["md", null, "xl"],
            }}
          />
        </Container>
      </>
    ),
  };

  return (
    <CContainer mb={["32px", null, "80px"]} gap={8}>
      {initialLoading && render.loading}
      {!initialLoading && (
        <>
          {error && render.error}
          {!error && (
            <>
              {data && render.loaded}
              {(!data || empty(data)) && render.empty}
            </>
          )}
        </>
      )}
    </CContainer>
  );
};

const BlogDetail = (props: BlogDetailProps) => {
  // Props
  const { blog } = props;

  // Contexts
  const allContents = useContents((s) => s.data);

  // States
  const contents = allContents?.contents;
  const [toc, setToc] = useState<TocItem[]>([]);
  const [html, setHtml] = useState("");

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(blog?.blog_content || "", "text/html");
    const headings = Array.from(doc.querySelectorAll("h1, h2, h3, h4, h5, h6"));

    const items: TocItem[] = headings.map((el, idx) => {
      const id = `heading-${idx}`;
      el.setAttribute("id", id);
      return {
        id,
        level: Number(el.tagName.replace("H", "")),
        text: el.textContent || "",
      };
    });

    setToc(items);
    setHtml(doc.body.innerHTML);
  }, []);

  return (
    <>
      <Container>
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <NavLink to="/">
                <Breadcrumb.Link>Beranda</Breadcrumb.Link>
              </NavLink>
            </Breadcrumb.Item>

            <Breadcrumb.Separator />

            <Breadcrumb.Item>
              <NavLink to="/blog">
                <Breadcrumb.Link>{contents?.[51]}</Breadcrumb.Link>
              </NavLink>
            </Breadcrumb.Item>

            <Breadcrumb.Separator />

            <Breadcrumb.Item>
              <Breadcrumb.Link color={"p.500"} fontWeight={"semibold"}>
                {blog?.title}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>

        <CContainer mt={6}>
          <Img
            borderRadius={16}
            aspectRatio={2 / 1}
            key={blog?.thumbnail?.file_url}
            src={blog?.thumbnail?.file_url}
            alt={blog?.thumbnail?.file_url}
          />
        </CContainer>

        <CContainer my={["32px", null, "80px"]} px={["0", null, null, "80px"]}>
          <Stack flexDir={["column", null, "row"]} gap={R_SPACING}>
            <CContainer
              w={["full", null, "30%"]}
              bg={"bg.subtle"}
              borderRadius={16}
              h={"fit"}
              pos={["", null, "sticky"]}
              top={"calc(70px + 16px)"}
            >
              <CContainer
                bg={"s.500"}
                color={"white"}
                p={4}
                fontSize={"lg"}
                fontWeight={"bold"}
                borderRadius={16}
              >
                Daftar isi
              </CContainer>

              <CContainer p={4} pl={0}>
                <AccordionRoot multiple defaultValue={["toc"]}>
                  <AccordionItem value="toc" border={"none"}>
                    <AccordionItemTrigger
                      indicatorPlacement="start"
                      ml={2}
                      p={0}
                    >
                      <CContainer>
                        <P>{formatDate(blog?.updated_at || Date())}</P>
                      </CContainer>
                    </AccordionItemTrigger>

                    <AccordionItemContent p={0}>
                      <CContainer pl={4} pt={4} overflow={"visible"}>
                        {empty(toc) && (
                          <FeedbackNoData
                            title=""
                            description="Tidak memiliki daftar isi"
                          />
                        )}

                        {!empty(toc) &&
                          toc?.map((item) => (
                            <HStack
                              pos={"relative"}
                              borderLeft={"1px solid"}
                              borderColor={"p.500"}
                              pl={4}
                              py={2}
                              cursor={"pointer"}
                              onClick={() =>
                                document
                                  .getElementById(item.id)
                                  ?.scrollIntoView({ behavior: "smooth" })
                              }
                            >
                              <Icon
                                boxSize={3}
                                color={"p.500"}
                                zIndex={2}
                                pos={"absolute"}
                                left={"-6px"}
                                top={"50%"}
                                transform={"translateY(-50%)"}
                              >
                                <IconCircleFilled />
                              </Icon>
                              <P key={item?.id} fontWeight={"medium"}>
                                {item?.text}
                              </P>
                            </HStack>
                          ))}
                      </CContainer>
                    </AccordionItemContent>
                  </AccordionItem>
                </AccordionRoot>
              </CContainer>
            </CContainer>

            <CContainer w={["full", null, "70%"]} gap={4}>
              <Heading1 fontWeight={"bold"}>{blog?.title}</Heading1>

              <HStack>
                <HStack>
                  <Icon boxSize={"18px"}>
                    <IconEye stroke={1.5} />
                  </Icon>
                  <P color={"fg.muted"}>{`${formatCount(
                    blog?.views
                  )} Dilihat`}</P>
                </HStack>

                <BButton
                  size={"xs"}
                  variant={"ghost"}
                  fontWeight={"normal"}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (blog) {
                      handleShareBlog(blog);
                    }
                  }}
                >
                  <Icon boxSize={4}>
                    <IconShare stroke={1.5} />
                  </Icon>
                  Share
                </BButton>
              </HStack>

              {/* <CContainer>{parse(blog?.blog_content || "")}</CContainer> */}
              <CContainer gap={4}>{parse(html || "")}</CContainer>
            </CContainer>
          </Stack>
        </CContainer>
      </Container>

      <OtherBlogs contents={contents} currentBlog={blog} />
    </>
  );
};

const BlogDetailPage = () => {
  // Hooksdummt
  const location = useLocation();

  // States
  const slug = location.pathname?.split("/")[2];
  const { error, initialLoading, data, makeRequest } =
    useDataState<Interface__Blog>({
      url: `/api/mamura/public-request/get-blog-by-slug/${slug}`,
      dependencies: [slug],
      dataResource: false,
      conditions: !!slug,
    });
  const render = {
    loading: <ComponentSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: <BlogDetail blog={data} />,
  };

  return (
    <CContainer flex={1} pt={R_SPACING}>
      {initialLoading && render.loading}
      {!initialLoading && (
        <>
          {error && render.error}
          {!error && (
            <>
              {data && render.loaded}
              {(!data || empty(data)) && render.empty}
            </>
          )}
        </>
      )}
    </CContainer>
  );
};

export default BlogDetailPage;
