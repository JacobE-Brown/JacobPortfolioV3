import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'

interface ExternalLinkContextType {
  openExternalLink: (url: string) => void
}

const ExternalLinkContext = createContext<ExternalLinkContextType>({
  openExternalLink: () => {},
})

export const useExternalLink = () => useContext(ExternalLinkContext)

function Modal({
  url,
  onContinue,
  onCancel,
}: {
  url: string
  onContinue: () => void
  onCancel: () => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const continueRef = useRef<HTMLButtonElement>(null)

  let displayDomain = url
  try {
    displayDomain = new URL(url).hostname
  } catch {
    /* show raw url */
  }

  useEffect(() => {
    continueRef.current?.focus()

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onCancel])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-text-1/40 backdrop-blur-sm animate-modal-backdrop"
      onClick={(e) => {
        if (e.target === overlayRef.current) onCancel()
      }}
    >
      <div
        className="bg-blue-neutral border border-blue-medium-1/30 rounded-3xl
                   shadow-2xl px-8 sm:px-10 py-8 sm:py-10 max-w-md w-full
                   flex flex-col gap-5 animate-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="external-link-heading"
      >
        <h3
          id="external-link-heading"
          className="font-heading font-medium text-text-1 text-xl sm:text-2xl"
        >
          <span className="border-b-3 border-blue-medium-1 pb-1">External Link</span>
        </h3>

        <p className="font-sans text-text-1/80 text-sm sm:text-base leading-relaxed">
          You're about to leave this site and visit:
        </p>

        <div className="bg-white/60 border border-blue-medium-1/20 rounded-xl px-4 py-3">
          <p className="font-sans font-medium text-text-1 text-sm sm:text-base truncate">
            {displayDomain}
          </p>
          <p className="font-sans text-text-2 text-xs truncate mt-1">{url}</p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            onClick={onCancel}
            className="font-sans text-sm sm:text-base text-text-2 px-5 py-2.5
                       rounded-full border border-blue-medium-1/30
                       hover:bg-white/60 hover:border-blue-medium-1
                       transition-all duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            ref={continueRef}
            onClick={onContinue}
            className="font-sans text-sm sm:text-base text-white font-medium px-5 py-2.5
                       rounded-full bg-blue-medium-2
                       hover:bg-blue-medium-2/80 hover:shadow-md
                       transition-all duration-200 cursor-pointer"
          >
            Continue ↗
          </button>
        </div>
      </div>
    </div>
  )
}

export function ExternalLinkProvider({ children }: { children: React.ReactNode }) {
  const [pendingUrl, setPendingUrl] = useState<string | null>(null)

  const openExternalLink = useCallback((url: string) => {
    setPendingUrl(url)
  }, [])

  const handleContinue = () => {
    if (pendingUrl) {
      window.open(pendingUrl, '_blank', 'noopener,noreferrer')
    }
    setPendingUrl(null)
  }

  const handleCancel = () => {
    setPendingUrl(null)
  }

  return (
    <ExternalLinkContext.Provider value={{ openExternalLink }}>
      {children}
      {pendingUrl && (
        <Modal url={pendingUrl} onContinue={handleContinue} onCancel={handleCancel} />
      )}
    </ExternalLinkContext.Provider>
  )
}
