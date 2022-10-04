import React, { useState } from "react";
import { TextField, Box, Button, Alert, Slide } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
const usersCollectionRef = collection(db, "minibasketballuser");
function RegisterForm() {
  let navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [fieldAlert, setFieldAlert] = useState(false);
  const [addUserInDb, setAddUserInDb] = useState({
    name: "",
    email: "",
    pwd: "",
  });
  const createUser = async () => {
    setTimeout(() => {
      setFieldAlert(false);
      setErrorMsg(false);
    }, 4000);
    if (
      addUserInDb.name !== "" &&
      addUserInDb.email !== "" &&
      addUserInDb.pwd !== ""
    ) {
      setFieldAlert(false);
      // await addDoc(usersCollectionRef, addUserInDb);
      setLoader(true);
      createUserWithEmailAndPassword(auth, addUserInDb.email, addUserInDb.pwd)
        .then((res) => {
          setLoader(false);
          setFieldAlert(true);
          setErrorMsg(true);
          navigate("/login", { replace: true });
          updateProfile(res.user, {
            displayName: addUserInDb.name,
          });
        })
        .catch((error) => {
          setLoader(false);
          setFieldAlert(true);
          setErrorMsg(true);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      setFieldAlert(true);
      setLoader(false);
    }
  };
  return (
    <>
      {" "}
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
              setAddUserInDb({ ...addUserInDb, name: e.target.value });
            }}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setAddUserInDb({ ...addUserInDb, email: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => {
              setAddUserInDb({ ...addUserInDb, pwd: e.target.value });
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
            onClick={createUser}
          >
            Register
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
            {errorMsg
              ? "Email is already in use"
              : "Please fill all the fields"}
          </Alert>
        </Slide>
      ) : (
        ""
      )}
    </>
  );
}

export default RegisterForm;
