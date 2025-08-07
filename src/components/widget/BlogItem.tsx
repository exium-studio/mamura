import CContainer from "@/components/ui-custom/CContainer";
import { Interface__Blog } from "@/constants/interfaces";
import formatCount from "@/utils/formatCount";
import formatDate from "@/utils/formatDate";
import { Badge, HStack, Icon, StackProps } from "@chakra-ui/react";
import { IconEye, IconShare } from "@tabler/icons-react";
import BButton from "../ui-custom/BButton";
import Img from "../ui-custom/Img";
import P from "../ui-custom/P";
import { Link } from "react-router-dom";

interface Props extends StackProps {
  blog: Interface__Blog;
}

const BlogItem = (props: Props) => {
  // Props
  const { blog, ...restProps } = props;

  return (
    <Link to={`/blog/${blog?.slug}`}>
      <CContainer
        bg={"p.50"}
        borderRadius={16}
        overflow={"clip"}
        cursor={"pointer"}
        {...restProps}
      >
        <Img
          key={blog?.thumbnail?.file_url}
          src={blog?.thumbnail?.file_url}
          alt={blog?.title}
          borderRadius={16}
        />

        <CContainer p={5} gap={4}>
          <HStack justify={"space-between"}>
            <Badge colorPalette={"orange"} p={2} px={4} borderRadius={"full"}>
              News
            </Badge>

            <P>{`${formatDate(blog?.updated_at)}`}</P>
          </HStack>

          <P fontSize={"lg"} fontWeight={"bold"} lineClamp={2}>
            {blog?.title}
          </P>

          <P color={"fg.muted"} lineClamp={2}>
            {blog?.description}
          </P>

          <HStack wrap={"wrap"} gapX={4}>
            <HStack>
              <Icon boxSize={"18px"}>
                <IconEye stroke={1.5} />
              </Icon>
              <P color={"fg.muted"}>{`${formatCount(blog?.views)} Likes`}</P>
            </HStack>

            <BButton size={"xs"} variant={"ghost"} fontWeight={"normal"}>
              <Icon boxSize={4}>
                <IconShare stroke={1.5} />
              </Icon>
              Share
            </BButton>
          </HStack>
        </CContainer>
      </CContainer>
    </Link>
  );
};

export default BlogItem;
