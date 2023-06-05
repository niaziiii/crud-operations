import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import Link from "next/link";
import React from "react";
import custom from "../../styles/custom.module.css";

const Footer = () => {
  return (
    <Container
      sx={{
        textAlign: "center",
        padding: ".5rem",
        backgroundColor: "#2C3333",
      }}
      maxWidth="xl"
    >
      <Typography className={custom.lightColor}>
        copyright by
        <Link target="_blank" href={"https://mobile.twitter.com/muhabatniazi/"}>
          @muhabatNiazi
        </Link>
      </Typography>
    </Container>
  );
};

export default Footer;
