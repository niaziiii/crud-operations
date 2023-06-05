import { Box, Grid, Modal, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { homeStyle } from "./utilties";
import FilterEntites from "../Filter/FilterEntites";
import AgGrid from "../Table/AgGrid";
import MyContext from "../../context-api/AppContext";
import { EntitiesDataType } from "../../context-api/AppContext";
import Form from "../Forms";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getItems } from "../helper";

const HomeContent = (): JSX.Element => {
  const { state, dispatch } = useContext(MyContext);
  const entries: EntitiesDataType[] = state.allData;
  const [data, setdata] = useState<EntitiesDataType[]>([]);
  const { user, isLoading } = useUser();

  const closePopupModal = (): void => {
    dispatch({ type: "CLOSE__MODAL" });
  };

  useEffect(() => {
    setdata(state.allData);

    (async () => {
      try {
        const data = await getItems("/api/v1");
        dispatch({
          type: "SET_DATA",
          payload: data.data as EntitiesDataType[],
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  if (!user)
    return (
      <Container sx={homeStyle.loginInfo}>
        <Typography
          variant="h5"
          component="a"
          href="/api/auth/login"
          className="blacklink"
        >
          Login to access the page
        </Typography>
      </Container>
    );

  return (
    <Container sx={{ minHeight: "85vh" }} maxWidth="xl">
      {/* poup modal for form/map */}
      <Modal
        open={state.isModalShow}
        onClose={closePopupModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={homeStyle.styleBox}>
          <Form data={state.show ? state.show : null} />;
        </Box>
      </Modal>

      {/* container to show entities in ag-grid */}
      <Container
        sx={{ marginTop: "4vh", padding: "0% !important" }}
        maxWidth="xl"
      >
        <Grid container spacing={2}>
          <Grid item lg={3} xs={12}>
            <FilterEntites setEntries={setdata} entries={entries} />
          </Grid>
          <Grid item lg={9} xs={12}>
            <AgGrid />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default HomeContent;
