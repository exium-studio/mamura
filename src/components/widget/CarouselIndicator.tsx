import { Box, HStack, StackProps } from "@chakra-ui/react";

interface Props extends StackProps {
  length: number;
  activeIndex?: number;
  setActiveIndex?: (index: number) => void;
  activeIndicatorColor?: string;
}
const CarouselIndicator = (props: Props) => {
  // Props
  const {
    length,
    activeIndex,
    setActiveIndex,
    activeIndicatorColor,
    ...restProps
  } = props;

  return (
    <HStack justify={"center"} p={"2px"} borderRadius={"full"} {...restProps}>
      {Array.from({ length: length }).map((_, i) => {
        const active = i === activeIndex;

        return (
          <Box
            key={i}
            w={active ? "40px" : "10px"}
            h={"10px"}
            borderRadius={"full"}
            flexShrink={0}
            bg={active ? activeIndicatorColor || "p.500" : "p.100"}
            // onClick={() => {
            //   setActiveIndex?.(i);
            // }}
            transition={"200ms"}
          />
        );
      })}
    </HStack>
  );
};

export default CarouselIndicator;
