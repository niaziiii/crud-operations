import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { filterEntries, headingFilterStyle } from "./utilties";
import { Dispatch, SetStateAction } from "react";
import { EntitiesDataType } from "../../context-api/AppContext";

const flex1 = { flex: "1" };
type FilterProps = {
  setEntries: Dispatch<SetStateAction<EntitiesDataType[]>>;
  readonly entries: EntitiesDataType[];
};

const FilterEntites = ({ setEntries, entries }: FilterProps) => {
  // states
  const [age, setAge] = useState([0, 100]);
  const [gender, setGender] = useState<SetStateAction<string | null>>(null);
  const [graduate, setGraduate] =
    useState<SetStateAction<boolean | null>>(null);

  const [date, setDate] = React.useState<SetStateAction<any>>([null, null]);

  // handlers
  const handleGraduate = (graduate: boolean): void =>
    setGraduate(graduate as boolean);

  const handleGender = (newGender: string | null): void =>
    setGender(newGender as string | null);

  const handleAge = (newValue: number | number[], activeThumb: number) => {
    const minAge: number = 18;

    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setAge([Math.min(newValue[0], age[1] - minAge), age[1]]);
    } else {
      setAge([age[0], Math.max(newValue[1], age[0] + minAge)]);
    }
  };

  // filter out values
  useEffect(() => {
    setEntries(
      filterEntries(
        entries,
        age,
        gender as string | null,
        graduate as null | boolean,
        date
      )
    );
  }, [graduate, gender, age, date]);

  return (
    <Paper elevation={3} sx={{ height: "fit-content", maxWidth: "100%" }}>
      <Typography variant="h6" sx={headingFilterStyle}>
        Filter Entities
      </Typography>
      <Grid container sx={{ padding: "1rem" }}>
        <Grid item xs={12}>
          <Typography>Age (18 {">"} 100)</Typography>
          <Slider
            value={age as number[]}
            onChange={(_, val, newVal) => handleAge(val, newVal)}
            valueLabelDisplay="auto"
            sx={{ color: "#2C3333", margin: "0px 0 -10px 0" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ margin: "10px 0 2px 0" }}>Gender</Typography>
          <ToggleButtonGroup
            sx={{ color: "black", width: "100%" }}
            value={gender}
            exclusive
            onChange={(_, value) => handleGender(value)}
            aria-label="Platform"
          >
            <ToggleButton sx={flex1} value="male">
              Male
            </ToggleButton>
            <ToggleButton sx={flex1} value="female">
              Female
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ margin: "10px 0 2px 0" }}>Graduate</Typography>
          <ToggleButtonGroup
            sx={{ color: "black", width: "100%" }}
            value={graduate}
            exclusive
            onChange={(_, value) => handleGraduate(value)}
            aria-label="Platform"
          >
            <ToggleButton sx={flex1} value={true}>
              Yes
            </ToggleButton>
            <ToggleButton sx={flex1} value={false}>
              No
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: ".2rem" }}>
          <Typography sx={{ margin: "10px 0 2px 0" }}>
            Joining date range
          </Typography>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{ start: "Date", end: "Date" }}
          >
            <DateRangePicker
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} size="small" sx={flex1} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} size="small" sx={flex1} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterEntites;
