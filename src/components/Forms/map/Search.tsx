import {
  Button,
  Grid,
  List,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Dispatch, SetStateAction } from "react";
import { LatLngExpression } from "leaflet";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search?";

type SearchType = {
  query: string | null;
  setQuery: SetStateAction<number[] | string[] | null>;
  setCenter?: any;
};

const Search = ({ query, setQuery, setCenter }: SearchType) => {
  const [results, setResults] = useState([]);

  const handleSubmitted = (e: any) => {
    if (e) e.preventDefault();

    const params: any = {
      q: query,
      format: "json",
      addressdetails: "addressdetails",
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${NOMINATIM_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => setResults(JSON.parse(result)))
      .catch((err) => console.log("err: ", err));
  };

  useEffect(() => {
    if (query === "") return;
    handleSubmitted("");
  }, [query]);
  return (
    <Paper elevation={3} sx={{ background: "white", overflow: "hidden" }}>
      <Typography
        variant="h5"
        sx={{
          background: "#2C3333 !important",
          color: "white",
          textAlign: "center",
          p: ".5rem 0",
        }}
      >
        Search
      </Typography>
      <form
        onSubmit={handleSubmitted}
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #dddddd",
        }}
      >
        <TextField
          type="text"
          variant="outlined"
          size="small"
          value={query}
          onChange={setQuery as any}
          placeholder="Search location"
          sx={{
            border: "none !important",
            flex: "1",
            "& .MuiOutlinedInput-root": {
              "& > fieldset": {
                border: "none",
              },
            },
          }}
        ></TextField>
        <Button
          type="submit"
          sx={{
            borderLeft: ".5px solid #dddddd",
            borderRadius: "0",
          }}
        >
          <SearchIcon
            sx={{
              cursor: "pointer",
              width: "50px",
            }}
          />
        </Button>
      </form>
      <Paper elevation={0} sx={{ maxHeight: "55vh", overflow: "auto" }}>
        {results.length !== 0 &&
          results?.map((el, i) => {
            const latLng = [
              +(el as { lat: number | string }).lat,
              +(el as { lon: number | string }).lon,
            ];

            return (
              <Grid
                container
                spacing={2}
                alignItems="center"
                width="90%"
                ml="0%"
                pt=".5rem !important"
                pb=".5rem !important"
                margin={"auto"}
                borderBottom="1px solid #dddddd"
                sx={{ cursor: "pointer" }}
                key={i}
                onClick={() => {
                  setCenter(null);
                  setCenter(latLng);
                  setResults([]);
                }}
              >
                <Grid item xs={2} sx={{ padding: "0% !important" }}>
                  <MyLocationIcon
                    sx={{
                      fontSize: "2rem !important",
                      color: "#2C3333 !important",
                    }}
                  />
                </Grid>
                <Grid item xs={10} sx={{ padding: "0% !important" }}>
                  {(el as { display_name: string }).display_name}
                </Grid>
              </Grid>
            );
          })}
      </Paper>
    </Paper>
  );
};

export default Search;
