import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { HelmetProvider } from "react-helmet-async";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const VITE_RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    {/* <StrictMode> */}
    <GoogleReCaptchaProvider reCaptchaKey={VITE_RECAPTCHA_SITE_KEY}>
      <HelmetProvider>
        <Provider>
          <App />
        </Provider>
      </HelmetProvider>
    </GoogleReCaptchaProvider>
    {/* </StrictMode> */}
  </>
);
