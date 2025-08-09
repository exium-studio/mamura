import { MouseEvent, ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NavLink from "../ui-custom/NavLink";
import CContainer from "../ui-custom/CContainer";
import { StackProps } from "@chakra-ui/react";

interface HashLinkProps extends StackProps {
  to: string;
  children: ReactNode;
  onBeforeScroll?: () => void; // boleh history.back()
  delay?: number;
  offsetY?: number;
  behavior?: ScrollBehavior;
  paramName?: string; // default 'hashlink' atau pakai #id
}

export default function HashLink({
  to,
  children,
  onBeforeScroll,
  delay = 0,
  offsetY = 0,
  behavior = "smooth",
  paramName = "hashlink",
  ...restProps
}: HashLinkProps) {
  const { pathname } = useLocation();
  const url = new URL(to, window.location.origin);
  const targetPath = url.pathname;

  const timers = useRef<number[]>([]);
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    },
    []
  );

  if (pathname !== targetPath) {
    return (
      <NavLink to={to} {...restProps}>
        {children}
      </NavLink>
    );
  }

  const getTargetId = () =>
    url.searchParams.get(paramName) || (url.hash ? url.hash.slice(1) : "");

  const scrollWithRetry = (id: string) => {
    const run = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior, block: "start" });
        if (offsetY) {
          const t = window.setTimeout(
            () => window.scrollBy({ top: offsetY, behavior: "auto" }),
            50
          );
          timers.current.push(t);
        }
      } else {
        let i = 0;
        const max = 60,
          iv = 50;
        const tick = () => {
          const node = document.getElementById(id);
          if (node) {
            node.scrollIntoView({ behavior, block: "start" });
            if (offsetY) {
              const t2 = window.setTimeout(
                () => window.scrollBy({ top: offsetY, behavior: "auto" }),
                50
              );
              timers.current.push(t2);
            }
          } else if (i++ < max) {
            const t3 = window.setTimeout(tick, iv);
            timers.current.push(t3);
          }
        };
        tick();
      }
    };

    if (delay > 0) {
      const t = window.setTimeout(() => requestAnimationFrame(run), delay);
      timers.current.push(t);
    } else {
      requestAnimationFrame(run);
    }
  };

  const handleSamePathClick = (e: MouseEvent) => {
    e.preventDefault();

    const id = getTargetId();
    if (!id) return;

    const prevPath = window.location.pathname;

    try {
      onBeforeScroll?.();
    } catch {
      /* ignore */
    }

    // beri 1 tick untuk mendeteksi navigasi dari onBeforeScroll (history.back, dsb)
    const t0 = window.setTimeout(() => {
      // jika path berubah → abort (biar halaman tujuan yang urus scroll)
      if (window.location.pathname !== prevPath) return;

      // safety check lagi setelah delay
      const t1 = window.setTimeout(() => {
        if (window.location.pathname !== prevPath) return;
        scrollWithRetry(id);
      }, Math.max(0, delay ? 0 : 0)); // delay sudah di-handle di scrollWithRetry

      timers.current.push(t1);
    }, 0);

    timers.current.push(t0);
  };

  return (
    <CContainer onClick={handleSamePathClick} {...restProps}>
      {children}
    </CContainer>
  );
}
