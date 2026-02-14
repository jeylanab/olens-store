import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDiX_lYegZ0IJRnxlOBt9qrEcJQdLd4080",
  authDomain: "olenstorev2.firebaseapp.com",
  projectId: "olenstorev2",
  storageBucket: "olenstorev2.firebasestorage.app",
  messagingSenderId: "797906329688",
  appId: "1:797906329688:web:8a5c8946cbec21c58aea2d"
};

// 1. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Export Services (Fixed and Verified)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// 3. Auth Providers
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com'); // Added for your Auth file

// 4. Analytics (Safe non-blocking initialization)
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app);
  });
}

export { analytics };
export default app;