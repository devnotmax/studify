import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logo from "../assets/logo.mp4";
import logo2 from "../assets/logo.svg";

const LOADING_TIME = 8000;

const Loader: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrada del loader
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    );

    let start: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const percent = Math.min((elapsed / LOADING_TIME) * 100, 100);
      setProgress(percent);
      if (percent < 100) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Salida del loader
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: onFinish,
        });
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
    >
      <div ref={logoRef} className="flex z-10 flex-col justify-center items-center w-full h-full">
        <img src={logo2} alt="logo" className="w-64 h-64 mb-4" />
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden shadow mt-2">
          <div
            className="h-full bg-primaryDark transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="mt-6 text-secondaryText text-md font-light select-none">
          loading content...
        </span>
      </div>
      <video src={logo} autoPlay loop muted className="w-32 h-32 justify-center items-center absolute bottom-0 opacity-50" />
    </div>
  );
};

export default Loader;
