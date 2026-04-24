import { SubTechChip } from './SubTechChip'
import { educationDiplomas, educationCerts } from './data'
import graduatedIcon from '@/assets/images/misc/graduated.svg'

export function EducationContent({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <h4 className="font-sans font-semibold text-text-1 text-xs uppercase tracking-widest opacity-50">
          Diplomas & Resume
        </h4>
        <div className="flex flex-col gap-2">
          {educationDiplomas.map((doc) => (
            <a
              key={doc.label}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 self-start font-sans text-text-2 hover:text-text-1 transition-colors duration-200
                ${compact ? 'text-sm' : 'text-sm md:text-base'}`}
            >
              <img src={graduatedIcon} alt="" loading="lazy" className="w-5 h-5 object-contain opacity-60 shrink-0" />
              {doc.label}
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div>
          <h3 className={`font-sans font-extrabold text-text-1 mb-2 ${compact ? 'text-lg' : 'text-lg md:text-xl'}`}>
            Magdalen College
          </h3>
          <p className={`font-sans text-text-1 leading-relaxed ${compact ? 'text-base' : 'text-base md:text-lg'}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div>
          <h3 className={`font-sans font-extrabold text-text-1 mb-2 ${compact ? 'text-lg' : 'text-lg md:text-xl'}`}>
            College of Western Idaho
          </h3>
          <p className={`font-sans text-text-1 leading-relaxed ${compact ? 'text-base' : 'text-base md:text-lg'}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
            libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
            imperdiet. Duis sagittis ipsum. Praesent mauris.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <h4 className="font-sans font-semibold text-text-1 text-xs uppercase tracking-widest opacity-50">
          Certifications
        </h4>
        <div className={`flex flex-wrap ${compact ? 'gap-1.5' : 'gap-2'}`}>
          {educationCerts.map((cert) => (
            <SubTechChip key={cert.label} sub={cert} />
          ))}
        </div>
      </div>
    </>
  )
}
