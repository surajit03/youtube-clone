import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAupJCyy4cWfZhtjfLHa8oOaQup171gTeA",
  authDomain: "video-9b42d.firebaseapp.com",
  projectId: "video-9b42d",
  storageBucket: "video-9b42d.appspot.com",
  messagingSenderId: "448857761002", 
  appId: "1:448857761002:web:1a7662349deb9426432393"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app; 

