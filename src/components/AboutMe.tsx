export default function AboutMe() {
  return (
    <section id="about" className="bg-blue-neutral px-6 sm:px-8 md:px-16 py-10 sm:py-12 md:py-16">
      <h2 className="font-heading font-medium text-text-1 text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-center mb-8 sm:mb-10 md:mb-14">
        <span className="border-b-4 border-blue-medium-1 pb-2">About Me</span>
      </h2>
      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        <p className="font-sans text-lg md:text-xl lg:text-2xl text-text-1 leading-relaxed">
          I am a DevOps Engineer based in Boise, Idaho, working at Netacent. I recently graduated from CWI with an associates
          in Full-Stack web development, and I like to branch out into extra technologies through
          online courses, self study, and personal projects. I am naturally strongest in backend
          code, but I have recently nurtured an interest in good design theory and UI. A couple of
          my favorite technologies are Amazon Web Services and Figma, which I used for building
          this portfolio.
        </p>
        <p className="font-sans text-lg md:text-xl lg:text-2xl text-text-1 leading-relaxed">
          My AI philosophy is to give the LLM very refined prompts, always understand what the LLM
          did and why, asking it for explanations if necessary, and to check and recheck for errors.
        </p>
        <span className="sr-only">
          Jacob Brown holds a B.A. in Liberal Arts from Magdalen College and an A.A.S. in Full-Stack Web Development from the College of Western Idaho. Professional certifications include Cybersecurity, Network Security, Security Risk Management, Google Cloud, Data Analytics, Databases, Python, Figma Design, Wireframes, and Git &amp; GitHub. Experienced with containerization using Docker and Kubernetes, infrastructure as code with Helm, cloud platforms including Azure and AWS, observability with Prometheus and Grafana, backend development with C# .NET Core and Python, and frontend development with React TypeScript and Tailwind CSS.
        </span>
      </div>
    </section>
  )
}
