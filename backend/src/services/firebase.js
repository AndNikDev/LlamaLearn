const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDkm2ACT9RBJ7qcy3TSMy3QICII0h8brDU",
  authDomain: "llamalearn-f30f5.firebaseapp.com",
  projectId: "llamalearn-f30f5",
  storageBucket: "llamalearn-f30f5.firebasestorage.app",
  messagingSenderId: "895899071188",
  appId: "1:895899071188:web:6660d361d0859489df4141",
  measurementId: "G-0B6HGB632F",
};

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);
let analytics;

if (typeof window !== "undefined") {
  analytics = getAnalytics(firebaseApp);
}

module.exports = { firebaseApp, analytics };
