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
        <Img
          src={`/logo_color.png`}
          h={"24px"}
          alt="Mamura Logo"
          {...restProps}
        />
      )}

      {type === "light" && (
        <Img
          src="/logo_light.png"
          h={"24px"}
          alt="Mamura Logo"
          {...restProps}
        />
      )}
    </>
  );
};

export default MamuraLogo;
