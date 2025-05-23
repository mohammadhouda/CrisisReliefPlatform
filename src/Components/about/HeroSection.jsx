// components/About/HeroSection.jsx
import React from "react";
import useInView from "../useInView";

function HeroSection() {
  const [sectionRef, isVisible] = useInView();
  return (
    <section
      ref={sectionRef}
      className={`relative bg-cyan-600 py-20 text-white md:py-32 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img
          src="/assets/hopelink-home.jpg"
          alt="Humanitarian work"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h1
          className={`mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl transition-all duration-700 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="text-cyan-500">Hope</span>
          <span>Link</span>, Empowering Communities
        </h1>
        <p
          className={`mx-auto mb-10 max-w-2xl text-xl text-cyan-100 transition-all duration-700 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          We're on a mission to create lasting change through humanitarian aid,
          sustainable development, and community empowerment.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#project"
            className="rounded-md bg-white px-6 py-3 text-base font-medium text-cyan-600 shadow-md transition hover:bg-cyan-50"
          >
            Our Projects
          </a>
          <a
            href="#get-involved"
            className="rounded-md border-2 border-white bg-transparent px-6 py-3 text-base font-medium text-white transition hover:bg-white/10"
          >
            Get Involved
          </a>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
