import { ImageProps } from "@chakra-ui/react";
import Img from "../ui-custom/Img";

interface Props extends ImageProps {
  type?: string;
}

const MamuraLogo = (props: Props) => {
  const { type = "color", ...restProps } = props;

  return (
    <>
      {type === "color" && (
        <Img src={`/logo_color.png`} h={"32px"} {...restProps} />
      )}

      {type === "light" && (
        <Img src="/logo_light.png" h={"32px"} {...restProps} />
      )}
    </>
  );
};

export default MamuraLogo;
