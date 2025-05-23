import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";

export default function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  return (
    <section className="min-h-screen flex items-center bg-white px-6" ref={ref}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-cyan-600 mb-12">
          <FontAwesomeIcon icon={faChartSimple} />{" "}
          <span> Our Impact in Numbers</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-800">
          <div>
            <p className="text-5xl font-bold text-cyan-600">
              {inView && <CountUp end={1200} duration={3} separator="," />}+
            </p>
            <p className="mt-2 text-lg">People Helped</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-cyan-600">
              {inView && <CountUp end={85} duration={2.5} />}+
            </p>
            <p className="mt-2 text-lg">Charity Partners</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-cyan-600">
              {inView && <CountUp end={350} duration={3} />}+
            </p>
            <p className="mt-2 text-lg">Volunteers Active</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-cyan-600">
              {inView && (
                <>
                  $ <CountUp end={75000} duration={3.5} separator="," />+
                </>
              )}
            </p>
            <p className="mt-2 text-lg">Donations Delivered</p>
          </div>
        </div>
      </div>
    </section>
  );
}
