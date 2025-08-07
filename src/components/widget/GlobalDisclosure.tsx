import ChangePasswordDisclosure from "./ChangePasswordDisclosure";
import LocationDisclosure from "./LocationDisclosure";
import OfflineDisclosure from "./OfflineDisclosure";
// import ToasterDetailDisclosure from "./ToasterDetailDisclosure";

const GlobalDisclosure = () => {
  return (
    <>
      <OfflineDisclosure />

      <ChangePasswordDisclosure />

      <LocationDisclosure />

      {/* <ToasterDetailDisclosure /> */}
    </>
  );
};

export default GlobalDisclosure;
