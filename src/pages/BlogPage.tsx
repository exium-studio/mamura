import CContainer from "@/components/ui-custom/CContainer";
import Container from "@/components/widget/Container";
import { R_SPACING } from "@/constants/sizes";
import { Breadcrumb } from "@chakra-ui/react";

const BlogPage = () => {
  return (
    <CContainer py={R_SPACING}>
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
