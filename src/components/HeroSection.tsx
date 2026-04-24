import { useState, useEffect } from "react";
import HexProfileFrame from "@/components/HexProfileFrame";
import profileImg from "@/assets/images/profile.jpg";

function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");
  if (href) document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  // On mobile browsers, lock hero height on mount to prevent layout shifts
  // when browser chrome (bottom toolbar) appears/disappears during scroll
  const [fixedHeight, setFixedHeight] = useState<string | null>(null);

  useEffect(() => {
    const lock = () => {
      if (window.innerWidth < 1024) {
        setFixedHeight(`${window.innerHeight}px`);
      } else {
        setFixedHeight(null);
      }
    };
    lock();

    // Re-lock on orientation change (not on scroll-triggered resizes)
    const onOrientation = () => setTimeout(lock, 150);
    window.addEventListener("orientationchange", onOrientation);

    // Handle crossing the lg breakpoint
    const mql = window.matchMedia("(min-width: 1024px)");
    mql.addEventListener("change", lock);

    return () => {
      window.removeEventListener("orientationchange", onOrientation);
      mql.removeEventListener("change", lock);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ height: fixedHeight ?? 'calc(100svh - var(--nav-h, 80px))' }}
    >
      <div
        className="flex items-center justify-center h-full py-8 sm:py-16 md:py-24
                      max-lg:landscape:py-4
                      max-w-screen-2xl mx-auto
                      px-6 sm:px-8 md:px-16"
      >
        <div className="flex flex-col max-lg:landscape:flex-row lg:flex-row
                        items-center gap-6 sm:gap-10 lg:gap-16
                        max-lg:landscape:gap-8
                        w-full justify-center">
          {/* Profile picture hex frame — shown first on mobile portrait */}
          <HexProfileFrame
            src={profileImg}
            alt="Jacob Brown"
            className="shrink-0
                       w-52 h-52 sm:w-96 sm:h-96 md:w-128 md:h-128 lg:w-160 lg:h-160
                       max-sm:landscape:w-40 max-sm:landscape:h-40
                       max-md:landscape:w-52 max-md:landscape:h-52
                       max-lg:landscape:w-72 max-lg:landscape:h-72
                       lg:order-2 max-lg:landscape:order-2"
          />

          {/* Text content */}
          <div className="flex flex-col items-center text-center gap-6 sm:gap-8
                          max-lg:landscape:gap-3
                          text-text-1 lg:order-1 max-lg:landscape:order-1">
            <div className="flex flex-col gap-2 sm:gap-3 max-lg:landscape:gap-1">
              <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-8xl
                             max-sm:landscape:text-3xl max-lg:landscape:text-5xl
                             leading-tight tracking-wide">
                Jacob Brown
                <span className="sr-only"> — DevOps Engineer and Full-Stack Developer based in Boise, Idaho. Specializing in Kubernetes, Azure, AWS, Docker, CI/CD, Prometheus, Grafana, React, TypeScript, Python, and .NET Core. Currently working at Netacent operating production cloud infrastructure.</span>
              </h1>
              <p className="font-heading font-medium text-xl sm:text-2xl md:text-3xl lg:text-5xl
                            max-sm:landscape:text-base max-lg:landscape:text-xl
                            leading-snug">
                DevOps Engineer &
                <br />
                Full-Stack Developer
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#about"
                onClick={smoothScroll}
                className="bg-transparent ring-2 ring-text-1 rounded-full
                         px-8 py-3 max-lg:landscape:px-6 max-lg:landscape:py-2
                         shadow-md will-change-transform
                         font-sans font-semibold text-text-1 text-lg md:text-xl
                         max-lg:landscape:text-sm tracking-wider
                         hover:bg-text-1 hover:text-cream-neutral hover:ring-text-1 hover:shadow-xl hover:scale-105
                         active:scale-95
                         transition-all duration-300 ease-out"
              >
                About Me
              </a>
              <a
                href="#contact"
                onClick={smoothScroll}
                className="bg-transparent ring-2 ring-text-1 rounded-full
                         px-8 py-3 max-lg:landscape:px-6 max-lg:landscape:py-2
                         shadow-md will-change-transform
                         font-sans font-semibold text-text-1 text-lg md:text-xl
                         max-lg:landscape:text-sm tracking-wider
                         hover:bg-text-1 hover:text-cream-neutral hover:ring-text-1 hover:shadow-xl hover:scale-105
                         active:scale-95
                         transition-all duration-300 ease-out"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
