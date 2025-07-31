import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../Components/firebase";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const globalProjectsRef = ref(database, "projects");

    const unsubscribe = onValue(globalProjectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setProjects(parsed);
      } else {
        setProjects([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading projects...</p>;

  if (projects.length === 0)
    return <p className="text-center mt-10">No projects found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white shadow-md border border-gray-200 p-4 rounded text-cyan-600 space-y-2"
        >
          <h2 className="text-xl font-bold">{project.title}</h2>
          <p className="text-gray-700">{project.description}</p>
          <p className="text-sm text-gray-500">Category: {project.Category}</p>
          <p className="text-sm text-gray-500">Location: {project.location}</p>
          <p className="text-sm text-gray-500">Duration: {project.timeFrame}</p>
          <p className="text-sm text-gray-500">Impact: {project.Impact}</p>
          <p className="text-xs text-gray-400">
            Posted by: {project.charityName}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Projects;
