import hexBase from '@/assets/images/TechLogos/hex-base.svg'

interface ProjectCardProps {
  title: string
  projectName?: string
  description: string[]
  reversed?: boolean
}

// Flat-top hexagon clip path
const HEX_CLIP = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'

function HexGallery({ reversed, projectName }: { reversed: boolean; projectName: string }) {
  // Rounded on the inward-facing side only; flush on outer edge
  const roundedStyle = reversed
    ? { borderRadius: '0 4.5rem 4.5rem 0' }
    : { borderRadius: '4.5rem 0 0 4.5rem' }

  // 3-sided border: top + bottom + inward side (no border on flush edge)
  const borderClass = reversed
    ? 'border-t-8 border-b-8 border-r-8'
    : 'border-t-8 border-b-8 border-l-8'

  return (
    <div className="flex-1 flex items-center justify-center py-10 lg:py-16">
      <div
        className={`bg-text-1 border-blue-medium-1 ${borderClass}
                    flex flex-col items-center justify-center
                    px-8 md:px-12 lg:px-16 py-10 md:py-14
                    w-full h-full`}
        style={roundedStyle}
      >
        {/* Project name */}
        <h3 className="font-serif font-semibold text-cream-neutral
                       text-2xl md:text-4xl lg:text-5xl xl:text-7xl
                       tracking-widest mb-8 md:mb-12 lg:mb-14">
          {projectName}
        </h3>

        {/* Hex image gallery: 1 large + 2 small stacked */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Large hex */}
          <div
            className="w-36 md:w-52 lg:w-64 xl:w-76"
            style={{ aspectRatio: '1 / 0.866', clipPath: HEX_CLIP }}
          >
            <img
              src={hexBase}
              alt="Project screenshot"
              className="w-full h-full object-cover bg-blue-medium-1/30"
            />
          </div>

          {/* Two small hexes */}
          <div className="flex flex-col gap-5 md:gap-8 lg:gap-10 xl:gap-14">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="w-16 md:w-24 lg:w-28 xl:w-40"
                style={{ aspectRatio: '1 / 0.866', clipPath: HEX_CLIP }}
              >
                <img
                  src={hexBase}
                  alt=""
                  className="w-full h-full object-cover bg-blue-medium-1/30"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TextContent({ title, description }: { title: string; description: string[] }) {
  return (
    <div className="flex-1 flex items-center justify-center px-6 md:px-10 lg:px-16 py-10 md:py-16">
      <div className="flex flex-col gap-4 md:gap-6 max-w-xl">
        <h3 className="flex items-center gap-3 md:gap-4 font-heading font-medium text-text-1
                       text-2xl md:text-3xl lg:text-4xl xl:text-6xl
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
}: ProjectCardProps) {
  return (
    <div className="bg-blue-neutral flex flex-col lg:flex-row items-stretch w-full min-h-80 md:min-h-112 lg:min-h-144">
      {reversed ? (
        <>
          <HexGallery reversed={reversed} projectName={projectName} />
          <TextContent title={title} description={description} />
        </>
      ) : (
        <>
          <TextContent title={title} description={description} />
          <HexGallery reversed={reversed} projectName={projectName} />
        </>
      )}
    </div>
  )
}
