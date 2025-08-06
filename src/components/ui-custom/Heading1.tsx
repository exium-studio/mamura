import { Heading, HeadingProps } from "@chakra-ui/react";

interface Props extends HeadingProps {
  children?: any;
}

export default function Heading1({ children, ...props }: Props) {
  return (
    <Heading
      as={"h1"}
      fontSize={[38, null, 52]}
      fontWeight={"normal"}
      {...props}
    >
      {children}
    </Heading>
  );
}
