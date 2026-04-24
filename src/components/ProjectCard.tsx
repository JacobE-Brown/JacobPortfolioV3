import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import hexBase from '@/assets/images/misc/hex-base.svg'
import ProjectLink from '@/components/ProjectLink'

gsap.registerPlugin(ScrollTrigger)

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
  /** Tailwind classes for the primary hex image (overrides default object-contain p-8) */
  primaryImageClassName?: string
  /** Gallery layout variant */
  galleryVariant?: 'hex' | 'browser'
  /** URL to open when the gallery is clicked (browser variant only) */
  projectUrl?: string
  /** Technology badges shown above the links */
  technologies?: { icon: string; label: string }[]
  /** Links shown below the description */
  links?: { href: string; label: string; icon: string }[]
}

// Flat-top hexagon clip path
const HEX_CLIP = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'

function HexGallery({
  reversed,
  projectName,
  primaryImage,
  secondaryImages = [],
  secondaryImagePaddings = [],
  primaryImageClassName,
  projectUrl,
}: {
  reversed: boolean
  projectName: string
  primaryImage?: string
  secondaryImages?: [string?, string?]
  secondaryImagePaddings?: [string?, string?]
  primaryImageClassName?: string
  projectUrl?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const largeHexRef = useRef<HTMLDivElement>(null)
  const smallHex0Ref = useRef<HTMLDivElement>(null)
  const smallHex1Ref = useRef<HTMLDivElement>(null)

  // Scroll-triggered stagger entrance
  useEffect(() => {
    const hexes = [largeHexRef.current, smallHex0Ref.current, smallHex1Ref.current]
    if (hexes.some(h => !h)) return

    gsap.set(hexes, { opacity: 0, y: 40 })

    const ctx = gsap.context(() => {
      gsap.to(hexes, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  // Hover: scale up hovered hex, nudge others
  const handleHover = (hovered: 'large' | 'small0' | 'small1', entering: boolean) => {
    const all = { large: largeHexRef.current, small0: smallHex0Ref.current, small1: smallHex1Ref.current }
    const others = Object.entries(all)
      .filter(([k]) => k !== hovered)
      .map(([, el]) => el)

    if (entering) {
      gsap.to(all[hovered], { scale: 1.08, duration: 0.25, ease: 'power2.out' })
      gsap.to(others, { scale: 0.95, duration: 0.25, ease: 'power2.out' })
    } else {
      gsap.to([all[hovered], ...others], { scale: 1, duration: 0.25, ease: 'power2.out' })
    }
  }

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
        ref={containerRef}
        className={`bg-text-1 border-blue-medium-1 ${roundedClass}
                    border-t-6 border-b-6 lg:border-t-8 lg:border-b-8 ${desktopBorderClass}
                    flex flex-col items-center justify-start
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
            ref={largeHexRef}
            className="w-36 md:w-52 lg:w-64 xl:w-76 bg-blue-medium-1 p-1 cursor-pointer"
            style={{ aspectRatio: '1 / 0.866', clipPath: HEX_CLIP }}
            onMouseEnter={() => handleHover('large', true)}
            onMouseLeave={() => handleHover('large', false)}
            onClick={() => { if (projectUrl) window.open(projectUrl, '_blank', 'noopener,noreferrer') }}
          >
            <div className="w-full h-full" style={{ clipPath: HEX_CLIP }}>
              <img
                src={primaryImage ?? hexBase}
                alt={projectName}
                className={primaryImageClassName ?? 'w-full h-full object-contain bg-tan-neutral p-8'}
                loading="lazy"
              />
            </div>
          </div>

          {/* Two small hexes */}
          <div className="flex flex-col gap-5 md:gap-8 lg:gap-10 xl:gap-14">
            {([smallHex0Ref, smallHex1Ref] as const).map((ref, i) => (
              <div
                key={i}
                ref={ref}
                className="w-24 md:w-28 lg:w-32 xl:w-40 bg-blue-medium-1 p-0.5 cursor-pointer"
                style={{ aspectRatio: '1 / 0.866', clipPath: HEX_CLIP }}
                onMouseEnter={() => handleHover(i === 0 ? 'small0' : 'small1', true)}
                onMouseLeave={() => handleHover(i === 0 ? 'small0' : 'small1', false)}
              >
                <div className="w-full h-full" style={{ clipPath: HEX_CLIP }}>
                  <img
                    src={secondaryImages[i] ?? hexBase}
                    alt=""
                    className={`w-full h-full object-contain bg-tan-neutral ${secondaryImagePaddings[i] ?? 'p-2'}`}
                    loading="lazy"
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

function BrowserGallery({
  reversed,
  projectName,
  primaryImage,
  projectUrl,
}: {
  reversed: boolean
  projectName: string
  primaryImage?: string
  projectUrl?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)

  let displayUrl = projectUrl ?? ''
  try { displayUrl = new URL(projectUrl ?? '').host } catch { /* use raw */ }

  useEffect(() => {
    if (!mockupRef.current) return
    gsap.set(mockupRef.current, { opacity: 0, y: 40 })
    const ctx = gsap.context(() => {
      gsap.to(mockupRef.current, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  const handleMouseEnter = () => {
    gsap.to(mockupRef.current, { scale: 1.04, duration: 0.25, ease: 'power2.out' })
  }
  const handleMouseLeave = () => {
    gsap.to(mockupRef.current, { scale: 1, duration: 0.25, ease: 'power2.out' })
  }
  const handleClick = () => {
    if (projectUrl) window.open(projectUrl, '_blank', 'noopener,noreferrer')
  }

  const desktopBorderClass = reversed ? 'lg:border-r-8' : 'lg:border-l-8'
  const roundedClass = reversed ? 'rounded-none lg:rounded-r-[4.5rem]' : 'rounded-none lg:rounded-l-[4.5rem]'
  const orderClass = reversed ? 'order-first' : 'order-first lg:order-2'

  return (
    <div className={`lg:flex-1 flex items-center justify-center lg:py-16 ${orderClass}`}>
      <div
        ref={containerRef}
        className={`bg-text-1 border-blue-medium-1 ${roundedClass}
                    border-t-6 border-b-6 lg:border-t-8 lg:border-b-8 ${desktopBorderClass}
                    flex flex-col items-center justify-start
                    px-6 sm:px-8 md:px-12 lg:px-16 py-8 md:py-14
                    w-full h-full`}
      >
        <h3 className="font-serif font-semibold text-cream-neutral
                       text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl
                       tracking-widest mb-5 sm:mb-8 md:mb-12 lg:mb-14">
          {projectName}
        </h3>

        {/* Browser mockup */}
        <div
          ref={mockupRef}
          className={`w-full max-w-sm md:max-w-md lg:max-w-lg rounded-lg overflow-hidden shadow-2xl ${projectUrl ? 'cursor-pointer' : 'cursor-default'}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {/* Browser chrome */}
          <div className="bg-[#2a2a2e] px-3 py-2 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <div className="ml-2 flex-1 bg-[#3a3a3e] rounded text-[10px] text-gray-400 px-3 py-0.5 truncate font-sans">
              {displayUrl}
            </div>
          </div>
          {/* Screenshot */}
          <img
            src={primaryImage ?? hexBase}
            alt={projectName}
            className="w-full block object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}


function TextContent({ title, description, reversed = false, technologies, links }: { title: string; description: string[]; reversed?: boolean; technologies?: { icon: string; label: string }[]; links?: { href: string; label: string; icon: string }[] }) {
  const orderClass = reversed
    ? 'order-last'                          // reversed: text second everywhere
    : 'order-last lg:order-1'               // normal: text second on mobile, first on desktop

  return (
    <div className={`lg:flex-1 flex items-start justify-center px-6 md:px-10 lg:px-16 py-6 sm:py-10 md:py-16 ${orderClass}`}>
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 max-w-xl">
        <h3 className="flex items-center gap-3 md:gap-4 font-heading font-medium text-text-1
                       text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
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
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/60 border border-blue-medium-1/30 rounded-full px-3 py-1.5 hover:bg-white/80 transition-colors">
                <img src={tech.icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded shrink-0" loading="lazy" />
                <span className="font-sans text-text-2 text-sm leading-none">{tech.label}</span>
              </div>
            ))}
          </div>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {links.map((link, i) => (
              <ProjectLink key={i} href={link.href} label={link.label} icon={link.icon} />
            ))}
          </div>
        )}
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
  primaryImageClassName,
  galleryVariant = 'hex',
  projectUrl,
  technologies,
  links,
}: ProjectCardProps) {
  const gallery = galleryVariant === 'browser' ? (
    <BrowserGallery reversed={reversed} projectName={projectName} primaryImage={primaryImage} projectUrl={projectUrl} />
  ) : (
    <HexGallery
      reversed={reversed}
      projectName={projectName}
      primaryImage={primaryImage}
      secondaryImages={secondaryImages}
      secondaryImagePaddings={secondaryImagePaddings}
      primaryImageClassName={primaryImageClassName}
      projectUrl={projectUrl}
    />
  )

  return (
    <div className="bg-blue-neutral flex flex-col lg:flex-row items-stretch w-full min-h-80 md:min-h-112 lg:min-h-144">
      {gallery}
      <TextContent title={title} description={description} reversed={reversed} technologies={technologies} links={links} />
    </div>
  )
}
