import React, { useState } from "react";
import { TextField, Box, Button, Alert, Slide } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const usersCollectionRef = collection(db, "minibasketballuser");
const auth = getAuth();

function LoginForm() {
  let navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [fieldAlert, setFieldAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [getUserFromDb, setgetUserFromDb] = useState({
    name: "",
    email: "",
    pwd: "",
  });
  const getUser = async () => {
    setTimeout(() => {
      setFieldAlert(false);
      setErrorMsg(false);
    }, 4000);
    if (
      getUserFromDb.name !== "" &&
      getUserFromDb.email !== "" &&
      getUserFromDb.pwd !== ""
    ) {
      setFieldAlert(false);
      setLoader(true);
      signInWithEmailAndPassword(auth, getUserFromDb.email, getUserFromDb.pwd)
        .then((userCredential) => {
          const user = userCredential.user;
          // Signed in
          if (getUserFromDb.name === user.displayName) {
            setLoader(false);
            navigate("/dashboard", { replace: true });
          } else {
            setLoader(false);
            setFieldAlert(true);
            setErrorMsg(true);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          setLoader(false);
          setFieldAlert(true);
          setErrorMsg(true);
          console.log(errorCode);
        });
    } else {
      setFieldAlert(true);
      setLoader(false);
    }
  };
  return (
    <>
      <Box sx={{ mt: 10 }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "50ch", mt: 1, ml: 60 },
            display: "flex",
            flexFlow: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(e) => {
              setgetUserFromDb({ ...getUserFromDb, name: e.target.value });
            }}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setgetUserFromDb({ ...getUserFromDb, email: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => {
              setgetUserFromDb({ ...getUserFromDb, pwd: e.target.value });
            }}
          />
        </Box>
        {loader ? (
          <CircularProgress color="warning" />
        ) : (
          <Button
            variant="outlined"
            color="inherit"
            sx={{ backgroundColor: "#553939" }}
            onClick={getUser}
          >
            Login
          </Button>
        )}
      </Box>
      {fieldAlert ? (
        <Slide direction="right" in={fieldAlert} mountOnEnter unmountOnExit>
          <Alert
            severity="warning"
            variant="filled"
            sx={{ width: "30%", mt: "25vh" }}
          >
            {errorMsg ? "wrong credentials" : "Please fill all the fields"}
          </Alert>
        </Slide>
      ) : (
        ""
      )}
    </>
  );
}

export default LoginForm;
