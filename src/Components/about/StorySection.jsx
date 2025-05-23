import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import useInView from "../useInView";

function StorySection() {
  const [ref, isVisible] = useInView();

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center bg-white px-6 transition-all duration-1000"
    >
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
        <img
          src="/assets/story.jpg"
          alt="Our story"
          className={`md:w-1/2 w-full rounded-xl shadow-lg object-cover transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        />
        <div
          className={`md:w-1/2 transition-all duration-1000 delay-700 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl font-bold text-cyan-600 mb-6">
            <FontAwesomeIcon icon={faBook} />
            <span> Our Story</span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            HopeLink began with a simple question:{" "}
            <strong>
              “What if we could connect people in crisis with help instantly?”
            </strong>
            <br />
            <br />
            In 2024, while volunteering in a refugee shelter, our founder
            witnessed firsthand how difficult it was for displaced individuals
            to access basic support despite many willing charities and donors
            nearby.
            <br />
            <br />
            That moment sparked a mission to build a digital bridge between help
            and hope. With a small team, strong passion, and a few lines of
            code, HopeLink was born: a platform where needs are heard, and
            support is delivered with dignity and speed.
          </p>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
