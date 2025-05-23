import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { database } from "../../Components/firebase";
import {
  faPlus,
  faTrash,
  faClock,
  faUser,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import { useUserAuth } from "../../context/authcontext";
import { ref, get, push, set, remove } from "firebase/database";

const CharityProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    Category: "",
    location: "",
    timeFrame: "",
    Impact: "",
  });
  const { user } = useUserAuth();
  const [name, setName] = useState("");
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [creatingProject, setCreatingProject] = useState(false);
  const [deleteProject, setDeletingProject] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchName = async () => {
      if (!user) {
        if (isMounted) setName("Unknown Charity");
        return;
      }
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);
      if (isMounted) {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setName(userData.name || "Unknown Charity");
        } else {
          setName("Unknown Charity");
        }
      }
    };
    fetchName();
    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      setLoadingProjects(true);
      const projectsRef = ref(database, `users/${user.uid}/projects`);
      const snapshot = await get(projectsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const loadedProjects = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setProjects(loadedProjects);
      } else {
        setProjects([]);
      }
      setLoadingProjects(false);
    };

    fetchProjects();
  }, [user]);

  const handleCreateProject = async () => {
    const { title, description } = newProject;
    if (!title || !description || !user) return;

    setCreatingProject(true);

    const createdAt = new Date().toISOString().split("T")[0];
    const projectId = push(ref(database)).key; // single key for both places

    const completeProjectData = {
      ...newProject,
      createdAt,
      charityName: name || "Unknown Charity",
      charityId: user.uid,
    };

    // Save under user's node
    await set(
      ref(database, `users/${user.uid}/projects/${projectId}`),
      completeProjectData
    );

    // Save under global node
    await set(ref(database, `projects/${projectId}`), completeProjectData);

    // Update local state
    setProjects((prev) => [...prev, { id: projectId, ...completeProjectData }]);

    setNewProject({
      title: "",
      description: "",
      Category: "",
      location: "",
      timeFrame: "",
      Impact: "",
    });
    setIsModalOpen(false);
    setCreatingProject(false);
  };

  const handleDeleteProject = async (projectId) => {
    if (!user) return;
    setDeletingProject(true);

    // Delete from user's node
    await remove(ref(database, `users/${user.uid}/projects/${projectId}`));

    // Delete from global node
    await remove(ref(database, `projects/${projectId}`));

    setProjects((prev) => prev.filter((project) => project.id !== projectId));
    setDeletingProject(false);
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Charity Projects</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-md bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700 transition"
        >
          <FontAwesomeIcon icon={faPlus} />
          Create New
        </button>
      </div>

      {loadingProjects ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent"></div>
          <p className="text-sm text-gray-500 mt-2">Loading projects...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-md rounded-md overflow-hidden p-4"
            >
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-gray-600 mt-1">{project.description}</p>
              <p className="ml-auto text-xs text-cyan-600 font-semibold w-fit py-1 px-3 bg-cyan-50 rounded-full">
                {project.Category}
              </p>
              <p className="text-sm text-gray-500">
                <FontAwesomeIcon className="mr-1" icon={faClock} />
                {project.timeFrame}
              </p>
              <p className="text-sm text-gray-500">
                <FontAwesomeIcon className="mr-1" icon={faUser} />
                {project.Impact} person impacted
              </p>
              <p className="text-sm text-gray-500">
                <FontAwesomeIcon icon={faLocation} className="mr-1" />
                {project.location}
              </p>
              <div className="mt-2 flex justify-end">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  {deleteProject ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                  ) : (
                    <FontAwesomeIcon icon={faTrash} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="px-4 py-3">
              <h3 className="text-md font-semibold text-gray-800 mb-3">
                Create New Project
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="col-span-2">
                  <label className="block text-sm text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject({ ...newProject, title: e.target.value })
                    }
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newProject.Category}
                    onChange={(e) =>
                      setNewProject({ ...newProject, Category: e.target.value })
                    }
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newProject.location}
                    onChange={(e) =>
                      setNewProject({ ...newProject, location: e.target.value })
                    }
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">
                    Time Frame
                  </label>
                  <input
                    type="text"
                    value={newProject.timeFrame}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        timeFrame: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">Impact</label>
                  <input
                    type="text"
                    value={newProject.Impact}
                    onChange={(e) =>
                      setNewProject({ ...newProject, Impact: e.target.value })
                    }
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-sm resize-none"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProject}
                  className="px-4 py-2 text-sm rounded-md bg-cyan-600 text-white hover:bg-cyan-700"
                >
                  {creatingProject ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Creating...
                    </div>
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharityProjects;
