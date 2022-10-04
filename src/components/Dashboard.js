import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);
  const handleLogout = () => {
    auth.signOut();
    navigate("/login", { replace: true });
  };
  return (
    <>
      <h1>Hi! {userName}</h1>
      <h2>Wellcome to Dashboard</h2>
      <Button
        variant="outlined"
        color="inherit"
        sx={{ backgroundColor: "#553939" }}
        onClick={handleLogout}
      >
        LogOut
      </Button>
    </>
  );
}

export default Dashboard;
