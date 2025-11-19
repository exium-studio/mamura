import LPContainer from "@/components/widget/LPContainer";
import { LP_ROUTES } from "@/constants/routes";
import MaintenancePage from "@/pages/_error/MaintenancePage";
import MissingPage from "@/pages/_error/MissingPage";
import ServerErrorPage from "@/pages/_error/ServerErrorPage";
import { Route, Routes } from "react-router-dom";

const Routing = () => {
  return (
    <Routes>
      {LP_ROUTES.map(({ path, activePath, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <LPContainer path={path} activePath={activePath}>
              {element}
            </LPContainer>
          }
        />
      ))}

      <Route path="*" element={<MissingPage />} />
      <Route path="/server-error" element={<ServerErrorPage />} />
      <Route path="/maintenance" element={<MaintenancePage />} />
    </Routes>
  );
};

export default Routing;
