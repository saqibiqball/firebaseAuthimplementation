import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./firebaseConfig";

const ProtectedRoutes = () => {
  const signInuser = auth.currentUser;
  console.log(signInuser);
  return signInuser !== null ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoutes;
