import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, appleProvider, db } from "../firebase/firebase"; 
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- AUTH ACTIONS ---
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const loginWithApple = () => signInWithPopup(auth, appleProvider);
  const logout = () => signOut(auth);

  useEffect(() => {
    let unsubDoc = null; // To hold our Firestore listener

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      // If no user is logged in, stop loading and clear data
      if (!currentUser) {
        setUserData(null);
        setLoading(false);
        if (unsubDoc) unsubDoc(); // Clean up Firestore listener if it exists
        return;
      }

      // If user exists, check/create their profile in Firestore
      const userRef = doc(db, "users", currentUser.uid);
      
      try {
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            role: "user",
            phoneNumber: "",
            subCity: "",
            createdAt: new Date(),
          });
        }

        // Start real-time listener for user profile data
        unsubDoc = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            setUserData(doc.data());
          }
          setLoading(false); // Only stop loading once we have the data
        }, (error) => {
          console.error("Firestore Listener Error:", error);
          setLoading(false);
        });

      } catch (error) {
        console.error("Profile Setup Error:", error);
        setLoading(false);
      }
    });

    // Cleanup: Stop both Auth and Firestore listeners when component unmounts
    return () => {
      unsubscribeAuth();
      if (unsubDoc) unsubDoc();
    };
  }, []);

  const value = {
    user,
    userData,
    loading,
    loginWithGoogle,
    loginWithApple,
    logout,
    isAdmin: userData?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {/* This is the critical part: 
         If loading is true, we show nothing (or a spinner).
         Once loading is false, we show the app.
      */}
      {!loading ? children : (
        <div className="min-h-screen flex items-center justify-center bg-white">
           <div className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">
             Olens_System_Syncing...
           </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);