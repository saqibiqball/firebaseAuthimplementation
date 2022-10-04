import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { FaBattleNet } from "react-icons/fa";
export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "#D07000" }} position="static">
        <Toolbar>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1, mt:1 }}>
            <FaBattleNet />
          </Typography>
          <Button
            sx={{ backgroundColor: "#553939", width:"90px" }}
            variant="outlined"
            color="inherit"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? (
              <Link
                to="register"
                style={{ textDecoration: "none", color: "white" }}
              >
                Register
              </Link>
            ) : (
              <Link
                to="login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Login
              </Link>
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
