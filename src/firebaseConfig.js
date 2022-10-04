import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1sbMx1Qrmgx4_ekAPUeg5tJ_L_RR0zpw",
  authDomain: "minibasketball-36142.firebaseapp.com",
  projectId: "minibasketball-36142",
  storageBucket: "minibasketball-36142.appspot.com",
  messagingSenderId: "521239375053",
  appId: "1:521239375053:web:7ec880dc606a6024ce4d84",
  measurementId: "G-TC1YKXZCYG",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(app);
