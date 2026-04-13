import hexBase from '@/assets/images/TechLogos/hex-base.svg'

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

          {/* Profile picture hex */}
          <div className="relative w-72 h-80 md:w-96 md:h-112 lg:w-112 lg:h-128 shrink-0">
            {/* Outer decorative hex (rotated, behind) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={hexBase}
                alt=""
                aria-hidden="true"
                className="w-[110%] h-[110%] object-contain rotate-30 opacity-60"
              />
            </div>
            {/* Inner hex with profile photo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <div className="w-full h-full bg-blue-medium-1/20 flex items-center justify-center">
                  <img
                    src={hexBase}
                    alt="Jacob Brown profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
