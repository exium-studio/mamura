import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type Opts = {
  paramName?: string;
  ready?: boolean;
  behavior?: ScrollBehavior;
  offsetY?: number;
  clearParamAfter?: boolean;
  maxTries?: number;
  interval?: number;
};

export default function useHashlinkScroll({
  paramName = "hashlink",
  ready = true,
  behavior = "smooth",
  offsetY = 0,
  clearParamAfter = false,
  maxTries = 50,
  interval = 50,
}: Opts = {}) {
  const [sp, setSp] = useSearchParams();
  const id = sp.get(paramName);

  useEffect(() => {
    if (!ready || !id) return;
    let tries = 0;
    let stop = false;

    const attempt = () => {
      if (stop) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior, block: "start" });
        if (offsetY) setTimeout(() => window.scrollBy({ top: offsetY }), 50);
        if (clearParamAfter) {
          const next = new URLSearchParams(sp);
          next.delete(paramName);
          setSp(next, { replace: true });
        }
      } else if (tries++ < maxTries) {
        setTimeout(attempt, interval);
      }
    };

    attempt();
    return () => {
      stop = true;
    };
  }, [id, ready]);
}
