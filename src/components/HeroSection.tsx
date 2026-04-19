import HexProfileFrame from "@/components/HexProfileFrame";
import profileImg from "@/assets/images/profile.jpg";

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden min-h-[calc(100svh-5rem)]">
      <div className="flex items-center justify-center h-full min-h-[inherit] py-16 md:py-24
                      max-w-screen-2xl mx-auto
                      px-8 md:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full justify-center">
          {/* Text content */}
          <div className="flex flex-col items-center text-center gap-8 text-text-1">
            <div className="flex flex-col gap-3">
              <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-8xl leading-tight tracking-wide">
                Jacob Brown
              </h1>
              <p className="font-heading font-medium text-2xl md:text-3xl lg:text-5xl leading-snug">
                DevOps Engineer &
                <br />
                Full-Stack Developer
              </p>
            </div>
            <a
              href="#about"
              className="bg-tan-neutral border-4 border-blue-medium-1 rounded-full px-8 py-3 shadow-md
                         font-sans font-semibold text-text-1 text-lg md:text-xl tracking-wider
                         hover:shadow-lg transition-shadow"
            >
              About Me
            </a>
          </div>

          {/* Profile picture hex frame */}
          <HexProfileFrame
            src={profileImg}
            alt="Jacob Brown"
            className="shrink-0 w-96 h-96 md:w-128 md:h-128 lg:w-160 lg:h-160"
          />
        </div>
      </div>
    </section>
  )
}
