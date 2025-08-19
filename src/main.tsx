import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    {/* <StrictMode> */}
    <HelmetProvider>
      <Provider>
        <App />
      </Provider>
    </HelmetProvider>
    {/* </StrictMode> */}
  </>
);
