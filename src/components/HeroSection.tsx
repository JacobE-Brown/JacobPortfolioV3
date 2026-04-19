export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="flex items-center justify-center min-h-screen px-8 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 max-w-7xl">
          {/* Text content */}
          <div className="flex flex-col items-start gap-10 text-text-1">
            <div className="flex flex-col gap-2">
              <h1 className="font-serif font-bold text-5xl md:text-7xl lg:text-9xl leading-tight">
                Jacob Brown
              </h1>
              <p className="font-serif font-normal text-3xl md:text-4xl lg:text-7xl leading-snug">
                DevOps Engineer & Full-Stack Developer
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
          <div className="relative shrink-0 w-72 h-72 md:w-96 md:h-96 lg:w-112 lg:h-112">
            {/* Outer navy hex ring (behind photo) */}
            <svg
              viewBox="0 0 220 220"
              className="absolute inset-0 w-full h-full"
              fill="none"
              aria-hidden="true"
            >
              <polygon
                points="160,23 210,110 160,197 60,197 10,110 60,23"
                stroke="#002A58"
                strokeWidth="8"
              />
            </svg>

            {/* Profile photo clipped to flat-top hex shape */}
            <div
              className="absolute inset-0 bg-blue-neutral overflow-hidden"
              style={{ clipPath: 'polygon(69% 17%, 88% 50%, 69% 83%, 31% 83%, 12% 50%, 31% 17%)' }}
            >
              {/* TODO: Replace src with your profile photo path */}
              <img
                src=""
                alt="Jacob Brown"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Inner teal hex ring (overlaid on photo edge) */}
            <svg
              viewBox="0 0 220 220"
              className="absolute inset-0 w-full h-full pointer-events-none"
              fill="none"
              aria-hidden="true"
            >
              <polygon
                points="155,32 200,110 155,188 65,188 20,110 65,32"
                stroke="#54BAB9"
                strokeWidth="10"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
