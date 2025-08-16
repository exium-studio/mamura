import CContainer from "@/components/ui-custom/CContainer";
import { Interface__Blog } from "@/constants/interfaces";
import formatCount from "@/utils/formatCount";
import formatDate from "@/utils/formatDate";
import { Badge, HStack, Icon, StackProps } from "@chakra-ui/react";
import { IconEye, IconShare } from "@tabler/icons-react";
import BButton from "../ui-custom/BButton";
import Img from "../ui-custom/Img";
import P from "../ui-custom/P";
import NavLink from "../ui-custom/NavLink";
import { handleShareBlog } from "@/utils/handleShare";

interface Props extends StackProps {
  blog: Interface__Blog;
}

const BlogItem = (props: Props) => {
  // Props
  const { blog, ...restProps } = props;

  return (
    <NavLink to={`/blog/${blog?.slug}`}>
      <CContainer
        bg={"d1"}
        borderRadius={16}
        overflow={"clip"}
        cursor={"pointer"}
        {...restProps}
      >
        <Img
          key={blog?.thumbnail?.file_url}
          src={blog?.thumbnail?.file_url}
          alt={blog?.title}
          aspectRatio={16 / 10}
          borderRadius={16}
        />

        <CContainer p={5} gap={4} flex={1}>
          <HStack justify={"space-between"}>
            <Badge colorPalette={"orange"} p={2} px={4} borderRadius={"full"}>
              {blog?.blog_category?.name}
            </Badge>

            <P>{`${formatDate(blog?.updated_at)}`}</P>
          </HStack>

          <P fontSize={"lg"} fontWeight={"bold"} lineClamp={2}>
            {blog?.title}
          </P>

          <P color={"fg.muted"} lineClamp={2}>
            {blog?.description}
          </P>

          <HStack wrap={"wrap"} gapX={4} mt={"auto"}>
            <HStack>
              <Icon boxSize={"18px"}>
                <IconEye stroke={1.5} />
              </Icon>
              <P color={"fg.muted"}>{`${formatCount(blog?.views)} Dilihat`}</P>
            </HStack>

            <BButton
              size={"xs"}
              variant={"ghost"}
              fontWeight={"normal"}
              onClick={(e) => {
                e.stopPropagation();
                handleShareBlog(blog);
              }}
            >
              <Icon boxSize={4}>
                <IconShare stroke={1.5} />
              </Icon>
              Share
            </BButton>
          </HStack>
        </CContainer>
      </CContainer>
    </NavLink>
  );
};

export default BlogItem;
