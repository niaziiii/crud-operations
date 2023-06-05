import dynamic from "next/dynamic";
import React, { useState, useEffect, SetStateAction } from "react";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import MapLists from "../../components/address-2/lists";
import SearchMapShow from "../../components/address-2/search";
import { getItems, postItems, deleteItems } from "../../components/helper";
import { MarkerDataType, wrapperStyle } from "../../components/address-2/util";
import Dispatch from "react";
const MapShow = dynamic(() => import("../../components/address-2/map"), {
  ssr: false,
});

const index = (): JSX.Element => {
  const [markerData, setMarkerData] = useState<MarkerDataType[] | []>([]);
  const [centerData, setCenterData] = useState([36.151182, -16.644407]);

  useEffect(() => {
    (async function () {
      const data = await getItems("/api/positions");
      setMarkerData(data.data.reverse());
    })();
  }, []);

  const changePosition = (positions: number[]) => setCenterData(positions);

  const changeSetMarkerData = async (result: MarkerDataType) => {
    await postItems("/api/positions", result);
    setMarkerData((prev) => [result, ...prev]);
  };

  const handleDelete = async (id: string) => {
    const body = { id: id };
    const res = await deleteItems("/api/positions", body);
    setMarkerData(res.data.data);
    setCenterData([31.5656822, 74.3141829]);
  };
  return (
    <Container maxWidth="lg" sx={wrapperStyle}>
      <Container
        maxWidth="xl"
        sx={{
          marginTop: "-2rem",
          padding: "1rem !important",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <Grid
          container
          sx={{ overflow: "hidden", boxShadow: "0 0 1px 1px #dddddd" }}
        >
          <Grid
            item
            xs={5}
            md={3}
            sx={{
              overflowY: "auto",
              overflowX: "hidden",
              height: "70vh",
              paddingRight: ".1rem",
            }}
          >
            <MapLists
              changePosition={changePosition}
              handleDelete={handleDelete}
              data={markerData}
            />
          </Grid>
          <Grid item xs={7} md={9} sx={{ position: "relative" }}>
            <SearchMapShow
              changeSetMarkerData={changeSetMarkerData}
              changePosition={changePosition}
              setMarkerData={setMarkerData}
            />
            <MapShow data={markerData} center={centerData} />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default index;
