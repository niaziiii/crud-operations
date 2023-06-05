import { Chip, Typography, Paper } from "@mui/material";
import React, { useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import MyContext from "../../context-api/AppContext";
import { deleteItems } from "../helper";
import Image from "next/image";
import { EntitiesDataType } from "../../context-api/AppContext";
const IsProfile = ({ p }: { p: any }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <Image
        src={`/uploads/images/${p.data.image}`}
        alt="Profile Image"
        width={40}
        height={40}
      />
      <Typography>{p.data.name}</Typography>
    </div>
  );
};

const IsGraduate = ({ p }: { p: any }) => {
  if (!p.data.graduate)
    return (
      <Chip sx={{ marginTop: "-.3rem" }} color="error" label="Not Graduate" />
    );
  return (
    <Chip
      sx={{ marginTop: "-.3rem" }}
      label="Yes Graduate"
      color="primary"
      variant="outlined"
    />
  );
};

const IsActions = ({ p }: { p: any }) => {
  const { state, dispatch } = useContext(MyContext);

  const showModal = () => {
    const data: any = {
      ...p.data,
      joining: formIntoDate(p.data.joining),
    };

    dispatch({ type: "UPDATE_SHOW", payload: data });
    dispatch({ type: "SHOW__MODAL" });
  };
  return (
    <>
      <EditIcon
        onClick={showModal}
        sx={{ cursor: "pointer", marginTop: ".5rem" }}
      />

      <DeleteIcon
        className="link-delete"
        onClick={async () => {
          const data = await deleteEntry(p.data._id);
          console.log(data);
          if (data?.acknowledged)
            dispatch({ type: "REMOVE_ENTITY", payload: p.data._id });
        }}
        sx={{ cursor: "pointer", marginLeft: ".5rem" }}
      />
    </>
  );
};

const deleteEntry = async (entry: string) => {
  const form: any = new FormData();
  form.append("id", entry);
  try {
    const req = await deleteItems("/api/v1", form);
    return req.data.data;
  } catch (error) {
    console.log(error);
  }
};
const columnDefs = [
  {
    field: "name",
    headerName: "Profile",
    cellRenderer: (p: any) => (
      <>
        <IsProfile p={p} />
      </>
    ),
  },
  { field: "gender", headerName: "Gender" },
  { field: "status", headerName: "Status", resizable: true },
  {
    field: "graduate",
    headerName: "Education",
    cellRenderer: (p: any) => (
      <>
        <IsGraduate p={p} />
      </>
    ),
  },
  { field: "joining", headerName: "Joining Date" },
  {
    field: "action",
    headerName: "Actions",
    cellRenderer: (p: any) => (
      <>
        <IsActions p={p} />
      </>
    ),
  },
];

const formIntoDate = (joining: string): string => {
  const originalDate: Date = new Date(joining);
  const year: number = originalDate.getFullYear();
  const month: number = originalDate.getMonth() + 1;
  const day: number = originalDate.getDate();
  const newDateString: string = `${year}-${month
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

  return newDateString as string;
};
export { IsGraduate, IsActions, columnDefs, deleteEntry };
