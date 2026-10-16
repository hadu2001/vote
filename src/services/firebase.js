import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Cấu hình Firebase thực tế của dự án vote-11e16
export const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyD9mqqnEEtiqzDNwoSO14sW_vfr1jESGag",
  authDomain: "vote-11e16.firebaseapp.com",
  projectId: "vote-11e16",
  storageBucket: "vote-11e16.firebasestorage.app",
  messagingSenderId: "848149999029",
  appId: "1:848149999029:web:af5c95f0de3d2229987dfc",
  measurementId: "G-ZYK23Q7E5J"
};

export function getFirebaseConfig() {
  const saved = localStorage.getItem("namhai_firebase_config");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Lỗi parse firebase config từ localStorage", e);
    }
  }

  // Đọc từ biến môi trường nếu có, nếu không thì dùng config mặc định
  if (import.meta.env && import.meta.env.VITE_FIREBASE_API_KEY) {
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    };
  }

  return DEFAULT_FIREBASE_CONFIG;
}

export function initFirebase() {
  const config = getFirebaseConfig();
  if (!config || !config.apiKey) {
    return null;
  }

  try {
    const app = getApps().length === 0 ? initializeApp(config) : getApp();
    const db = getFirestore(app);
    return { app, db };
  } catch (error) {
    console.warn("Không thể khởi tạo Firebase:", error);
    return null;
  }
}
