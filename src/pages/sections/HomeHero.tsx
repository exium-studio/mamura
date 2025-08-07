import BackButton from "@/components/ui-custom/BackButton";
import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "@/components/ui-custom/Disclosure";
import DisclosureHeaderContent from "@/components/ui-custom/DisclosureHeaderContent";
import FeedbackNoData from "@/components/ui-custom/FeedbackNoData";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import Heading1 from "@/components/ui-custom/Heading1";
import P from "@/components/ui-custom/P";
import SearchInput from "@/components/ui-custom/SearchInput";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import HeroEarth from "@/components/widget/HeroEarth";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import empty from "@/utils/empty";
import scrollToView from "@/utils/scrollToView";
import { Container, HStack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const DUMMY = {
  2: "Pilihan Tepat, ",
  3: "Wifi Tepat",
  4: "Nikmati internet fiber cepat, stabil, dan hemat untuk rumah & usaha Anda. Mamura - Solusi Wifi Murah, Cepat, dan Handal.",
  5: "Cek Jangkauan Area Anda Sekarang!",
};

const CoverageCheck = () => {
  // Hooks
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`coverage-check`, open, onOpen, onClose);

  // States
  const [search, setSearch] = useState<any>("");
  const { error, loading, data, makeRequest } = useDataState<any>({
    // TODO url coverage check
    url: ``,
  });
  const render = {
    loading: <ComponentSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: (
      <CContainer>
        {data?.map((city: any) => {
          return (
            <HStack>
              <P>{city?.name}</P>
            </HStack>
          );
        })}
      </CContainer>
    ),
  };

  return (
    <>
      <BButton
        size={"xl"}
        bg={"white"}
        color={"ibody"}
        onClick={onOpen}
        pointerEvents={"auto"}
      >
        Cek Area
      </BButton>

      <DisclosureRoot open={open} lazyLoad size={"xs"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent title={`Jangkauan Area Mamura`} />
          </DisclosureHeader>

          <DisclosureBody>
            <SearchInput
              onChangeSetter={(inputValue) => {
                setSearch(inputValue);
              }}
              inputProps={{
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderRadius: 0,
              }}
              inputValue={search}
              invalid={false}
            />

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
          </DisclosureBody>

          <DisclosureFooter>
            <BackButton />
          </DisclosureFooter>
        </DisclosureContent>
      </DisclosureRoot>
    </>
  );
};
const CTA = (props: any) => {
  // Props
  const { contents, setContents, ...restProps } = props;

  return (
    <CContainer align={"center"} gap={4} {...restProps}>
      <EditableContentContainer contentId={5} content={contents?.[5]}>
        <P
          textAlign={"center"}
          fontSize={"xl"}
          fontWeight={"semibold"}
          pointerEvents={"auto"}
          lineHeight={1.4}
        >
          {contents?.[5]}
        </P>
      </EditableContentContainer>

      <HStack>
        <CoverageCheck />

        <BButton
          size={"xl"}
          colorPalette={"p"}
          onClick={() => {
            scrollToView(`packages`);
          }}
          pointerEvents={"auto"}
        >
          Lihat Paket
        </BButton>
      </HStack>
    </CContainer>
  );
};

const Hero = () => {
  // States
  const { error, loading, data, makeRequest } = useDataState<any>({
    // TODO get hero content
    initialData: DUMMY,
    url: ``,
  });
  const contents = data;
  const render = {
    loading: <ComponentSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: (
      <CContainer gap={4} align={"center"}>
        <HStack wrap={"wrap"} gapY={0} justify={"center"}>
          <EditableContentContainer contentId={2} content={contents?.[2]}>
            <Heading1
              fontWeight={"bold"}
              textAlign={"center"}
              pointerEvents={"auto"}
            >
              {contents?.[2]}
            </Heading1>
          </EditableContentContainer>

          <EditableContentContainer contentId={3} content={contents?.[3]}>
            <Heading1
              fontWeight={"bold"}
              textAlign={"center"}
              color={"s.500"}
              pointerEvents={"auto"}
            >
              {contents?.[3]}
            </Heading1>
          </EditableContentContainer>
        </HStack>

        <EditableContentContainer contentId={4} content={contents?.[4]}>
          <P
            textAlign={"center"}
            maxW={"600px"}
            opacity={0.6}
            pointerEvents={"auto"}
          >
            {`${contents?.[4]}`}
          </P>
        </EditableContentContainer>

        <CTA contents={contents} mt={4} />
      </CContainer>
    ),
  };

  return (
    <CContainer
      bg={"#051524"}
      mt={"-70px"}
      pt={"70px"}
      color={"white"}
      pos={"relative"}
      overflow={"clip"}
      pb={"80px"}
    >
      <Container py={["32px", null, "100px"]} zIndex={2} pointerEvents={"none"}>
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

      <CContainer
        zIndex={1}
        pos={"absolute"}
        opacity={0.6}
        align={"center"}
        mt={"-50px"}
      >
        <HeroEarth />
      </CContainer>
    </CContainer>
  );
};

export default Hero;
