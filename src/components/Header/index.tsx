import React, { useContext } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MyContext from "../../context-api/AppContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import AdbIcon from "@mui/icons-material/Adb";
import { Typography, Container, Button, Toolbar, AppBar } from "@mui/material";
import { headerStyle } from "./Utilties";
import Profile from "./Profile";
import Link from "next/link";
import AddLocationIcon from "@mui/icons-material/AddLocation";

function HeaderApp() {
  const { dispatch } = useContext(MyContext);
  const { user } = useUser();

  const openPopupModal = (): void => {
    dispatch({ type: "SHOW__MODAL" });
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography variant="h6" noWrap sx={headerStyle.typo1}>
            <Link href="/">LOGO</Link>
          </Typography>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography variant="h5" noWrap sx={headerStyle.typo2}>
            <Link href="/">LOGO</Link>
          </Typography>

          <Button
            endIcon={<AddLocationIcon />}
            variant="outlined"
            sx={{
              ml: "auto",
              color: "white",
              fontWeight: 400,
              fontSize: "1rem",
            }}
          >
            <Link href="/addresses">MAP</Link>
          </Button>

          <Button
            onClick={openPopupModal}
            endIcon={<AddCircleIcon />}
            sx={headerStyle.btn}
          >
            Add Users
          </Button>

          {user ? (
            <Profile />
          ) : (
            <Button variant="contained" sx={{ ml: 4, color: "white" }}>
              <Link href="/api/auth/login">Login</Link>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderApp;
