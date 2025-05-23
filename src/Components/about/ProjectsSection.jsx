import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiagramProject } from "@fortawesome/free-solid-svg-icons";
import useInView from "../useInView";

export default function ProjectsSection() {
  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();
  const [ref3, inView3] = useInView();

  return (
    <section id="project" className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-cyan-600 sm:text-4xl">
            <FontAwesomeIcon icon={faDiagramProject} className="mr-2" />
            <span> Our Projects</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Real stories of change driven by community needs and supported
            through your generosity.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            ref={ref1}
            className={`overflow-hidden rounded-lg bg-white shadow transition duration-1000 transform ${
              inView1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <img
              src="/assets/water-aid.jpg"
              alt="Water and Shelter"
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">
                Shelter & Clean Water for Refugees
              </h3>
              <p className="mt-2 text-gray-600">
                Partnering with NGOs to provide temporary housing and access to
                clean water for over 1,200 displaced families in northern
                Lebanon.
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center rounded-full bg-cyan-100 px-3 py-0.5 text-sm font-medium text-cyan-800">
                  <i className="fas fa-tint mr-1"></i> Water
                </span>
                <span className="ml-2 inline-flex items-center rounded-full bg-teal-100 px-3 py-0.5 text-sm font-medium text-teal-800">
                  <i className="fas fa-home mr-1"></i> Shelter
                </span>
              </div>
            </div>
          </div>

          <div
            ref={ref2}
            className={`overflow-hidden rounded-lg bg-white shadow transition duration-1000 delay-150 transform ${
              inView2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <img
              src="/assets/education.jpg"
              alt="Education and Empowerment"
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">
                Education & Hope Program
              </h3>
              <p className="mt-2 text-gray-600">
                Funded school supplies, meals, and tutoring for 350+
                underprivileged children, improving literacy and math scores
                across 5 villages.
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-0.5 text-sm font-medium text-purple-800">
                  <i className="fas fa-book mr-1"></i> Education
                </span>
                <span className="ml-2 inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800">
                  <i className="fas fa-child mr-1"></i> Youth
                </span>
              </div>
            </div>
          </div>

          <div
            ref={ref3}
            className={`overflow-hidden rounded-lg bg-white shadow transition duration-1000 delay-300 transform ${
              inView3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <img
              src="/assets/emergency-aid.jpg"
              alt="Emergency Response"
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">
                Crisis Relief Coordination
              </h3>
              <p className="mt-2 text-gray-600">
                Launched a real-time coordination system between donors and
                verified charities during the recent storm crisis, delivering
                over 5,000 hot meals and medical kits in 3 days.
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
                  <i className="fas fa-bolt mr-1"></i> Emergency
                </span>
                <span className="ml-2 inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
                  <i className="fas fa-hands-helping mr-1"></i> Relief
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
