import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import useInView from "../useInView";

function MissionSection() {
  const [textRef, textVisible] = useInView();
  const [imgRef, imgVisible] = useInView();

  return (
    <section className="min-h-screen flex items-center bg-gray-50 px-6">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
        <div
          ref={textRef}
          className={`md:w-1/2 order-2 md:order-1 transform transition duration-1000 ${
            textVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-14"
          }`}
        >
          <h2 className="text-3xl font-bold text-cyan-600 mb-6">
            <FontAwesomeIcon icon={faBullseye} />
            <span> Our Mission</span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Our mission is to make{" "}
            <strong>aid accessible, fast, and fair</strong> for everyone in
            need. We connect verified charities, donors, and volunteers with
            individuals facing hardship through a trusted digital platform that
            values <strong>human dignity above all</strong>.
          </p>
        </div>

        <img
          ref={imgRef}
          src="/assets/mission.jpg"
          alt="Our mission"
          className={`md:w-1/2 w-full rounded-xl shadow-lg object-cover order-1 md:order-2 transform transition duration-1000 delay-500 ${
            imgVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        />
      </div>
    </section>
  );
}

export default MissionSection;
