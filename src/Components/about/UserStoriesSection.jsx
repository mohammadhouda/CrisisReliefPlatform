import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import useInView from "../useInView";

function UserStoriesSection() {
  const [step1Ref, step1Visible] = useInView();
  const [step2Ref, step2Visible] = useInView();
  const [step3Ref, step3Visible] = useInView();
  const [step4Ref, step4Visible] = useInView();
  const [step5Ref, step5Visible] = useInView();
  const [step6Ref, step6Visible] = useInView();
  return (
    <section className="min-h-screen flex items-center py-10 bg-gray-100 px-6">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={step1Ref}
          className={`text-3xl font-bold text-center text-cyan-600 mb-12 transition duration-1000 delay-200 transform ${
            step1Visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <FontAwesomeIcon icon={faComments} />
          <span> Real Stories, Real Hope</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-12">
          <img
            ref={step6Ref}
            src="/assets/testimonials.jpg"
            alt="User stories"
            className={`md:w-1/2 w-full rounded-xl shadow-lg object-cover  transition duration-1000 transform ${
              step6Visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          />
          <div className="md:w-1/2 grid gap-8">
            <div
              ref={step2Ref}
              className={`bg-white shadow p-6 rounded-lg transition duration-1000 delay-200 transform ${
                step2Visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <h4 className="text-xl font-semibold text-cyan-600 mb-2">
                Nisrin, 40 – Displaced Mother
              </h4>
              <p>
                “After fleeing conflict with my two children, I had nowhere to
                turn. Through HopeLink, I found a shelter within hours and even
                got medical aid for my baby. It felt like someone finally saw
                me.”
              </p>
            </div>
            <div
              ref={step3Ref}
              className={`bg-white shadow p-6 rounded-lg transition duration-1000 delay-200 transform ${
                step3Visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <h4 className="text-xl font-semibold text-cyan-600 mb-2">
                Ismail, 34 – Volunteer
              </h4>
              <p>
                “I signed up to help with translations. One small task turned
                into a weekly commitment. HopeLink didn’t just connect me with
                people it gave me purpose.”
              </p>
            </div>
            <div
              ref={step4Ref}
              className={`bg-white shadow p-6 rounded-lg transition duration-1000 delay-200 transform ${
                step4Visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <h4 className="text-xl font-semibold text-cyan-600 mb-2">
                Lopna, 21 – Student Donor
              </h4>
              <p>
                “I used to think donations only helped far away. But when I
                funded a winter kit for a local family and saw their thank you
                message, I cried. HopeLink makes giving personal.”
              </p>
            </div>
            <div
              ref={step5Ref}
              className={`bg-white shadow p-6 rounded-lg transition duration-1000 delay-200 transform ${
                step5Visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <h4 className="text-xl font-semibold text-cyan-600 mb-2">
                SafeHands Charity
              </h4>
              <p>
                “We’ve reached more families through HopeLink than any other
                method. The platform helps us stay organized, transparent, and
                connected with the people we serve.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserStoriesSection;
