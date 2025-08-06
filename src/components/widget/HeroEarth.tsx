import { useEffect, useRef } from "react";
import "../../assets/css/heroEarth.css";

export default function HeroEarth() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    (window as any).__earth_canvas__ = canvasRef.current;

    const script = document.createElement("script");
    script.src = "/assets/js/heroEarth.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete (window as any).__earth_canvas__;
    };
  }, []);

  return <canvas id="earth" ref={canvasRef} className="earth-canvas" />;
}
