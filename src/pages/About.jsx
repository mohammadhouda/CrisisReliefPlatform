import React from "react";
import HeroSection from "../Components/about/HeroSection";
import StorySection from "../Components/about/StorySection";
import MissionSection from "../Components/about/MissionSection";
import HowItWorksSection from "../Components/about/HowItWorksSection";
import UserStoriesSection from "../Components/about/UserStoriesSection";
import StatsSection from "../Components/about/StatsSection";
import CoreValuesSection from "../Components/about/CoreValuesSection";
import CallToActionSection from "../Components/about/CallToActionSection";
import ProjectsSection from "../Components/about/ProjectsSection";

function About() {
  return (
    <div className="font-poppins text-gray-800">
      {/* Hero Section */}
      <HeroSection />
      {/* Story Section */}
      <StorySection />
      {/* Mission Section */}
      <MissionSection />
      {/* How It Works Section */}
      <HowItWorksSection />
      {/* User Stories Section */}
      <UserStoriesSection />
      {/* Projects Section */}
      <ProjectsSection />
      {/* Stats Section */}
      <StatsSection />
      {/* Core Values Section */}
      <CoreValuesSection />
      {/* Call to Action Section */}
      <CallToActionSection />
    </div>
  );
}

export default About;
