import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import { deleteEntry } from "../Home/utilties";
import MyContext from "../../context-api/AppContext";
import Link from "next/link";
import Image from "next/image";
import { EntitiesDataType } from "../../context-api/AppContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2C3333",
    color: theme.palette.common.white,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type EntriesTable = {
  entries: EntitiesDataType[];
};
export default function EntriesTable({ entries }: EntriesTable) {
  const { dispatch } = useContext(MyContext);

  const setEditingRow = (row: EntitiesDataType) => {
    dispatch({ type: "UPDATE_SHOW", payload: row });
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow sx={{ fontWeight: 900 }}>
            <StyledTableCell>Profile</StyledTableCell>
            <StyledTableCell>Entry Name</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Gender</StyledTableCell>
            <StyledTableCell align="right">Phone Number</StyledTableCell>
            <StyledTableCell align="right">Joining Day</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right">Graduate</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries?.map((row, i) => {
            return (
              <StyledTableRow key={i}>
                <StyledTableCell>
                  <Image
                    src={`/uploads/images/${row.image}`}
                    alt="Profile Image"
                    width={40}
                    height={40}
                  />
                </StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.type}</StyledTableCell>
                <StyledTableCell align="right">{row.gender}</StyledTableCell>
                <StyledTableCell align="right">{row.phone}</StyledTableCell>
                <StyledTableCell align="right">{row.joining}</StyledTableCell>
                <StyledTableCell align="right">{row.age}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.graduate ? (
                    <Chip
                      label="Yes Graduate"
                      color="primary"
                      variant="outlined"
                    />
                  ) : (
                    <Chip color="error" label="Not Graduate" />
                  )}
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={{ display: "flex", gap: 2, padding: "2rem 0" }}
                >
                  <DeleteIcon
                    className="link-delete"
                    onClick={async () => {
                      const data = await deleteEntry(row._id as any);
                      dispatch({ type: "SET_DATA", payload: data });
                    }}
                    sx={{ cursor: "pointer" }}
                  />
                  <Link
                    className="link-edit"
                    href={`/${row.type == "Student" ? "student" : "user"}/edit`}
                    onClick={() => setEditingRow(row)}
                  >
                    <EditIcon sx={{ cursor: "pointer" }} />
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
