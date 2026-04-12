import hexBase from '@/assets/images/TechLogos/hex-base.svg'

interface ProjectCardProps {
  title: string
  projectName: string
  description: string[]
  reversed?: boolean
}

const HEX_CLIP = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'

function HexGallery({ reversed, projectName }: { reversed: boolean; projectName: string }) {
  // Rounded on the inward-facing side, flush on the outer edge
  const roundedClass = reversed
    ? 'rounded-r-[3rem] lg:rounded-r-[4.5rem]'
    : 'rounded-l-[3rem] lg:rounded-l-[4.5rem]'

  // Border on 3 sides (not the edge flush with the container)
  const borderClass = reversed
    ? 'border-t-[6px] border-b-[6px] border-r-[6px] lg:border-t-[9px] lg:border-b-[9px] lg:border-r-[9px]'
    : 'border-t-[6px] border-b-[6px] border-l-[6px] lg:border-t-[9px] lg:border-b-[9px] lg:border-l-[9px]'

  return (
    <div
      className={`bg-text-1 border-blue-medium-1 ${borderClass} ${roundedClass}
                  flex items-center justify-center
                  p-6 md:p-10 lg:p-12
                  w-full lg:w-1/2
                  min-h-[18rem] md:min-h-[24rem] lg:min-h-[28rem]
                  self-center lg:self-auto`}
    >
      <div className="flex flex-col items-center gap-6 md:gap-8">
        <h3 className="font-serif font-semibold text-cream-neutral text-2xl md:text-4xl lg:text-5xl tracking-[0.13em]">
          {projectName}
        </h3>
        <div className="flex items-center gap-2 md:gap-3">
          {/* Large hex image */}
          <div
            className="w-32 h-36 md:w-48 md:h-52 lg:w-60 lg:h-64"
            style={{ clipPath: HEX_CLIP }}
          >
            <img
              src={hexBase}
              alt="Project screenshot"
              className="w-full h-full object-cover bg-blue-medium-1/30"
            />
          </div>
          {/* Two small hex images stacked */}
          <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="w-16 h-18 md:w-24 md:h-26 lg:w-28 lg:h-32"
                style={{ clipPath: HEX_CLIP }}
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

export default function ProjectCard({
  title,
  projectName = 'Hello World',
  description,
  reversed = false,
}: ProjectCardProps) {
  const textContent = (
    <div className="flex flex-col items-center lg:items-start justify-center gap-4 md:gap-6
                    flex-1 px-6 md:px-10 lg:px-16 py-8 md:py-12">
      <h3 className="font-sans font-extrabold text-text-1 text-2xl md:text-4xl lg:text-[3.5rem] leading-tight text-center lg:text-left">
        {title}
      </h3>
      {description.map((paragraph, i) => (
        <p
          key={i}
          className="font-sans text-text-1 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl indent-8"
        >
          {paragraph}
        </p>
      ))}
    </div>
  )

  const hexGallery = <HexGallery reversed={reversed} projectName={projectName} />

  return (
    <div className="bg-blue-neutral flex flex-col lg:flex-row items-stretch overflow-hidden w-full">
      {reversed ? (
        <>
          {hexGallery}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {hexGallery}
        </>
      )}
    </div>
  )
}
