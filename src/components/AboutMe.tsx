export default function AboutMe() {
  return (
    <section id="about" className="bg-blue-neutral px-6 sm:px-8 md:px-16 py-10 sm:py-12 md:py-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <h2 className="font-heading font-medium text-text-1 text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-center mb-8 sm:mb-10 md:mb-14">
          <span className="border-b-4 border-blue-medium-1 pb-2">About Me</span>
        </h2>
        <p className="font-sans text-lg md:text-xl lg:text-2xl text-text-1 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <p className="font-sans text-lg md:text-xl lg:text-2xl text-text-1 leading-relaxed">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
        </p>
      </div>
    </section>
  )
}
