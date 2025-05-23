import React from "react";
import useInView from "../useInView";
import { Link } from "react-router-dom";

function CallToActionSection() {
  const [refHeading, inViewHeading] = useInView();
  const [refDonate, inViewDonate] = useInView();
  const [refVolunteer, inViewVolunteer] = useInView();
  const [refPartner, inViewPartner] = useInView();
  const [refNewsletter, inViewNewsletter] = useInView();

  return (
    <section id="get-involved" className="bg-cyan-600 py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Heading */}
          <div
            ref={refHeading}
            className={`transition duration-1000 transform ${
              inViewHeading
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Join Our Mission
            </h2>
            <p className="mt-4 text-xl text-cyan-100">
              There are many ways to get involved and support our humanitarian
              efforts around the world.
            </p>
          </div>

          {/* Action Cards */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              ref={refDonate}
              className={`rounded-lg bg-white/10 p-6 backdrop-blur-sm transition duration-1000 transform ${
                inViewDonate
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-xl font-bold">Donate</h3>
              <p className="mt-2 text-cyan-100">
                Your contribution, no matter the size, helps us deliver aid and
                implement sustainable projects.
              </p>
              <Link
                to="https://donate.stripe.com/test_fZufZjbiDcM5bIrgrbgrS00"
                className="block mt-4 w-full rounded-md bg-white px-4 py-2 font-medium text-cyan-600 hover:bg-cyan-50"
              >
                Make a Donation
              </Link>
            </div>

            <div
              ref={refVolunteer}
              className={`rounded-lg bg-white/10 p-6 backdrop-blur-sm transition duration-1000 delay-150 transform ${
                inViewVolunteer
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-xl font-bold">Volunteer</h3>
              <p className="mt-2 text-cyan-100">
                Contribute your skills and time to our projects, either remotely
                or in the field.
              </p>
              <Link
                to="/user-login"
                className="block mt-4 w-full rounded-md bg-white px-4 py-2 font-medium text-cyan-600 hover:bg-cyan-50"
              >
                Volunteer With Us
              </Link>
            </div>

            <div
              ref={refPartner}
              className={`rounded-lg bg-white/10 p-6 backdrop-blur-sm transition duration-1000 delay-300 transform ${
                inViewPartner
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } sm:col-span-2 lg:col-span-1`}
            >
              <h3 className="text-xl font-bold">Partner</h3>
              <p className="mt-2 text-cyan-100">
                Collaborate with us to amplify our impact and reach more
                communities in need.
              </p>
              <Link
                to="/charity-login"
                className="block mt-4 w-full rounded-md bg-white px-4 py-2 font-medium text-cyan-600 hover:bg-cyan-50"
              >
                Log in as Partner
              </Link>
            </div>
          </div>

          <div
            ref={refNewsletter}
            className={`mt-12 transition duration-1000 delay-500 transform ${
              inViewNewsletter
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-bold">Partnership</h3>
            <p className="mt-2 text-cyan-100">
              Explore partnership opportunities for organizations, apply and we
              will contact you.
            </p>
            <form className="mt-4 sm:mx-auto sm:flex sm:max-w-xl">
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your organization's email"
                  className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
              </div>
              <div className="mt-3 sm:ml-3 sm:mt-0">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-white px-4 py-3 font-medium text-cyan-600 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-cyan-600 sm:w-auto"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToActionSection;
