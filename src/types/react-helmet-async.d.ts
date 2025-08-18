declare module "react-helmet-async" {
  import * as React from "react";
  import { HelmetProps } from "react-helmet";

  export class Helmet extends React.Component<HelmetProps> {}
  export const HelmetProvider: React.ComponentType<{
    children?: React.ReactNode;
  }>;
}
