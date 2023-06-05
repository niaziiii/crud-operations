import { Container } from "@mui/system";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button, Grid } from "@mui/material";
import Search from "./Search";

const icon = L.icon({
  iconUrl: "../marker.png",
});

type LatLngExpression = [number, number] | { lat: number; lng: number };

type MaptyProps = {
  coordinates: LatLngExpression | any;
  showSide: Dispatch<number>;
  setCoordinates: Dispatch<number[] | string[] | null>;
};

const Mapty = ({ coordinates, setCoordinates, showSide }: MaptyProps) => {
  const [query, setQuery] = useState("");
  const center: LatLngExpression = [31.5656822, 74.3141829];

  const handleQueryChange = (event: any) => {
    setQuery(event.target.value);
  };

  function ResetCenterView(props: any) {
    const { selectPosition }: { selectPosition: number[] } = props;
    const map = useMap();

    useEffect(() => {
      if (selectPosition) {
        map.setView(
          L.latLng(selectPosition[0], selectPosition[1]),
          map.getZoom(),
          {
            animate: true,
          }
        );
      }
      setCoordinates(selectPosition);
    }, [selectPosition]);

    return null;
  }

  return (
    <Container maxWidth="xl" sx={{ overflow: "scroll", p: "0% !important" }}>
      <Grid container spacing={1} sx={{ marginTop: "0rem" }}>
        <Grid xs={12} md={4} item sx={{ pt: "0%" }}>
          <Search
            query={query}
            setQuery={handleQueryChange as any}
            setCenter={setCoordinates as any}
          />
        </Grid>
        <Grid xs={12} md={8} item>
          <Container maxWidth="xl" sx={{ height: "70vh", p: "0% !important" }}>
            <MapContainer
              center={coordinates ? coordinates : center}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: "100%", zIndex: "1" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=l8wW4tfLRPMq63M1JG5j"
              />
              <Marker position={coordinates ? coordinates : center} icon={icon}>
                <Popup>
                  Coordinates are
                  {coordinates
                    ? [coordinates[0].toString(), coordinates[1]].toString()
                    : center.toString()}
                </Popup>
              </Marker>
              <ResetCenterView
                selectPosition={coordinates ? coordinates : center}
              />
            </MapContainer>
          </Container>
        </Grid>
      </Grid>
      <Container sx={{ textAlign: "end", mt: "1rem", pr: "0px important" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "auto",
            color: "white",
            background: "primary",
            fontWeight: "700",
          }}
          onClick={() => showSide(0)}
        >
          Confirm Location
        </Button>
      </Container>
    </Container>
  );
};

export default Mapty;
