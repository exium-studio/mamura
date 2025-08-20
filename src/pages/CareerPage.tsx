import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import FeedbackNoData from "@/components/ui-custom/FeedbackNoData";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import Heading2 from "@/components/ui-custom/Heading2";
import Img from "@/components/ui-custom/Img";
import NavLink from "@/components/ui-custom/NavLink";
import P from "@/components/ui-custom/P";
import StringInput from "@/components/ui-custom/StringInput";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { Avatar } from "@/components/ui/avatar";
import Container from "@/components/widget/Container";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import SelectCareerCategory from "@/components/widget/SelectCareerCategory";
import SelectEmployeeStatus from "@/components/widget/SelectEmployeeStatus";
import SelectJobLocation from "@/components/widget/SelectJobLocation";
import { Interface__Career } from "@/constants/interfaces";
import { IMAGES_PATH } from "@/constants/paths";
import { R_SPACING } from "@/constants/sizes";
import useActiveCareer from "@/context/useActiveCareer";
import useContents from "@/context/useContents";
import useDataState from "@/hooks/useDataState";
import empty from "@/utils/empty";
import { Breadcrumb, HStack, Icon, SimpleGrid, Stack } from "@chakra-ui/react";
import {
  IconBriefcase,
  IconCircleFilled,
  IconHourglassLow,
  IconMapPin,
  IconSparkles,
} from "@tabler/icons-react";
import { useState } from "react";

