import CContainer from "@/components/ui-custom/CContainer";
import Container from "@/components/widget/Container";
import { Breadcrumb } from "@chakra-ui/react";

const BlogPage = () => {
  return (
    <CContainer py={"80px"}>
      <Container>
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
            </Breadcrumb.Item>

            <Breadcrumb.Separator />

            <Breadcrumb.Item>
              <Breadcrumb.Link href="#" color={"p.500"} fontWeight={"semibold"}>
                Components
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </Container>
    </CContainer>
  );
};

export default BlogPage;
