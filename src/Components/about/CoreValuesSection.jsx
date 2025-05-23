import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faHandHoldingMedical,
  faEye,
  faBrain,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import useInView from "../useInView";

function CoreValuesSection() {
  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();
  const [ref3, inView3] = useInView();
  const [ref4, inView4] = useInView();

  return (
    <section className="min-h-screen flex items-center bg-gray-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-cyan-600 mb-12">
          <FontAwesomeIcon icon={faHeart} /> <span> Our Core Values</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-800 text-center">
          <div
            ref={ref1}
            className={`transition duration-1000 transform ${
              inView1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <FontAwesomeIcon
              className="mx-auto mb-4 h-14 w-14 text-cyan-600"
              icon={faHandHoldingMedical}
            />
            <h3 className="text-xl font-semibold mb-2">Compassion</h3>
            <p>
              We listen with empathy and act with kindness toward everyone we
              serve — especially in their most difficult moments.
            </p>
          </div>
          <div
            ref={ref2}
            className={`transition duration-1000 delay-150 transform ${
              inView2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <FontAwesomeIcon
              className="mx-auto mb-4 h-14 w-14 text-cyan-600"
              icon={faEye}
            />
            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
            <p>
              Honesty and openness guide all we do — from project funding to
              reporting impact.
            </p>
          </div>
          <div
            ref={ref3}
            className={`transition duration-1000 delay-300 transform ${
              inView3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <FontAwesomeIcon
              className="mx-auto mb-4 h-14 w-14 text-cyan-600"
              icon={faBrain}
            />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p>
              We harness the power of technology to solve real problems and
              create lasting change.
            </p>
          </div>
          <div
            ref={ref4}
            className={`transition duration-1000 delay-500 transform ${
              inView4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <FontAwesomeIcon
              className="mx-auto mb-4 h-14 w-14 text-cyan-600"
              icon={faGlobe}
            />
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p>
              We believe in connection — building a global network of care where
              every action matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoreValuesSection;
