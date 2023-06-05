export type MarkerDataType = {
  id?: string;
  country: string;
  latCoord: number;
  longCoord: number;
  address: string;
};

export type LatLngExpression =
  | [number, number]
  | { lat: number; lng: number }
  | { lng: number; lat: number };

const styles = {
  zIndex: 1000,
  position: "absolute",
  top: "4px",
  left: "10px",
  width: "20rem",
  borderRadius: ".5rem",
  overflow: "hidden",
};
const gridStyle = {
  alignItems: "center",
  width: "90%",
  ml: "0%",
  pt: ".5rem !important",
  pb: ".5rem !important",
  margin: "auto",
  borderBottom: "1px solid #dddddd",
  cursor: "pointer",
};

const searchIconStyle = {
  position: "absolute",
  top: "35%",
  left: "90%",
  cursor: "pointer",
  color: "#2196f3",
};
const saveBtnStyle = {
  position: "absolute",
  right: "1%",
  bottom: "6%",
  zIndex: "100",
  width: "5rem",
  textTransform: "capitalize",
};
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search?";
const requestOptions: any = {
  method: "GET",
  redirect: "follow",
};
const setParams: any = (query: any) => {
  const params = {
    q: query,
    format: "json",
    addressdetails: "addressdetails",
  };

  return new URLSearchParams(params).toString();
};

const wrapperStyle = {
  minHeight: "95vh",
  overflow: "hidden !important",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};
export {
  styles,
  NOMINATIM_URL,
  requestOptions,
  setParams,
  gridStyle,
  searchIconStyle,
  wrapperStyle,
  saveBtnStyle,
};
