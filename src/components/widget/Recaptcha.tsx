import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const VITE_RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

interface Props {
  onChange: (value: string | null) => void;
}

const Recaptcha = (props: Props) => {
  // Props
  const { onChange } = props;

  // Refs
  const recaptchaRef = React.createRef<ReCAPTCHA>();

  return (
    <div>
      <ReCAPTCHA
        sitekey={VITE_RECAPTCHA_SITE_KEY}
        onChange={onChange}
        ref={recaptchaRef}
      />
    </div>
  );
};

export default Recaptcha;
