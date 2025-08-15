import CContainer from "@/components/ui-custom/CContainer";
import Img from "@/components/ui-custom/Img";
import NavLink from "@/components/ui-custom/NavLink";
import Container from "@/components/widget/Container";
import { R_SPACING } from "@/constants/sizes";
import useContents from "@/context/useContents";
import { Breadcrumb, Stack } from "@chakra-ui/react";

const ContactPage = () => {
  // Contexts
  const allContents = useContents((s) => s.data);

  // States
  const contents = allContents?.contents;

  return (
    <CContainer pt={R_SPACING}>
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
              <Breadcrumb.Link color={"p.500"} fontWeight={"semibold"}>
                Kontak
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>

        <CContainer>
          <Stack columns={["column-reverse", null, "row"]}>
            <CContainer w={"60%"}></CContainer>

            <CContainer w={"40%"}>
              <Img src={contents?.[53]} alt={contents?.[53]} />
            </CContainer>
          </Stack>
        </CContainer>
      </Container>
    </CContainer>
  );
};

export default ContactPage;
