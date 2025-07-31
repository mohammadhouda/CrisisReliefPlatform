// src/contexts/UserAuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth, database } from "../Components/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { ref, get } from "firebase/database";
import Spinner from "../Components/Spinner";

const UserAuthContext = createContext();

export function useUserAuth() {
  return useContext(UserAuthContext);
}

export function UserAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            const userRef = ref(database, `users/${currentUser.uid}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
              const userData = snapshot.val();
              const userRole = userData.role;
              if (userRole === "user" || userRole === "charity") {
                setUser(currentUser);
                setRole(userRole);
              } else {
                await signOut(auth);
                setUser(null);
                setRole(null);
              }
            } else {
              await signOut(auth);
              setUser(null);
              setRole(null);
            }
          } catch (error) {
            console.error("Error fetching user role:", error);
            await signOut(auth);
            setUser(null);
            setRole(null);
          }
        } else {
          setUser(null);
          setRole(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    });
  }, []);

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;
    const snapshot = await get(ref(database, `users/${userId}`));
    if (snapshot.exists()) {
      const userRole = snapshot.val().role;
      if (userRole === "user" || userRole === "charity") {
        setRole(userRole);
        return userRole;
      } else {
        throw new Error("Unauthorized role");
      }
    } else {
      throw new Error("No user data found");
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
  };

  return (
    <UserAuthContext.Provider
      value={{ user, role, login, logout, setUser, setRole }}
    >
      {!loading ? children : <Spinner />}
    </UserAuthContext.Provider>
  );
}
