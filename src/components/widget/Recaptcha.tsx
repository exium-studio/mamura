import { GoogleReCaptcha } from "react-google-recaptcha-v3";

interface Props {
  onChange: (value: string | null) => void;
}

const Recaptcha = ({ onChange }: Props) => {
  return (
    <GoogleReCaptcha
      onVerify={(token: string) => {
        onChange(token);
      }}
    />
  );
};

export default Recaptcha;
