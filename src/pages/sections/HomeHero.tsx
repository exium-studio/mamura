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
import useContents from "@/context/useContents";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import empty from "@/utils/empty";
import scrollToView from "@/utils/scrollToView";
import { Container, HStack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const CoverageCheck = () => {
  // Hooks
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`coverage-check`, open, onOpen, onClose);

  // States
  const [search, setSearch] = useState<any>("");
  const { error, loading, data, makeRequest } = useDataState<any>({
    url: `/api/mamura/public-request/get-supported-city`,
  });
  const filteredData = data?.filter((item: any) =>
    item?.name?.includes(search)
  );
  const render = {
    loading: <ComponentSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: (
      <CContainer mt={2}>
        {filteredData?.map((city: any) => {
          return (
            <HStack px={4} py={2}>
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
                    {filteredData && render.loaded}
                    {(!filteredData || empty(filteredData)) && render.empty}
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
            scrollToView(`pricing`);
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
  // Contexts
  const allContents = useContents((s) => s.data);

  // States
  const contents = allContents?.contents;

  return (
    <CContainer
      bg={"#051524"}
      mt={"-70px"}
      pt={"70px"}
      color={"white"}
      pos={"relative"}
      overflow={"clip"}
    >
      <Container py={["32px", null, "100px"]} zIndex={2} pointerEvents={"none"}>
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

      <CContainer
        zIndex={3}
        h={["32px", null, "80px"]}
        borderRadius={"30px 30px 0 0"}
        bg={"white"}
        mb={"-1px"}
        mt={6}
      />
    </CContainer>
  );
};

export default Hero;
