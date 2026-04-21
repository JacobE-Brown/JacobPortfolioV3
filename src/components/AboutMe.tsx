export default function AboutMe() {
  return (
    <section id="about" className="bg-blue-neutral px-6 sm:px-8 md:px-16 py-10 sm:py-12 md:py-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <h2 className="font-heading font-medium text-text-1 text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-center mb-8 sm:mb-10 md:mb-14">
          <span className="border-b-4 border-blue-medium-1 pb-2">About Me</span>
        </h2>
        <p className="font-sans text-lg md:text-xl lg:text-2xl text-text-1 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac augue id mi dictum
          facilisis. Sed vel justo sed nisl malesuada tincidunt vel in lorem. Integer vitae dapibus
          nisl, at porta augue. Mauris tincidunt, lacus id placerat feugiat, elit justo feugiat odio,
          at ultricies mi libero vel lorem.
        </p>
      </div>
    </section>
  )
}
