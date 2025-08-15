import CContainer from "@/components/ui-custom/CContainer";
import NavLink from "@/components/ui-custom/NavLink";
import P from "@/components/ui-custom/P";
import { Avatar } from "@/components/ui/avatar";
import { R_SPACING } from "@/constants/sizes";
import useActiveCareer from "@/context/useActiveCareer";
import { Breadcrumb, Container, HStack, Stack } from "@chakra-ui/react";

const CareerApplicationPage = () => {
  // Contexts
  const activeCareer = useActiveCareer((s) => s.activeCareer);

  return (
    <CContainer pt={R_SPACING}>
      <Container pb={["32px", null, "80px"]}>
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <NavLink to="/">
                <Breadcrumb.Link>Beranda</Breadcrumb.Link>
              </NavLink>
            </Breadcrumb.Item>

            <Breadcrumb.Separator />

            <Breadcrumb.Item>
              <NavLink to="/karir">
                <Breadcrumb.Link>Karir</Breadcrumb.Link>
              </NavLink>
            </Breadcrumb.Item>

            <Breadcrumb.Separator />

            <Breadcrumb.Item>
              <Breadcrumb.Link color={"p.500"} fontWeight={"semibold"}>
                Formulir
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>

        {activeCareer && (
          <CContainer mt={6}>
            <Stack flexDir={["column", null, "row"]}>
              <CContainer w={"30%"}>
                <HStack gap={4}>
                  <Avatar
                    name={activeCareer?.carrier_category?.name}
                    bg={"s.100"}
                    color={"p.600"}
                  />
                  <P fontWeight={"semibold"}>
                    {activeCareer?.carrier_category?.name}
                  </P>
                </HStack>

                <HStack></HStack>
              </CContainer>

              <CContainer w={"70%"}></CContainer>
            </Stack>
          </CContainer>
        )}
      </Container>
    </CContainer>
  );
};

export default CareerApplicationPage;
