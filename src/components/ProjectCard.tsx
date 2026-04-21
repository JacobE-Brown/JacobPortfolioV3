import hexBase from '@/assets/images/TechLogos/hex-base.svg'

interface ProjectCardProps {
  title: string
  projectName?: string
  description: string[]
  reversed?: boolean
  /** Primary (large) hex image src */
  primaryImage?: string
  /** Two small hex image srcs */
  secondaryImages?: [string?, string?]
  /** Tailwind padding class per small hex image (e.g. 'p-4') */
  secondaryImagePaddings?: [string?, string?]
}

// Flat-top hexagon clip path
const HEX_CLIP = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'

function HexGallery({
  reversed,
  projectName,
  primaryImage,
  secondaryImages = [],
  secondaryImagePaddings = [],
}: {
  reversed: boolean
  projectName: string
  primaryImage?: string
  secondaryImages?: [string?, string?]
  secondaryImagePaddings?: [string?, string?]
}) {
  // Mobile: full-width, top+bottom borders only, no rounding
  // Desktop: rounded on inward side, 3-sided border
  const desktopBorderClass = reversed
    ? 'lg:border-r-8'
    : 'lg:border-l-8'

  const roundedClass = reversed
    ? 'rounded-none lg:rounded-r-[4.5rem]'
    : 'rounded-none lg:rounded-l-[4.5rem]'

  // Mobile: gallery always first. Desktop: follows reversed ordering.
  const orderClass = reversed
    ? 'order-first'                        // reversed: gallery first everywhere
    : 'order-first lg:order-2'             // normal: gallery first on mobile, second on desktop

  return (
    <div className={`lg:flex-1 flex items-center justify-center lg:py-16 ${orderClass}`}>
      <div
        className={`bg-text-1 border-blue-medium-1 ${roundedClass}
                    border-t-6 border-b-6 lg:border-t-8 lg:border-b-8 ${desktopBorderClass}
                    flex flex-col items-center justify-center
                    px-6 sm:px-8 md:px-12 lg:px-16 py-8 md:py-14
                    w-full h-full`}
      >
        {/* Project name */}
        <h3 className="font-serif font-semibold text-cream-neutral
                       text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl
                       tracking-widest mb-5 sm:mb-8 md:mb-12 lg:mb-14">
          {projectName}
        </h3>

        {/* Hex image gallery: 1 large + 2 small stacked */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Large hex */}
          <div
            className="w-36 md:w-52 lg:w-64 xl:w-76 bg-blue-medium-1 p-1"
            style={{ aspectRatio: '1 / 0.866', clipPath: HEX_CLIP }}
          >
            <div className="w-full h-full" style={{ clipPath: HEX_CLIP }}>
              <img
                src={primaryImage ?? hexBase}
                alt={projectName}
                className="w-full h-full object-contain bg-tan-neutral p-8"
              />
            </div>
          </div>

          {/* Two small hexes */}
          <div className="flex flex-col gap-5 md:gap-8 lg:gap-10 xl:gap-14">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="w-16 md:w-24 lg:w-28 xl:w-40 bg-blue-medium-1 p-0.5"
                style={{ aspectRatio: '1 / 0.866', clipPath: HEX_CLIP }}
              >
                <div className="w-full h-full" style={{ clipPath: HEX_CLIP }}>
                  <img
                    src={secondaryImages[i] ?? hexBase}
                    alt=""
                    className={`w-full h-full object-contain bg-tan-neutral ${secondaryImagePaddings[i] ?? 'p-2'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TextContent({ title, description, reversed = false }: { title: string; description: string[]; reversed?: boolean }) {
  const orderClass = reversed
    ? 'order-last'                          // reversed: text second everywhere
    : 'order-last lg:order-1'               // normal: text second on mobile, first on desktop

  return (
    <div className={`lg:flex-1 flex items-center justify-center px-6 md:px-10 lg:px-16 py-6 sm:py-10 md:py-16 ${orderClass}`}>
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 max-w-xl">
        <h3 className="flex items-center gap-3 md:gap-4 font-heading font-medium text-text-1
                       text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl
                       leading-tight">
          <span className="w-1.5 self-stretch rounded-full bg-blue-medium-1" />
          {title}
        </h3>
        {description.map((paragraph, i) => (
          <p
            key={i}
            className="font-sans text-text-1 text-sm md:text-base lg:text-lg xl:text-xl
                       leading-relaxed indent-8"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function ProjectCard({
  title,
  projectName = 'Hello World',
  description,
  reversed = false,
  primaryImage,
  secondaryImages,
  secondaryImagePaddings,
}: ProjectCardProps) {
  return (
    <div className="bg-blue-neutral flex flex-col lg:flex-row items-stretch w-full min-h-80 md:min-h-112 lg:min-h-144">
      {/* Mobile: gallery always on top. Desktop: alternates based on reversed */}
      <HexGallery
        reversed={reversed}
        projectName={projectName}
        primaryImage={primaryImage}
        secondaryImages={secondaryImages}
        secondaryImagePaddings={secondaryImagePaddings}
      />
      <TextContent title={title} description={description} reversed={reversed} />
    </div>
  )
}
