import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import FeedbackNoData from "@/components/ui-custom/FeedbackNoData";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import Heading1 from "@/components/ui-custom/Heading1";
import P from "@/components/ui-custom/P";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import useDataState from "@/hooks/useDataState";
import { CONTENT_TYPES } from "@/static/selectOptions";
import empty from "@/utils/empty";
import { Container, HStack } from "@chakra-ui/react";

const DUMMY = {
  2: {
    id: 2,
    content: "Pilihan Tepat, ",
    content_type: CONTENT_TYPES[0],
  },
  3: {
    id: 3,
    content: "Wifi Tepat",
    content_type: CONTENT_TYPES[0],
  },
  4: {
    id: 4,
    content:
      "Nikmati internet fiber cepat, stabil, dan hemat untuk rumah & usaha Anda. Mamura - Solusi Wifi Murah, Cepat, dan Handal.",
    content_type: CONTENT_TYPES[0],
  },
  5: {
    id: 5,
    content: "Cek Jangkauan Area Anda Sekarang!",
    content_type: CONTENT_TYPES[0],
  },
};

const CTA = (props: any) => {
  // Props
  const { data, ...restProps } = props;

  return (
    <CContainer align={"center"} gap={4} {...restProps}>
      <P textAlign={"center"} fontSize={"xl"} fontWeight={"semibold"}>
        {data[5]?.content}
      </P>

      <HStack>
        <BButton size={"xl"} bg={"white"} color={"ibody"}>
          Cek Area
        </BButton>
        <BButton size={"xl"} colorPalette={"p"}>
          Lihat Paket
        </BButton>
      </HStack>
    </CContainer>
  );
};

const Hero = () => {
  const { error, loading, data, makeRequest } = useDataState<any>({
    // TODO get hero content
    initialData: DUMMY,
    url: ``,
  });
  const render = {
    loading: <ComponentSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: (
      <CContainer gap={4} align={"center"}>
        <HStack>
          <EditableContentContainer contentId={2}>
            <Heading1 fontWeight={"bold"} textAlign={"center"}>
              {data[2]?.content}
            </Heading1>
          </EditableContentContainer>

          <EditableContentContainer contentId={3}>
            <Heading1 fontWeight={"bold"} textAlign={"center"} color={"s.500"}>
              {data[3]?.content}
            </Heading1>
          </EditableContentContainer>
        </HStack>

        <P textAlign={"center"} maxW={"600px"} opacity={0.6}>
          {data[4]?.content}
        </P>

        <CTA data={data} mt={4} />
      </CContainer>
    ),
  };

  return (
    <CContainer bg={"#00041c"} pt={"70px"} color={"white"}>
      <Container py={"100px"}>
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
      </Container>
    </CContainer>
  );
};

export default Hero;
