import useIsSmScreenWidth from "@/hooks/useIsSmScreenWidth";
import useScreen from "@/hooks/useScreen";
import { HStack, Icon, StackProps } from "@chakra-ui/react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { RefObject, useEffect, useRef, useState } from "react";
import BButton, { BButtonProps } from "../ui-custom/BButton";
import CContainer from "../ui-custom/CContainer";
import CarouselIndicator from "./CarouselIndicator";

interface Props extends StackProps {
  carouselContainerRef?: RefObject<HTMLDivElement | null>;
  prevOnClick?: () => void;
  nextOnClick?: () => void;
  showIndicator?: boolean;
  dataLength?: number;
  buttonProps?: BButtonProps;
  carouselIndicatorProps?: StackProps;
  activeIndicatorColor?: string;
  itemFullWidth?: boolean;
}

const CarouselControl = (props: Props) => {
  // Props
  const {
    carouselContainerRef,
    prevOnClick,
    nextOnClick,
    showIndicator = true,
    dataLength = 1,
    color,
    buttonProps,
    carouselIndicatorProps,
    activeIndicatorColor,
    itemFullWidth = true,
    ...restProps
  } = props;

  // Hooks
  const iss = useIsSmScreenWidth();

  // States, Refs
  const [activeIndex, setActiveIndex] = useState(0);
  const itemWidthRef = useRef<number | null>(null);

  // Utils
  const { sw } = useScreen();
  function handlePrev() {
    if (carouselContainerRef?.current && itemWidthRef.current) {
      carouselContainerRef.current.scrollBy({
        left: -itemWidthRef.current / 2,
        behavior: "smooth",
      });
    }
    prevOnClick?.();
  }
  function handleNext() {
    if (carouselContainerRef?.current && itemWidthRef.current) {
      carouselContainerRef.current.scrollBy({
        left: itemWidthRef.current / 2,
        behavior: "smooth",
      });
    }
    nextOnClick?.();
  }

  useEffect(() => {
    const container = carouselContainerRef?.current;
    if (!container || !dataLength) return;

    const totalWidth = container.scrollWidth;
    const widthPerItem = totalWidth / dataLength;
    itemWidthRef.current = widthPerItem;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const prefix = itemFullWidth || iss ? 0 : totalWidth / dataLength;
      const index = Math.round((scrollLeft + prefix) / widthPerItem);

      if (scrollLeft === 0) {
        setActiveIndex(0);
      } else {
        setActiveIndex(index);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [carouselContainerRef, dataLength, sw, activeIndex]);

  return (
    <HStack px={5} gap={showIndicator ? 4 : 2} {...restProps}>
      <BButton
        iconButton
        // colorPalette={"p"}
        borderRadius="full"
        variant="ghost"
        onClick={handlePrev}
        {...buttonProps}
      >
        <Icon>
          <IconArrowLeft />
        </Icon>
      </BButton>

      {showIndicator && dataLength && (
        <CContainer
          w={`${10 * (dataLength - 1) + 8 * (dataLength - 1) + 32}px`}
        >
          <CarouselIndicator
            length={dataLength}
            activeIndicatorColor={activeIndicatorColor}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            {...carouselIndicatorProps}
          />
        </CContainer>
      )}

      <BButton
        iconButton
        // colorPalette={"p"}
        borderRadius="full"
        variant="ghost"
        onClick={handleNext}
        {...buttonProps}
      >
        <Icon>
          <IconArrowRight />
        </Icon>
      </BButton>
    </HStack>
  );
};

export default CarouselControl;
