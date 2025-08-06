import CContainer from "@/components/ui-custom/CContainer";
import Heading2 from "@/components/ui-custom/Heading2";
import Img from "@/components/ui-custom/Img";
import { Container, HStack } from "@chakra-ui/react";

const HomeStats = (props: any) => {
  const { contents } = props;

  return (
    <CContainer mt={"-30px"} borderRadius={"50px 50px 0 0 "} bg={"white"}>
      <Container py={"100px"}>
        <HStack wrap={"wrap"}>
          <CContainer flex={2}>
            <Heading2 fontWeight={"bold"}>
              Pilihan Tepat untuk Wifi Hemat Tanpa Drama
            </Heading2>
          </CContainer>

          <CContainer flex={1} align={"center"}>
            <Img h={"200px"} src={``} />
          </CContainer>
        </HStack>
      </Container>
    </CContainer>
  );
};

export default HomeStats;