const WhyItem = (props: any) => {
  // Props
  const { contentId, content } = props;

  return (
    <HStack>
      <Icon color={"p.500"}>
        <IconSparkles />
      </Icon>

      <EditableContentContainer contentId={contentId} content={content}>
        <P>{content}</P>
      </EditableContentContainer>
    </HStack>
  );
};
const JobList = (props: { jobs: Interface__Career[] }) => {
  // Props
  const { jobs } = props;

  // Contexts
  const setActiveCareer = useActiveCareer((s) => s.setActiveCareer);

  return (
    <AccordionRoot multiple>
      <CContainer gap={3}>
        {jobs.map((job) => {
          return (
            <AccordionItem
              key={job?.id}
              value={`${job.id}`}
              border={"1px solid"}
              borderColor={"border.muted"}
              borderRadius={16}
            >
              <AccordionItemTrigger p={4}>
                <SimpleGrid columns={[1, 2, 4]} gapX={4} w={"full"} pr={4}>
                  <HStack gap={4} mb={[2, null, 0]}>
                    <Avatar
                      name={job.carrier_category?.name}
                      bg={"s.100"}
                      color={"s.600"}
                    />
                    <P fontWeight={"semibold"} lineHeight={1.4}>
                      {job.title}
                    </P>
                  </HStack>

                  <HStack color={"fg.subtle"}>
                    <Icon boxSize={5}>
                      <IconBriefcase />
                    </Icon>

                    <P>{job.carrier_category?.name}</P>
                  </HStack>

                  <HStack color={"fg.subtle"}>
                    <Icon boxSize={5}>
                      <IconHourglassLow />
                    </Icon>

                    <P>{job.employee_status?.name}</P>
                  </HStack>

                  <HStack color={"fg.subtle"}>
                    <Icon boxSize={5}>
                      <IconMapPin />
                    </Icon>

                    <P>{job.job_location?.name}</P>
                  </HStack>
                </SimpleGrid>
              </AccordionItemTrigger>

              <AccordionItemContent p={4} pt={0}>
                <P fontWeight={"semibold"}>Kualifikasi:</P>

                <CContainer mt={2}>
                  {job?.qualification?.map((qual, i) => {
                    return (
                      <HStack key={i}>
                        <Icon boxSize={1}>
                          <IconCircleFilled />
                        </Icon>
                        <P>{qual}</P>
                      </HStack>
                    );
                  })}
                </CContainer>

                <NavLink to={`/karir/submit`}>
                  <BButton
                    mt={4}
                    colorPalette={"p"}
                    w={"full"}
                    onClick={() => {
                      setActiveCareer(job);
                    }}
                  >
                    Daftar Sekarang
                  </BButton>
                </NavLink>
              </AccordionItemContent>
            </AccordionItem>
          );
        })}
      </CContainer>
    </AccordionRoot>
  );
};
const JobVacancy = (props: any) => {
  // Props
  const { contents } = props;

  // States
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
    carrier_category: undefined,
    employee_status: undefined,
    job_location: undefined,
  });
  const { error, initialLoading, data, makeRequest } = useDataState<any>({
    url: `/api/mamura/index-carrier`,
    payload: {
      search: filterConfig?.search,
      carrier_category: [filterConfig?.carrier_category?.[0]?.id],
      employee_status: [filterConfig?.employee_status?.[0]?.id],
      job_location: [filterConfig?.job_location?.[0]?.id],
    },
    initialLimit: Infinity,
    dependencies: [filterConfig],
  });
  const render = {
    loading: <ComponentSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: <JobList jobs={data} />,
  };

  return (
    <CContainer py={["32px", null, "80px"]} gap={8}>
      <EditableContentContainer contentId={61} content={contents?.[61]}>
        <Heading2 fontSize={"3xl"} fontWeight={"bold"}>
          {contents?.[61]}
        </Heading2>
      </EditableContentContainer>

      <SimpleGrid columns={[1, 2, 4]} gap={4}>
        <CContainer gap={2}>
          <P>Pencarian</P>

          <StringInput
            inputValue={filterConfig?.search}
            onChangeSetter={(input) => {
              setFilterConfig({ ...filterConfig, search: input });
            }}
            placeholder={"Cari nama pekerjaan"}
          />
        </CContainer>

        <CContainer gap={2}>
          <P>Kategori</P>

          <SelectCareerCategory
            inputValue={filterConfig?.carrier_category}
            onConfirm={(input) => {
              setFilterConfig({ ...filterConfig, carrier_category: input });
            }}
          />
        </CContainer>

        <CContainer gap={2}>
          <P>Status Karyawan</P>

          <SelectEmployeeStatus
            inputValue={filterConfig?.employee_status}
            onConfirm={(input) => {
              setFilterConfig({ ...filterConfig, employee_status: input });
            }}
          />
        </CContainer>

        <CContainer gap={2}>
          <P>Lokasi</P>

          <SelectJobLocation
            inputValue={filterConfig?.job_location}
            onConfirm={(input) => {
              setFilterConfig({ ...filterConfig, job_location: input });
            }}
          />
        </CContainer>
      </SimpleGrid>

      <CContainer gap={4}>
        <EditableContentContainer contentId={62} content={contents?.[62]}>
          <P fontSize={"xl"} fontWeight={"bold"}>
            {contents?.[62]}
          </P>
        </EditableContentContainer>

        {initialLoading && render.loading}
        {!initialLoading && (
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
      </CContainer>
    </CContainer>
  );
};
const EmbedLink = (props: any) => {
  // Props
  const { contents, width = 400, height = 600 } = props;

  return (
    <EditableContentContainer
      contentId={68}
      content={contents?.[68]}
      mx={"auto"}
    >
      <iframe
        src={contents?.[68]}
        width={width}
        height={height}
        allowTransparency={true}
        style={{
          border: "none",
          overflow: "hidden",
          maxWidth: "100%",
        }}
      />
    </EditableContentContainer>
  );
};

const CareerPage = () => {
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
                Karir
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>

        <CContainer
          mt={6}
          mb={["32px", null, "80px"]}
          bgImage={`url(${IMAGES_PATH}/discuss_bnw.png)`}
          bgSize={"cover"}
          bgPos={"center"}
          borderRadius={30}
          overflow={"clip"}
        >
          <CContainer
            bg={"blackAlpha.500"}
            p={8}
            minH={"300px"}
            justify={"center"}
            align={"center"}
            color={"white"}
            gap={2}
          >
            <EditableContentContainer contentId={52} content={contents?.[52]}>
              <Heading2
                fontSize={"3xl"}
                fontWeight={"bold"}
                textAlign={"center"}
              >
                {contents?.[52]}
              </Heading2>
            </EditableContentContainer>

            <EditableContentContainer contentId={53} content={contents?.[53]}>
              <P textAlign={"center"}>{contents?.[53]}</P>
            </EditableContentContainer>
          </CContainer>
        </CContainer>

        <CContainer py={["32px", null, "80px"]}>
          <Stack
            flexDir={["column", null, "row"]}
            gap={R_SPACING}
            align={"center"}
          >
            <CContainer w={["full", null, "30%"]}>
              <EditableContentContainer
                contentId={54}
                content={contents?.[54]}
                fileInput
                w={"full"}
              >
                <Img
                  key={contents?.[54]}
                  src={contents?.[54]}
                  alt={contents?.[54]}
                />
              </EditableContentContainer>
            </CContainer>

            <CContainer gap={4} w={["full", null, "70%"]}>
              <EditableContentContainer contentId={55} content={contents?.[55]}>
                <Heading2 fontSize={"3xl"} fontWeight={"bold"}>
                  {contents?.[55]}
                </Heading2>
              </EditableContentContainer>

              <CContainer gap={2}>
                <WhyItem contentId={56} content={contents?.[56]} />

                <WhyItem contentId={57} content={contents?.[57]} />

                <WhyItem contentId={58} content={contents?.[58]} />

                <WhyItem contentId={59} content={contents?.[59]} />
              </CContainer>

              <EditableContentContainer contentId={30} content={contents?.[30]}>
                <P>{contents?.[60]}</P>
              </EditableContentContainer>
            </CContainer>
          </Stack>
        </CContainer>

        <EmbedLink contents={contents} />

        <JobVacancy contents={contents} />
      </Container>
    </CContainer>
  );
};

export default CareerPage;
