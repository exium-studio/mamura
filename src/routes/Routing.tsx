import LPContainer from "@/components/widget/LPContainer";
import MasterDataNavsContainer from "@/components/widget/MasterDataNavsContainer";
import NavsContainer from "@/components/widget/NavsContainer";
import {
  ADMIN_PRIVATE_ROUTES,
  ADMIN_ROUTES,
  LP_ROUTES,
  MASTER_DATA_ROUTES,
} from "@/constants/routes";
import useLang from "@/context/useLang";
import MaintenancePage from "@/pages/_error/MaintenancePage";
import MissingPage from "@/pages/_error/MissingPage";
import ServerErrorPage from "@/pages/_error/ServerErrorPage";
import pluck from "@/utils/pluck";
import { Route, Routes } from "react-router-dom";
import AuthMiddleware from "./AuthMiddleware";

const Routing = () => {
  // Hooks
  const { l } = useLang();

  return (
    <Routes>
      {LP_ROUTES.map(({ path, activePath, element }) => (
        <Route
          key={path}
          path={path}
          element={<LPContainer activePath={activePath}>{element}</LPContainer>}
        />
      ))}

      {ADMIN_ROUTES.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {ADMIN_PRIVATE_ROUTES.map(
        ({
          path,
          activePath,
          backPath,
          allowedPermissions,
          titleKey,
          element,
        }) => (
          <Route
            key={path}
            path={path}
            element={
              <AuthMiddleware allowedPermissions={allowedPermissions}>
                <NavsContainer
                  activePath={activePath}
                  title={pluck(l, titleKey)}
                  backPath={backPath}
                >
                  {element}
                </NavsContainer>
              </AuthMiddleware>
            }
          />
        )
      )}

      {MASTER_DATA_ROUTES.map(
        ({
          path,
          activePath,
          backPath,
          allowedPermissions,
          titleKey,
          element,
        }) => (
          <Route
            key={path}
            path={path}
            element={
              <AuthMiddleware allowedPermissions={allowedPermissions}>
                <NavsContainer
                  activePath={activePath}
                  title={pluck(l, titleKey)}
                  backPath={backPath}
                >
                  <MasterDataNavsContainer align={"stretch"} activePath={path}>
                    {element}
                  </MasterDataNavsContainer>
                </NavsContainer>
              </AuthMiddleware>
            }
          />
        )
      )}

      <Route path="*" element={<MissingPage />} />
      <Route path="/server-error" element={<ServerErrorPage />} />
      <Route path="/maintenance" element={<MaintenancePage />} />
    </Routes>
  );
};

export default Routing;
