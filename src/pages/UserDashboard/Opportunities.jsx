import React, { useEffect, useState } from "react";
import { ref, onValue, set, get } from "firebase/database";
import { database } from "../../Components/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserAuth } from "../../context/authcontext";
import {
  faLocation,
  faCalendar,
  faClock,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("Unknown User");
  const [popupMessage, setPopupMessage] = useState("");
  const [appliedIds, setAppliedIds] = useState([]);
  const { user } = useUserAuth();

  useEffect(() => {
    let isMounted = true;
    const fetchName = async () => {
      if (!user) return;
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);
      if (isMounted && snapshot.exists()) {
        setName(snapshot.val().name || "Unknown User");
      }
    };
    fetchName();
    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    const oppsRef = ref(database, "opportunities");
    const unsubscribe = onValue(oppsRef, (snapshot) => {
      const data = snapshot.val();
      const parsed = data
        ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
        : [];
      setOpportunities(parsed);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user?.uid) return;

    const appsRef = ref(database, "applications_flat");
    const unsubscribe = onValue(appsRef, (snapshot) => {
      const data = snapshot.val();
      const userAppliedIds = [];

      if (data) {
        Object.entries(data).forEach(([oppId, users]) => {
          if (users && users[user.uid]) {
            userAppliedIds.push(oppId);
          }
        });
      }

      setAppliedIds(userAppliedIds);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  function showPopup(message) {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 3000);
  }

  function handleApply(opportunityId) {
    if (!user) return showPopup("Please sign in to apply.");

    const appRef = ref(
      database,
      `applications_flat/${opportunityId}/${user.uid}`
    );

    get(appRef).then(async (snapshot) => {
      if (snapshot.exists()) {
        showPopup("You've already applied to this opportunity.");
      } else {
        const oppRef = ref(database, `opportunities/${opportunityId}`);
        const oppSnapshot = await get(oppRef);

        if (!oppSnapshot.exists()) {
          showPopup("Opportunity not found.");
          return;
        }

        const opp = oppSnapshot.val();
        const currentCount = opp.appliedCount || 0;

        if (opp.status === "closed" || currentCount >= opp.applicants) {
          showPopup("This opportunity is already full.");
          return;
        }

        // Save under applications_flat/opportunityId/userId
        await set(appRef, {
          opportunityId,
          userId: user.uid,
          name,
          email: user.email,
          appliedAt: new Date().toISOString(),
          status: "pending",
        });

        // Close if full
        if (currentCount >= opp.applicants) {
          await set(
            ref(database, `opportunities/${opportunityId}/status`),
            "closed"
          );
        }

        showPopup("Application submitted! Waiting for approval.");
      }
    });
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {popupMessage && (
        <div className="fixed top-5 right-5 bg-cyan-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {popupMessage}
        </div>
      )}
      {opportunities.map((opp) => {
        const alreadyApplied = appliedIds.includes(opp.id);
        const isClosed = opp.status === "closed";

        return (
          <div
            key={opp.id}
            className="bg-white p-4 rounded shadow border border-gray-200 space-y-2 text-cyan-500"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{opp.title}</h2>
              <p
                className={`text-xs rounded-full py-1 px-2 ${
                  isClosed
                    ? "bg-red-100 text-red-500"
                    : "bg-green-100 text-green-500"
                }`}
              >
                {opp.status}
              </p>
            </div>
            <p className="text-gray-700">{opp.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              <FontAwesomeIcon icon={faLocation} /> {opp.location}
              <FontAwesomeIcon className="ml-2" icon={faCalendar} /> {opp.date}
            </p>
            <p className="text-sm text-gray-500">
              <FontAwesomeIcon icon={faClock} /> Duration: {opp.duration}
            </p>
            <p className="text-sm text-gray-500">
              <FontAwesomeIcon icon={faUsers} /> Applicants:{" "}
              {opp.appliedCount || 0} / {opp.applicants}
            </p>
            <p className="text-sm text-gray-500">Posted by {opp.charityName}</p>
            <button
              onClick={() => handleApply(opp.id)}
              disabled={alreadyApplied || isClosed}
              className={`mt-2 px-4 py-1 rounded text-white ${
                alreadyApplied || isClosed
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-700"
              }`}
            >
              {isClosed
                ? "Closed"
                : alreadyApplied
                ? "Already Applied"
                : "Apply"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Opportunities;
