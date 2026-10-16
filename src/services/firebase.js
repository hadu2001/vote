import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Cấu hình Firebase có thể đọc từ biến môi trường Vite hoặc LocalStorage do Admin thiết lập
export function getFirebaseConfig() {
  const saved = localStorage.getItem("namhai_firebase_config");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Lỗi parse firebase config từ localStorage", e);
    }
  }

  // Fallback đọc từ import.meta.env
  if (import.meta.env.VITE_FIREBASE_API_KEY) {
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };
  }

  return null;
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
