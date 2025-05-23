import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, fa1, fa2, fa3 } from "@fortawesome/free-solid-svg-icons";
import useInView from "../useInView";

function HowItWorksSection() {
  const [step1Ref, step1Visible] = useInView();
  const [step2Ref, step2Visible] = useInView();
  const [step3Ref, step3Visible] = useInView();

  return (
    <section className="min-h-screen flex items-center bg-white py-5 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-cyan-600 mb-12">
          <FontAwesomeIcon icon={faPaperPlane} /> <span> How It Works</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <img
            src="/assets/how-it-works.jpg"
            alt="How it works"
            className="md:w-1/2 w-full rounded-xl shadow-lg object-cover"
          />

          <div className="md:w-1/2 grid grid-cols-1 gap-8 text-center md:text-left">
            <div
              ref={step1Ref}
              className={`transition duration-1000 transform ${
                step1Visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-5xl mb-3 text-cyan-500">
                <FontAwesomeIcon icon={fa1} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Charities Share Support
              </h3>
              <p>
                Verified organizations publish resources food packs, shelter,
                education, medical aid directly to the platform. They define who
                they're helping and how, creating a transparent and focused
                pipeline of assistance.
              </p>
            </div>

            <div
              ref={step2Ref}
              className={`transition duration-1000 delay-200 transform ${
                step2Visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-5xl mb-3 text-cyan-500">
                <FontAwesomeIcon icon={fa2} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                People Request Help
              </h3>
              <p>
                Individuals in need browse available aid or submit a request
                with just a few clicks no paperwork, no waiting lines. Requests
                are matched in real-time with nearby offers, preserving dignity
                and safety.
              </p>
            </div>

            <div
              ref={step3Ref}
              className={`transition duration-1000 delay-400 transform ${
                step3Visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-5xl mb-3 text-cyan-500">
                <FontAwesomeIcon icon={fa3} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hope Becomes Real</h3>
              <p>
                Charities act swiftly. Donors contribute directly. Volunteers
                step up. Every action is tracked, confirmed, and celebrated
                because behind every request is a human story being changed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
