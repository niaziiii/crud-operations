import React from "react";
import { Paper, Typography, IconButton } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { MarkerDataType } from "../util";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type MapListsProps = {
  data: MarkerDataType[];
  changePosition: (position: number[]) => void;
  handleDelete: (id: string) => void;
};

const paperStyle = {
  borderBottom: "1px solid white",
  padding: ".5rem",
  marginBottom: ".1rem",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  backgroundColor: "#f7f5f5",
};

const addressStyle = {
  fontSize: "1rem",
  display: "flex",
  alignItems: "center",
  lineHeight: "1.3rem",
  marginRight: "auto",
  cursor: "pointer",
  fontWeight: "500",
};
const paperHeading = {
  fontSize: ".8rem",
  fontWeight: "700",
  backgroundColor: "#2C3333",
  color: "white",
  textAlign: "center",
  padding: "10px",
  borderRadius: "0%",
  display: "flex",
  gap: "10px",
  alignItems: "center",
  borderTop: "1px solid grey",
  justifyContent: "center",
};

function MapLists({
  data,
  changePosition,
  handleDelete,
}: MapListsProps): JSX.Element {
  const handleEdit = (data: any) => {
    changePosition([data.latCoord, data.longCoord]);
  };
  return (
    <>
      <Paper sx={paperHeading}>
        <PublicIcon />
        <Typography variant="h6">Our Locations</Typography>
      </Paper>

      {data.map((elem, i) => {
        if (elem.id === null) return;
        return (
          <Paper elevation={3} sx={paperStyle} key={i}>
            <Typography
              variant="h6"
              sx={addressStyle}
              onClick={() => {
                changePosition([elem.latCoord, elem.longCoord]);
              }}
            >
              {elem.address}
            </Typography>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleEdit(elem)}
            >
              <EditIcon sx={{ cursor: "pointer", color: "green" }} />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(elem.id as string)}
            >
              <DeleteIcon sx={{ cursor: "pointer", color: "#d32f2f" }} />
            </IconButton>
          </Paper>
        );
      })}
    </>
  );
}

export default MapLists;
