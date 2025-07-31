import React, { useEffect, useState } from "react";
import { ref, onValue, set, get, runTransaction } from "firebase/database";
import { database } from "../../Components/firebase";
import { useUserAuth } from "../../context/authcontext";

function Volunteers() {
  const { user } = useUserAuth();
  const [applicants, setApplicants] = useState([]);
  const [opportunityTitles, setOpportunityTitles] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const oppsRef = ref(database, "opportunities");

    const unsubscribeOpps = onValue(oppsRef, async (snapshot) => {
      const data = snapshot.val();
      const titles = {};
      const oppIds = [];

      if (data) {
        Object.entries(data).forEach(([id, opp]) => {
          if (opp.charityId === user.uid) {
            titles[id] = opp.title;
            oppIds.push(id);
          }
        });

        setOpportunityTitles(titles);

        const appsRef = ref(database, "applications_flat");
        const appsSnapshot = await get(appsRef);
        const appsData = appsSnapshot.val();
        const result = [];

        if (appsData) {
          const userPromises = oppIds.flatMap((oppId) => {
            const oppApps = appsData[oppId];
            if (!oppApps) return [];

            return Object.entries(oppApps).map(async ([userId, app]) => {
              const userRef = ref(database, `users/${userId}`);
              const userSnapshot = await get(userRef);
              const userData = userSnapshot.val() || {};

              return {
                opportunityId: oppId,
                userId,
                name: userData.name || "Unknown",
                email: userData.email || "Unknown",
                appliedAt: app.appliedAt,
                status: app.status || "pending",
              };
            });
          });

          const applicants = await Promise.all(userPromises);
          setApplicants(applicants);
        } else {
          setApplicants([]);
        }

        setLoading(false);
      } else {
        setOpportunityTitles({});
        setApplicants([]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeOpps();
    };
  }, [user]);

  const handleUpdateStatus = async (oppId, userId, status) => {
    const appRef = ref(database, `applications_flat/${oppId}/${userId}`);

    // Get the current application data
    const snapshot = await get(appRef);
    if (!snapshot.exists()) return;

    const currentData = snapshot.val();

    const updated = {
      ...currentData,
      status,
    };

    // ✅ Update the application with the new status
    await set(appRef, updated);

    // ✅ If approved, do the extra updates
    if (status === "approved") {
      // 1. Add volunteer under the charity's node
      const volunteerRef = ref(
        database,
        `users/${user.uid}/volunteers/${userId}`
      );
      await set(volunteerRef, {
        opportunityId: oppId,
        approvedAt: new Date().toISOString(),
      });

      // 2. Increment volunteer count
      await runTransaction(
        ref(database, `users/${user.uid}/volunteersCount`),
        (current) => (current || 0) + 1
      );

      // 3. Increment applied count in the opportunity
      await runTransaction(
        ref(database, `opportunities/${oppId}/appliedCount`),
        (current) => (current || 0) + 1
      );

      // 4. Close opportunity if full
      const oppSnapshot = await get(ref(database, `opportunities/${oppId}`));
      if (oppSnapshot.exists()) {
        const opp = oppSnapshot.val();
        if ((opp.appliedCount || 0) >= opp.applicants) {
          await set(ref(database, `opportunities/${oppId}/status`), "closed");
        }
      }
    }

    setApplicants((prev) =>
      prev.map((a) =>
        a.opportunityId === oppId && a.userId === userId ? { ...a, status } : a
      )
    );
  };

  if (loading)
    return <p className="text-center mt-10">Loading applicants...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Volunteer Applicants</h2>
      {applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Email</th>
                <th className="border px-3 py-2">Opportunity</th>
                <th className="border px-3 py-2">Applied At</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((app) => (
                <tr
                  key={`${app.userId}-${app.opportunityId}`}
                  className="border-t"
                >
                  <td className="px-3 py-2">{app.name}</td>
                  <td className="px-3 py-2">{app.email}</td>
                  <td className="px-3 py-2">
                    {opportunityTitles[app.opportunityId] || app.opportunityId}
                  </td>
                  <td className="px-3 py-2">
                    {new Date(app.appliedAt).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 capitalize">{app.status}</td>
                  <td className="px-3 py-2 space-x-2">
                    {app.status === "pending" ? (
                      <>
                        <button
                          onClick={() =>
                            handleUpdateStatus(
                              app.opportunityId,
                              app.userId,
                              "approved"
                            )
                          }
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(
                              app.opportunityId,
                              app.userId,
                              "declined"
                            )
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500 capitalize">
                        {app.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Volunteers;
