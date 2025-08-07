import ChangePasswordDisclosure from "./ChangePasswordDisclosure";
import OfflineDisclosure from "./OfflineDisclosure";
// import ToasterDetailDisclosure from "./ToasterDetailDisclosure";

const GlobalDisclosure = () => {
  return (
    <>
      <OfflineDisclosure />

      <ChangePasswordDisclosure />

      {/* <ToasterDetailDisclosure /> */}
    </>
  );
};

export default GlobalDisclosure;
