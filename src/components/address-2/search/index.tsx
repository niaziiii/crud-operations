import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import { Paper, TextField, Grid, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import {
  NOMINATIM_URL,
  styles,
  requestOptions,
  setParams,
  gridStyle,
  searchIconStyle,
  MarkerDataType,
  saveBtnStyle,
} from "../util";
import { generateRandomId } from "../../Forms/utilties";

type SearchMapShowType = {
  changePosition: (position: number[]) => void;
  changeSetMarkerData: (data: MarkerDataType) => void;
  setMarkerData: Dispatch<SetStateAction<MarkerDataType[] | []>>;
};

const SearchMapShow = ({
  changePosition,
  changeSetMarkerData,
  setMarkerData,
}: SearchMapShowType): JSX.Element => {
  const [query, setQuery] = useState<SetStateAction<string>>("");
  const [searchData, setSearchData] = useState([]);
  const [tempState, setTempState] = useState<SetStateAction<any>>(null);

  const onChange = (event: any): void => setQuery(event.target.value);

  // handle submit.
  const handleSubmit = (event: any): void => {
    if (typeof event !== "string") event.preventDefault();
    if (query == "") return;

    const queryString = setParams(query);
    fetch(`${NOMINATIM_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => setSearchData(JSON.parse(result)))
      .catch((err) => console.log("err: ", err));
  };

  const handleSettings = () => {
    if (!tempState) return;

    changeSetMarkerData({
      id: generateRandomId(),
      country: tempState.address.country,
      address: tempState.display_name,
      latCoord: +tempState.lat,
      longCoord: +tempState.lon,
    });

    setTempState(null);
  };
  const setSettingsTemp = (data: any) => {
    setTempState(data);
    changePosition([+data.lat, +data.lon]);
    setMarkerData((prev: MarkerDataType | MarkerDataType[]) => [
      {
        id: null,
        country: data.address.country,
        address: data.display_name,
        latCoord: +data.lat,
        longCoord: +data.lon,
      },
      ...(prev as any),
    ]);
    setQuery("");
    setSearchData([]);
  };

  useEffect(() => {
    if (query === "") return;
    handleSubmit("");
  }, [query]);

  return (
    <>
      <Button variant="contained" sx={saveBtnStyle} onClick={handleSettings}>
        save
      </Button>
      <Paper elevation={3} sx={styles}>
        {/* form with input field */}
        <form
          action="#"
          onSubmit={handleSubmit}
          style={{ position: "relative" }}
        >
          <TextField
            type="text"
            label="Search Location"
            size="small"
            variant="filled"
            fullWidth
            color="primary"
            onChange={onChange}
            value={query}
          />
          <SearchIcon
            onClick={handleSubmit}
            type="submit"
            sx={searchIconStyle}
          />
        </form>

        {/* showing searched lists */}
        <Paper sx={{ overflow: "auto", maxHeight: "50vh" }}>
          {searchData.map((elem, i) => (
            <Grid
              container
              key={i}
              spacing={1}
              sx={gridStyle}
              onClick={() => setSettingsTemp(elem)}
            >
              <Grid item xs={2} sx={{ padding: "0% !important" }}>
                <MyLocationIcon sx={{ fontSize: "2rem ", color: "#d32f2f" }} />
              </Grid>
              <Grid item xs={10} sx={{ padding: "0% !important" }}>
                {(elem as { display_name: string }).display_name}
              </Grid>
            </Grid>
          ))}
        </Paper>
      </Paper>
    </>
  );
};

export default SearchMapShow;
