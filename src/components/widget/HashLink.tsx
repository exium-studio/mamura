import scrollToView from "@/utils/scrollToView";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import CContainer from "../ui-custom/CContainer";
import NavLink from "../ui-custom/NavLink";

const HashLink = (props: any) => {
  // Props
  const { children, id, path, callback, onBeforeScroll, delay, ...restProps } =
    props;

  // Hooks
  const location = useLocation();
  const currentPath = location.pathname;

  const hasNavigated = useRef(false);

  // scrollToView if just navigated and current path is target
  useEffect(() => {
    if (hasNavigated.current && currentPath === path) {
      stv();
      hasNavigated.current = false;
    }
  }, [currentPath, id, path]);

  // States
  const active = currentPath === path;

  // Utils
  function stv() {
    onBeforeScroll?.();
    setTimeout(() => {
      scrollToView(id, {
        offsetY: -16,
        // callback,
      });
    }, delay);
  }

  return (
    <>
      {active ? (
        <CContainer onClick={stv} {...restProps}>
          {children}
        </CContainer>
      ) : (
        <NavLink
          onClick={() => {
            hasNavigated.current = true;
          }}
          {...restProps}
        >
          {children}
        </NavLink>
      )}
    </>
  );
};

export default HashLink;
