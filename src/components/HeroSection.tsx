import HexProfileFrame from "@/components/HexProfileFrame";
import profileImg from "@/assets/images/profile.jpg";

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="flex items-center justify-center min-h-screen px-8 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 max-w-7xl">
          {/* Text content */}
          <div className="flex flex-col items-start gap-10 text-text-1">
            <div className="flex flex-col gap-2">
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl leading-tight tracking-wide">
                Jacob Brown
              </h1>
              <p className="font-heading font-medium text-xl md:text-2xl lg:text-4xl leading-snug">
                DevOps Engineer &
                <br />
                Full-Stack Developer
              </p>
            </div>
            <div className="flex justify-center w-full">
              <a
                href="#about"
                className="bg-tan-neutral border-4 border-blue-medium-1 rounded-full px-6 py-2 shadow-md
                           font-sans font-semibold text-text-1 text-xl md:text-2xl tracking-wider
                           hover:shadow-lg transition-shadow"
              >
                About Me
              </a>
            </div>
          </div>

          {/* Profile picture hex frame */}
          <HexProfileFrame
            src={profileImg}
            alt="Jacob Brown"
            className="shrink-0 w-80 h-80 md:w-112 md:h-112 lg:w-144 lg:h-144"
          />
        </div>
      </div>
    </section>
  )
}
