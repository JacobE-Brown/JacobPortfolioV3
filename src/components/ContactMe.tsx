export default function ContactMe() {
  return (
    <section id="contact" className="bg-blue-neutral flex flex-col items-center justify-end min-h-112">
      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-8">
        <h2 className="font-heading font-medium text-5xl md:text-7xl lg:text-8xl text-text-1 mb-8 md:mb-12">
          <span className="border-b-4 border-blue-medium-1 pb-2">Contact Me</span>
        </h2>
        <a
          href="mailto:JacobEBrown@JB.Dev"
          className="font-sans text-blue-medium-2 text-2xl md:text-4xl lg:text-5xl hover:underline"
        >
          JacobEBrown@JB.Dev
        </a>
      </div>
      <footer className="bg-text-1 w-full h-20" />
    </section>
  )
}
