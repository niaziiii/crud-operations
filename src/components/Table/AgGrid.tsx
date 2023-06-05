import { Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState, useMemo, SetStateAction, useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { columnDefs } from "./utilties";
import MyContext from "../../context-api/AppContext";

const AgGrid = (): JSX.Element => {
  const [gridApi, setGridApi] = useState<SetStateAction<null | any>>(null);
  const [_, setGridColumnApi] = useState<SetStateAction<null | any>>(null);
  const { state, dispatch } = useContext(MyContext);

  function onGridReady(params: any) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }
  const onFilterTextChange = (e: any) =>
    gridApi.setQuickFilter(e.target.value as any);
  const defaultColDef = useMemo(() => ({ flex: 1, sortable: true }), []);

  return (
    <Container
      sx={{ overflow: "hidden", pl: "0% !important", pr: "0% !important" }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: "0% !important",
          zIndex: "1000",
          overflow: "hidden !important",
          border: "1px solid black",
          borderRadius: "0px",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            background: "#2C3333",
            padding: ".3rem",
            color: "white",
          }}
          alignItems={"center"}
        >
          <Grid item xs={6} md={8}>
            <Typography variant="h5" fontWeight={600} pl={2}>
              Ag Grid
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              onChange={onFilterTextChange}
              size="small"
              type="search"
              placeholder="Search something..."
              sx={{
                width: "100%",
                pl: "0% !important",
                pr: "0% !important",
                background: "white",
                border: "none !important",
                outline: "none",

                overflow: "hidden !important",
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                  "&:active fieldset": {
                    border: "none",
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      <div
        className="wrapper"
        style={{
          overflow: "auto",
          marginTop: "-.4rem",
          background: "#2C3333",
          paddingTop: ".4rem",
        }}
      >
        <Paper
          className="ag-theme-alpine"
          style={{
            height: 450,
            width: "auto",
            minWidth: "100%",
          }}
        >
          <AgGridReact
            rowData={state.allData}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            defaultColDef={defaultColDef}
            animateRows={true}
          />
        </Paper>
      </div>
    </Container>
  );
};

export default AgGrid;
