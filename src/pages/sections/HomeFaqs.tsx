import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import Heading2 from "@/components/ui-custom/Heading2";
import P from "@/components/ui-custom/P";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import Container from "@/components/widget/Container";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import { HStack, Icon, Stack } from "@chakra-ui/react";
import { IconBrandWhatsappFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const FaqItem = (props: any) => {
  // Props
  const { faq } = props;

  return (
    <AccordionItem
      value={faq?.question}
      bg={"d1"}
      px={4}
      borderRadius={8}
      border={"1px solid"}
      borderColor={"border.muted"}
    >
      <AccordionItemTrigger>
        <HStack>
          <P fontWeight={"bold"} fontSize={16}>
            {faq?.question}
          </P>
        </HStack>
      </AccordionItemTrigger>

      <AccordionItemContent>
        <P>{faq?.answer}</P>
      </AccordionItemContent>
    </AccordionItem>
  );
};

const HomeFaqs = (props: any) => {
  // Props
  const { contents, faqs } = props;

  return (
    <CContainer py={["32px", null, "80px"]}>
      <Container>
        <Stack flexDir={["column", null, "row"]} gap={8}>
          <CContainer w={["full", null, "40%"]} gap={4}>
            <EditableContentContainer contentId={38} content={contents?.[38]}>
              <Heading2 fontSize={"3xl"} fontWeight={"bold"} maxW={"300px"}>
                {contents?.[38]}
              </Heading2>
            </EditableContentContainer>

            <EditableContentContainer contentId={39} content={contents?.[39]}>
              <P>{contents?.[39]}</P>
            </EditableContentContainer>

            <EditableContentContainer contentId={36} content={contents?.[36]}>
              <Link to={contents?.[36]} target="_blank">
                <BButton colorPalette={"green"}>
                  <Icon>
                    <IconBrandWhatsappFilled />
                  </Icon>
                  Hubungi Tim Kami
                </BButton>
              </Link>
            </EditableContentContainer>
          </CContainer>

          <CContainer w={["full", null, "60%"]}>
            <AccordionRoot multiple>
              <CContainer gap={4}>
                {faqs?.map((faq: any) => {
                  return <FaqItem key={faq.id} faq={faq} />;
                })}
              </CContainer>
            </AccordionRoot>
          </CContainer>
        </Stack>
      </Container>
    </CContainer>
  );
};

export default HomeFaqs;
