/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}
