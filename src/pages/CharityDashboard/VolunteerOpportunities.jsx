import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaClock,
  FaTrashAlt,
  FaTimes,
} from "react-icons/fa";
import { useUserAuth } from "../../context/authcontext";
import { ref, push, onValue, remove, set, get } from "firebase/database";
import { database } from "../../Components/firebase";

export default function VolunteerOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOpportunity, setNewOpportunity] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    applicants: 0,
    duration: "",
    status: "active",
  });
  const [editOpportunityId, setEditOpportunityId] = useState(null);
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("Unknown Charity");

  // Fetch charity name once on mount or user change
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

  // Listen to all global opportunities (filtered by this charity if needed)
  useEffect(() => {
    if (!user) return;
    setLoading(true);

    // Fetch all opportunities globally, then filter client-side by charityId if you want
    const oppsRef = ref(database, "opportunities");
    const unsubscribe = onValue(oppsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.entries(data)
          .map(([id, value]) => ({
            id,
            ...value,
          }))
          // Optional: only show opportunities that belong to current charity
          .filter((opp) => opp.charityId === user.uid);
        setOpportunities(parsed);
      } else {
        setOpportunities([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  // Filtered and searched opportunities
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesStatus = filterStatus === "all" || opp.status === filterStatus;
    const matchesSearch = opp.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  function resetForm() {
    setNewOpportunity({
      title: "",
      description: "",
      date: "",
      location: "",
      applicants: 0,
      duration: "",
      status: "active",
    });
    setEditOpportunityId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;

    const charityId = user.uid;
    const charityName = name || "Unnamed Charity";

    // Generate new opportunity id
    const globalOppsRef = ref(database, "opportunities");
    const newOppRef = push(globalOppsRef);
    const opportunityId = newOppRef.key;

    const opportunityData = {
      ...newOpportunity,
      id: opportunityId,
      charityId,
      charityName,
    };

    // Save only under global opportunities node
    await set(newOppRef, opportunityData);

    console.log("Opportunity created:", opportunityData);

    setIsCreateModalOpen(false);
    resetForm();
  }

  async function handleDelete(id) {
    if (!user) return;

    // Delete from global opportunities node only
    const deleteGlobalRef = ref(database, `opportunities/${id}`);
    await remove(deleteGlobalRef);
  }

  return (
    <div className="p-6">
      {/* Header and New Opportunity Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Opportunities</h1>
        <button
          onClick={() => {
            resetForm();
            setIsCreateModalOpen(true);
          }}
          className="inline-flex items-center rounded bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700"
        >
          <FaPlus className="mr-2" />
          New Opportunity
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded border pr-6 border-gray-300 bg-white py-2 px-3 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        >
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Opportunities List */}
      {loading ? (
        <div className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent"></div>
          <p className="text-sm text-gray-500 mt-2">Loading Opportunities...</p>
        </div>
      ) : filteredOpportunities.length === 0 ? (
        <div className="col-span-full text-center text-gray-500 py-10">
          No opportunities found.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {filteredOpportunities.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10">
              No opportunities found.
            </div>
          ) : (
            filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="relative h-40 border rounded shadow-sm p-4 bg-white"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{opp.title}</h3>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                      opp.status === "active"
                        ? "bg-green-100 text-green-700"
                        : opp.status === "closed"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {opp.status}
                  </span>
                </div>

                <div className="space-y-1 text-sm text-gray-700">
                  <p className="">{opp.description}</p>
                  <div className="absolute bottom-5 flex place-items-center gap-8">
                    <p className="flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400 text-base" />
                      {opp.date}
                    </p>
                    <p className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-400 text-base" />
                      {opp.location}
                    </p>
                    <p className="flex items-center gap-1">
                      <FaUsers className="text-gray-400 text-base" />
                      {opp.applicants} applicants needed
                    </p>
                    <p className="flex items-center gap-1">
                      <FaClock className="text-gray-400 text-base" />
                      {opp.duration}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-4 right-5">
                  <button
                    onClick={() => handleDelete(opp.id)}
                    className="flex items-center justify-center rounded bg-red-600 px-3 py-1 text-white text-sm hover:bg-red-700"
                    title="Delete"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Create Opportunity</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={newOpportunity.title}
                  onChange={(e) =>
                    setNewOpportunity({
                      ...newOpportunity,
                      title: e.target.value,
                    })
                  }
                  required
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={newOpportunity.description}
                  onChange={(e) =>
                    setNewOpportunity({
                      ...newOpportunity,
                      description: e.target.value,
                    })
                  }
                  required
                  rows={3}
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={newOpportunity.date}
                  onChange={(e) =>
                    setNewOpportunity({
                      ...newOpportunity,
                      date: e.target.value,
                    })
                  }
                  required
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={newOpportunity.location}
                  onChange={(e) =>
                    setNewOpportunity({
                      ...newOpportunity,
                      location: e.target.value,
                    })
                  }
                  required
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label
                  htmlFor="applicants"
                  className="block text-sm font-medium text-gray-700"
                >
                  Applicants needed
                </label>
                <input
                  id="applicants"
                  type="number"
                  min="0"
                  value={newOpportunity.applicants}
                  onChange={(e) =>
                    setNewOpportunity({
                      ...newOpportunity,
                      applicants: Number(e.target.value),
                    })
                  }
                  required
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700"
                >
                  Duration
                </label>
                <input
                  id="duration"
                  type="text"
                  value={newOpportunity.duration}
                  onChange={(e) =>
                    setNewOpportunity({
                      ...newOpportunity,
                      duration: e.target.value,
                    })
                  }
                  required
                  placeholder="e.g. 3 hours"
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={newOpportunity.status}
                  onChange={(e) =>
                    setNewOpportunity({
                      ...newOpportunity,
                      status: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="active">Active</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    resetForm();
                  }}
                  className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-cyan-600 px-4 py-2 text-sm text-white hover:bg-cyan-700"
                >
                  {editOpportunityId === null ? "Create" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
