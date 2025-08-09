import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import Heading2 from "@/components/ui-custom/Heading2";
import NavLink from "@/components/ui-custom/NavLink";
import SearchInput from "@/components/ui-custom/SearchInput";
import BlogItem from "@/components/widget/BlogItem";
import Container from "@/components/widget/Container";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import { DUMMY_CONTENTS } from "@/constants/dummy";
import { Interface__Blog } from "@/constants/interfaces";
import { R_SPACING } from "@/constants/sizes";
import useContents from "@/context/useContents";
import useDataState from "@/hooks/useDataState";
import { Breadcrumb, HStack, SimpleGrid } from "@chakra-ui/react";

const BlogList = (props: any) => {
  // Props
  const { blogs, ...restProps } = props;

  return (
    <SimpleGrid columns={[1, 2, 3]} gap={4} {...restProps}>
      {blogs?.map((blog: Interface__Blog) => {
        return <BlogItem blog={blog} />;
      })}
    </SimpleGrid>
  );
};

const BlogPage = () => {
  // Contexts
  const allContents = useContents((s) => s.data);
  const contents = allContents?.contents;

  const { error, loading, data, makeRequest } = useDataState<any>({
    initialData: DUMMY_CONTENTS?.blogs,
    url: ``,
    dependencies: [],
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
            <SearchInput inputProps={{ borderRadius: "full" }} />
            <BButton colorPalette={"p"}>Cari</BButton>
          </HStack>
        </HStack>

        <BlogList blogs={data} mt={4} />
      </Container>
    </CContainer>
  );
};

export default BlogPage;
