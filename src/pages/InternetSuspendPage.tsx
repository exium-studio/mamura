import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import Heading2 from "@/components/ui-custom/Heading2";
import Img from "@/components/ui-custom/Img";
import P from "@/components/ui-custom/P";
import Container from "@/components/widget/Container";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import {
  Circle,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  IconBrandFacebookFilled,
  IconBrandInstagramFilled,
  IconBrandWhatsappFilled,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <Container position={"fixed"} top={0} p={4} zIndex={2}>
      <HStack justify={"space-between"}>
        <CContainer bg={"body"} p={3} rounded={"lg"} w={"fit"}>
          <Link to={"/"}>
            <Img src={`/logo_color.png`} h={"40px"} w={"fit"} />
          </Link>
        </CContainer>

        <Link to={"/"}>
          <Img src={`${IMAGES_PATH}/tagline.png`} h={"50px"} w={"fit"} />
        </Link>
      </HStack>
    </Container>
  );
};
const Hero = (props: any) => {
  // Props
  const { l, contents, ...restProps } = props;

  return (
    <CContainer
      minH={"100dvh"}
      pos={"relative"}
      overflow={"clip"}
      {...restProps}
    >
      <Image
        src={contents?.[86]}
        pos={"absolute"}
        w={"full"}
        h={"full"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
      />

      <CContainer bg={"blackAlpha.800"} flex={1} zIndex={0}>
        <Container
          py={"80px"}
          color={"white"}
          justify={"center"}
          align={"center"}
          flex={1}
          gap={4}
        >
          <EditableContentContainer
            contentId={69}
            content={contents?.[69]}
            w={"full"}
          >
            <Text
              textAlign={"center"}
              fontWeight={"bold"}
              fontSize={"48px"}
              maxW={"600px"}
              lineHeight={1.2}
              mx={"auto"}
            >
              {contents?.[69]}
            </Text>
          </EditableContentContainer>

          <CContainer gap={4} maxW={"600px"} mx={"auto"} align={"center"}>
            <EditableContentContainer
              contentId={70}
              content={contents?.[70]}
              w={"full"}
            >
              <Text fontSize={"md"} textAlign={"center"}>
                {contents?.[70]}
              </Text>
            </EditableContentContainer>

            <EditableContentContainer
              contentId={71}
              content={contents?.[71]}
              w={"full"}
            >
              <Text fontSize={"md"} textAlign={"center"}>
                {contents?.[71]}
              </Text>
            </EditableContentContainer>

            <BButton w={"140px"} size={"xl"} colorPalette={"p"}>
              {l.why}
            </BButton>
          </CContainer>
        </Container>
      </CContainer>
    </CContainer>
  );
};
const Why = (props: any) => {
  // Props
  const { l, contents, ...restProps } = props;

  return (
    <Container py={"80px"} {...restProps}>
      <HStack wrap={"wrap"} gapX={"50px"}>
        <EditableContentContainer
          contentId={88}
          content={contents?.[88]}
          fileInput
          flex={1}
        >
          <Circle bg={"body"} p={4} border={"1px solid"} borderColor={"d3"}>
            <Img src={contents?.[88]} />
          </Circle>
        </EditableContentContainer>

        <CContainer flex={2} gap={4}>
          <EditableContentContainer contentId={72} content={contents?.[72]}>
            <Heading2 fontWeight={"bold"}>{contents?.[72]}</Heading2>
          </EditableContentContainer>

          <EditableContentContainer contentId={72} content={contents?.[72]}>
            <P color={"fg.muted"}>{contents?.[73]}</P>
          </EditableContentContainer>
        </CContainer>
      </HStack>
    </Container>
  );
};
const HowToPay = (props: any) => {
  // Props
  const { l, contents, ...restProps } = props;

  // States
  const REGISTRY = [
    {
      img: {
        id: 89,
        content: contents?.[89],
      },
      title: {
        id: 76,
        content: contents?.[76],
      },
      desc: {
        id: 77,
        content: contents?.[77],
      },
      learnMoreLink: {
        id: 92,
        content: contents?.[92],
      },
    },
    {
      img: {
        id: 90,
        content: contents?.[90],
      },
      title: {
        id: 78,
        content: contents?.[78],
      },
      desc: {
        id: 79,
        content: contents?.[79],
      },
      learnMoreLink: {
        id: 93,
        content: contents?.[93],
      },
    },
    {
      img: {
        id: 91,
        content: contents?.[91],
      },
      title: {
        id: 80,
        content: contents?.[80],
      },
      desc: {
        id: 81,
        content: contents?.[81],
      },
      learnMoreLink: {
        id: 94,
        content: contents?.[94],
      },
    },
  ];

  // Components
  const Item = (itemProps: any) => {
    // Props
    const { img, title, desc, learnMoreLink, ...restProps } = itemProps;

    return (
      <VStack gap={8} {...restProps}>
        <Circle p={4} border={"1px solid"} borderColor={"d3"}>
          <EditableContentContainer
            contentId={img?.id}
            content={img?.content}
            fileInput
          >
            <Img src={img?.content} />
          </EditableContentContainer>
        </Circle>

        <CContainer gap={4}>
          <EditableContentContainer
            w={"full"}
            contentId={title?.id}
            content={title?.content}
          >
            <P fontSize={"xl"} fontWeight={"semibold"} textAlign={"center"}>
              {title?.content}
            </P>
          </EditableContentContainer>

          <EditableContentContainer
            w={"full"}
            contentId={desc?.id}
            content={desc?.content}
          >
            <P textAlign={"center"} color={"fg.muted"}>
              {desc?.content}
            </P>
          </EditableContentContainer>
        </CContainer>

        <EditableContentContainer
          contentId={learnMoreLink?.id}
          content={learnMoreLink?.content}
        >
          <Link to={learnMoreLink?.content}>
            <BButton colorPalette={"p"}>Lean more</BButton>
          </Link>
        </EditableContentContainer>
      </VStack>
    );
  };

  return (
    <Container py={"80px"} {...restProps}>
      <CContainer gapY={"40px"}>
        <CContainer gap={4}>
          <EditableContentContainer
            contentId={74}
            content={contents?.[74]}
            w={"full"}
          >
            <Heading2 fontWeight={"bold"} textAlign={"center"}>
              {contents?.[74]}
            </Heading2>
          </EditableContentContainer>

          <EditableContentContainer
            contentId={75}
            content={contents?.[75]}
            w={"full"}
          >
            <P textAlign={"center"} color={"fg.subtle"}>
              {contents?.[75]}
            </P>
          </EditableContentContainer>
        </CContainer>

        <SimpleGrid columns={[1, null, 3]} gapX={"40px"} gapY={8}>
          {REGISTRY.map((item, idx) => {
            return (
              <Item
                key={idx}
                img={item.img}
                title={item.title}
                desc={item.desc}
                learnMoreLink={item.learnMoreLink}
              />
            );
          })}
        </SimpleGrid>
      </CContainer>
    </Container>
  );
};
const Footer = (props: any) => {
  // Props
  const { l, contents, ...restProps } = props;

  return (
    <Container py={"80px"} bg={"bg.subtle"} gap={4} {...restProps}>
      <EditableContentContainer
        contentId={82}
        content={contents?.[82]}
        w={"full"}
      >
        <P
          fontSize={"lg"}
          fontWeight={"medium"}
          textAlign={"center"}
          color={"s.500"}
        >
          {contents?.[82]}
        </P>
      </EditableContentContainer>

      <CContainer gap={2}>
        <EditableContentContainer
          contentId={83}
          content={contents?.[83]}
          w={"full"}
        >
          <P textAlign={"center"}>{contents?.[83]}</P>
        </EditableContentContainer>

        <EditableContentContainer
          contentId={84}
          content={contents?.[84]}
          w={"full"}
        >
          <P textAlign={"center"}>{contents?.[84]}</P>
        </EditableContentContainer>

        <EditableContentContainer
          contentId={85}
          content={contents?.[85]}
          w={"full"}
        >
          <P textAlign={"center"}>{contents?.[85]}</P>
        </EditableContentContainer>
      </CContainer>

      <CContainer>
        <HStack wrap={"wrap"} justify={"center"}>
          <EditableContentContainer contentId={46} content={contents?.[46]}>
            <Link to={contents?.[46]} target="_blank">
              <BButton
                iconButton
                colorPalette={"aw"}
                color={"blue.500"}
                size={"lg"}
              >
                <Icon boxSize={6}>
                  <IconBrandFacebookFilled stroke={1.5} />
                </Icon>
              </BButton>
            </Link>
          </EditableContentContainer>

          <EditableContentContainer contentId={47} content={contents?.[47]}>
            <Link to={contents?.[47]} target="_blank">
              <BButton
                iconButton
                colorPalette={"aw"}
                color={"pink.500"}
                size={"lg"}
              >
                <Icon boxSize={6}>
                  <IconBrandInstagramFilled stroke={1.5} />
                </Icon>
              </BButton>
            </Link>
          </EditableContentContainer>

          <EditableContentContainer contentId={45} content={contents?.[45]}>
            <Link to={contents?.[45]} target="_blank">
              <BButton
                iconButton
                colorPalette={"aw"}
                color={"green.500"}
                size={"lg"}
              >
                <Icon boxSize={6}>
                  <IconBrandWhatsappFilled stroke={1.5} />
                </Icon>
              </BButton>
            </Link>
          </EditableContentContainer>
        </HStack>
      </CContainer>
    </Container>
  );
};

const InternetSuspendPage = () => {
  // Contexts
  const { l } = useLang();
  const allContents = useContents((s) => s.data);

  // States
  const contents = allContents?.contents;

  return (
    <CContainer>
      <TopBar />

      <Hero l={l} contents={contents} />
      <Why l={l} contents={contents} />
      <HowToPay l={l} contents={contents} />
      <Footer l={l} contents={contents} />
    </CContainer>
  );
};

export default InternetSuspendPage;
