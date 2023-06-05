import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-controls/lib/controls.css";
import {
  ZoomControl,
  InspectControl,
  CompassControl,
} from "mapbox-gl-controls";

import { Container } from "@mui/material";
import MarkerPopup from "../popup/Popup";
import { LatLngExpression, MarkerDataType } from "../util";

const apiKey =
  "pk.eyJ1IjoiYmFzaXQ1MTYiLCJhIjoiY2xmNnQ2d2tjMTlhbzNzbzFwbDJ3N3BnMyJ9.1lQifImgO1e1XcdRuyL2IQ";

type MapShowType = {
  center: number[];
  data: MarkerDataType[];
};

const MapShow = ({ center, data }: MapShowType): JSX.Element => {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);

  const coordinates: LatLngExpression = [center[1], center[0]];
  useEffect(() => {
    mapboxgl.accessToken = apiKey;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: coordinates, // center map on  [lng,lat]
      zoom: 2,
    });

    // controlls
    map.current.addControl(new ZoomControl(), "top-right");
    map.current.addControl(new InspectControl(), "bottom-left");
    map.current.addControl(new CompassControl(), "top-right");

    data.map((el) => popuShowMarkerMessage([el.longCoord, el.latCoord]));
  }, []);

  useEffect(() => {
    if (center[0] === 36.151182) return;
    map.current.flyTo({
      center: coordinates,
      zoom: 10,
      speed: 2,
      curve: 1,
    });

    handleRemoveMarkers();
    data.map((el) => popuShowMarkerMessage([el.longCoord, el.latCoord]));
  }, [center, data]);

  // map reuseable function for popups with messages
  const popuShowMarkerMessage = (coords: LatLngExpression): void => {
    const marker = new mapboxgl.Marker({
      color: "#2C3333",
      draggable: false,
      anchor: "bottom",
      rotation: 45,
      scale: 1,
    })
      .setLngLat(coords)
      .addTo(map.current);

    const popup = new mapboxgl.Popup({
      closeOnClick: false,
      className: "my-custom-popup",
    });

    const popupContent = document.createElement("div");
    createRoot(popupContent).render(
      <MarkerPopup message="Default message showing. 🔥" />
    );

    popup.setDOMContent(popupContent);
    marker.setPopup(popup);
  };

  const handleRemoveMarkers = () => {
    const markers = document.getElementsByClassName("mapboxgl-marker");
    while (markers[0]) {
      const parentNode = markers[0].parentNode;
      if (parentNode) {
        parentNode.removeChild(markers[0]);
      }
    }
  };

  return (
    <Container
      style={{ width: "100%", height: "100%" }}
      className="map-container"
      ref={mapContainer}
    />
  );
};

export default MapShow;
