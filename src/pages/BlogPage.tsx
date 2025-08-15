import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import FeedbackNoData from "@/components/ui-custom/FeedbackNoData";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import Heading2 from "@/components/ui-custom/Heading2";
import NavLink from "@/components/ui-custom/NavLink";
import SearchInput from "@/components/ui-custom/SearchInput";
import BlogItem from "@/components/widget/BlogItem";
import Container from "@/components/widget/Container";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import PaginationControl from "@/components/widget/PaginationControl";
import { Interface__Blog } from "@/constants/interfaces";
import { R_SPACING } from "@/constants/sizes";
import useContents from "@/context/useContents";
import useRenderTrigger from "@/context/useRenderTrigger";
import useDataState from "@/hooks/useDataState";
import empty from "@/utils/empty";
import { Breadcrumb, HStack, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

const BlogList = (props: any) => {
  // Props
  const { filterConfig, ...restProps } = props;

  const { error, loading, data, pagination, page, setPage, makeRequest } =
    useDataState<any>({
      url: `/api/mamura/index-blog`,
      payload: {
        search: filterConfig?.search,
      },
      dependencies: [filterConfig],
    });

  const render = {
    loading: <ComponentSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: (
      <>
        <SimpleGrid columns={[1, 2, 3]} gap={4} {...restProps}>
          {data?.map((blog: Interface__Blog) => {
            return <BlogItem key={blog?.id} blog={blog} />;
          })}
        </SimpleGrid>

        <PaginationControl
          pagination={pagination}
          page={page}
          setPage={setPage}
        />
      </>
    ),
  };

  return (
    <>
      {loading && render.loading}
      {!loading && (
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
    </>
  );
};

const BlogPage = () => {
  // Contexts
  const allContents = useContents((s) => s.data);
  const contents = allContents?.contents;
  const setRt = useRenderTrigger((s) => s.setRt);

  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
  });

  return (
    <CContainer py={R_SPACING}>
      <Container gap={4}>
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <NavLink to="/">
                <Breadcrumb.Link>Beranda</Breadcrumb.Link>
              </NavLink>
            </Breadcrumb.Item>

            <Breadcrumb.Separator />

            <Breadcrumb.Item>
              <Breadcrumb.Link color={"p.500"} fontWeight={"semibold"}>
                {contents?.[51]}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>

        <HStack wrap={"wrap"} justify={"space-between"}>
          <EditableContentContainer contentId={51} content={contents?.[51]}>
            <Heading2 fontWeight={"bold"}>{contents?.[51]}</Heading2>
          </EditableContentContainer>

          <HStack>
            <SearchInput
              inputProps={{ borderRadius: "full" }}
              onChangeSetter={(input) => {
                setFilterConfig({
                  ...filterConfig,
                  search: input,
                });
              }}
              inputValue={filterConfig?.search || ""}
              onKeyDown={(e) => {
                if (e.key === "Enter" && filterConfig?.search) {
                  setRt((ps) => !ps);
                }
              }}
            />
            <BButton colorPalette={"p"} size={"md"}>
              Cari
            </BButton>
          </HStack>
        </HStack>

        <BlogList filterConfig={filterConfig} mt={4} />
      </Container>
    </CContainer>
  );
};

export default BlogPage;
