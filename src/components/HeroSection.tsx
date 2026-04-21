import HexProfileFrame from "@/components/HexProfileFrame";
import profileImg from "@/assets/images/profile.jpg";

function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");
  if (href) document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ height: 'calc(100svh - var(--nav-h, 80px))' }}
    >
      <div
        className="flex items-center justify-center h-full py-16 md:py-24
                      max-w-screen-2xl mx-auto
                      px-8 md:px-16"
      >
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-16 w-full justify-center">
          {/* Profile picture hex frame — shown first on mobile */}
          <HexProfileFrame
            src={profileImg}
            alt="Jacob Brown"
            className="shrink-0 w-72 h-72 sm:w-96 sm:h-96 md:w-128 md:h-128 lg:w-160 lg:h-160 lg:order-2"
          />

          {/* Text content */}
          <div className="flex flex-col items-center text-center gap-6 sm:gap-8 text-text-1 lg:order-1">
            <div className="flex flex-col gap-2 sm:gap-3">
              <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-8xl leading-tight tracking-wide">
                Jacob Brown
              </h1>
              <p className="font-heading font-medium text-xl sm:text-2xl md:text-3xl lg:text-5xl leading-snug">
                DevOps Engineer &
                <br />
                Full-Stack Developer
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="#about"
                onClick={smoothScroll}
                className="bg-transparent border-2 border-text-1 rounded-full px-8 py-3 shadow-md
                         font-sans font-semibold text-text-1 text-lg md:text-xl tracking-wider
                         hover:bg-text-1 hover:text-cream-neutral hover:shadow-xl hover:scale-105
                         active:scale-95
                         transition-all duration-300 ease-out"
              >
                About Me
              </a>
              <a
                href="#contact"
                onClick={smoothScroll}
                className="bg-transparent border-2 border-text-1 rounded-full px-8 py-3 shadow-md
                         font-sans font-semibold text-text-1 text-lg md:text-xl tracking-wider
                         hover:bg-text-1 hover:text-cream-neutral hover:shadow-xl hover:scale-105
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
