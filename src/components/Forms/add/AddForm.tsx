import React, { useContext, Dispatch } from "react";
import { Container } from "@mui/system";
import { TextField, Paper, Select } from "@mui/material";
import { InputLabel, MenuItem, FormLabel, Checkbox } from "@mui/material";
import { Button, Grid, RadioGroup, Radio, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import {
  addStyle,
  validateInputs,
  formattedDate,
  generateRandomId,
  formDataFormat,
} from "../utilties";
import { postItems, patchItems } from "../../helper";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MyContext from "../../../context-api/AppContext";
import { useRouter } from "next/router";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { EntitiesDataType } from "../../../context-api/AppContext";

type AddFormType = {
  data: boolean;
  showSide: Dispatch<number>;
  coordinates: number[] | null;
  formData?: EntitiesDataType;
  setformData: Dispatch<EntitiesDataType>;
};
const AddForm = ({
  data,
  showSide,
  coordinates,
  formData,
  setformData,
}: AddFormType): JSX.Element => {
  const router = useRouter();
  const { dispatch } = useContext(MyContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateInputs),
    defaultValues: formData
      ? formData
      : {
          gender: "",
          graduate: "none",
          status: "",
        },
  });

  const closePopupModal = (): void => {
    dispatch({ type: "CLOSE__MODAL" });
  };

  const onSubmit = async (value: EntitiesDataType) => {
    setformData(value);
    if (coordinates === null) return showSide(1);

    value.joining = formattedDate(value.joining as any);
    let req;

    if (data) {
      const submitData = formDataFormat(value, "user", coordinates);

      req = await patchItems("/api/v1", submitData);
    } else {
      const submitData = formDataFormat(value, "user", coordinates);
      req = await postItems("/api/v1", submitData);
    }

    dispatch({ type: "SET_UPDATE_DATA", payload: req.data.data });
    closePopupModal();
  };

  return (
    <Container sx={addStyle.container} maxWidth="lg">
      <Paper elevation={0} sx={addStyle.paper}>
        <Typography
          sx={{ padding: ".5rem 0", marginBottom: "2rem" }}
          variant="h5"
          fontWeight={600}
          textAlign={"center"}
        >
          {formData ? "Editing" : "Add"} Form
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5} sx={{ padding: "0 20px" }}>
            <Grid item xs={12} pt="15px !important">
              <Grid container>
                <Grid item xs={12} md={3}>
                  <InputLabel>Enter Name </InputLabel>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    autoComplete="off"
                    id="name"
                    variant="outlined"
                    size="small"
                    sx={{ width: "100%" }}
                    {...register("name")}
                  />
                  {errors.name && (
                    <Typography
                      sx={{
                        margin: "5px 0 0 0%",
                        color: "red",
                        fontSize: ".8rem",
                      }}
                    >
                      {errors.name.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} pt="15px !important">
              <Grid container>
                <Grid item xs={12} md={3}>
                  <InputLabel>Enter Age </InputLabel>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    autoComplete="off"
                    sx={{ width: "100%" }}
                    id="age"
                    variant="outlined"
                    type="number"
                    size="small"
                    {...register("age")}
                  />
                  {errors.age && (
                    <Typography
                      sx={{
                        margin: "5px 0 0 0",
                        color: "red",
                        fontSize: ".8rem",
                      }}
                    >
                      {errors.age.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} pt="15px !important">
              <Grid container>
                <Grid item xs={12} md={3}>
                  <InputLabel>Enter Date </InputLabel>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    id="date"
                    type="Date"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("joining")}
                  />
                  {errors.joining && (
                    <Typography
                      sx={{
                        margin: "5px 0 0 0",
                        color: "red",
                        fontSize: ".8rem",
                      }}
                    >
                      {errors.joining.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} pt="15px !important">
              <Grid container>
                <Grid item xs={12} md={3}>
                  <InputLabel>Enter Number </InputLabel>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    autoComplete="off"
                    sx={{ width: "100%" }}
                    id="phone"
                    variant="outlined"
                    size="small"
                    type="number"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <Typography
                      sx={{
                        margin: "5px 0 0 0%",
                        color: "red",
                        fontSize: ".8rem",
                      }}
                    >
                      {errors.phone.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} pt="15px !important">
              <Grid container>
                <Grid item xs={12} md={3}>
                  <FormLabel id="gender">Gender </FormLabel>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "Required gender" }}
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value}
                        onChange={field.onChange}
                        sx={{
                          displayed: "flex",
                          flexDirection: "row",
                          marginTop: "-.5rem",
                        }}
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio id="gender-female" />}
                          label="Female"
                          id="gender-female-label"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio id="gender-male" />}
                          label="Male"
                          id="gender-male-label"
                        />
                      </RadioGroup>
                    )}
                  />
                  {errors.gender && (
                    <Typography
                      sx={{
                        margin: "5px 0 0 0%",
                        color: "red",
                        fontSize: ".8rem",
                      }}
                    >
                      {errors.gender.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} pt="15px !important">
              <Grid container>
                <Controller
                  name="graduate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <Grid item xs={12} md={3}>
                        <InputLabel>Enter Graduate </InputLabel>
                      </Grid>

                      <Grid item xs={12} md={9}>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          variant="outlined"
                          size="small"
                          sx={{ width: "100%" }}
                        >
                          <MenuItem value="none">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={true as any}>Yes</MenuItem>
                          <MenuItem value={false as any}>No</MenuItem>
                        </Select>
                        {errors.graduate && (
                          <Typography
                            sx={{
                              margin: "5px 0 0 0%",
                              color: "red",
                              fontSize: ".8rem",
                            }}
                          >
                            {errors.graduate.message}
                          </Typography>
                        )}
                      </Grid>
                    </>
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} pt="15px !important">
              <Grid container>
                <Grid item xs={12} md={3}>
                  <FormLabel id="status">Status </FormLabel>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div style={{ marginTop: "-.5rem" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value === "single"}
                              onChange={(event) =>
                                field.onChange(
                                  event.target.checked ? "single" : ""
                                )
                              }
                            />
                          }
                          label="Single"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value === "married"}
                              onChange={(event) =>
                                field.onChange(
                                  event.target.checked ? "married" : ""
                                )
                              }
                            />
                          }
                          label="Married"
                        />
                      </div>
                    )}
                  />
                  {errors.status && (
                    <Typography
                      sx={{
                        margin: "2px 0 0 0%",
                        color: "red",
                        fontSize: ".8rem",
                      }}
                    >
                      {errors.status.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} pt="15px !important">
              <Grid container>
                <Grid item xs={12} md={3}>
                  <InputLabel>Enter Address </InputLabel>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    type="text"
                    placeholder="dsd"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("address")}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} pt="15px !important">
              <Grid container>
                <Grid item xs={12} md={3}>
                  <InputLabel>Upload image </InputLabel>
                </Grid>
                <Grid item xs={12} md={9}>
                  <InputLabel
                    htmlFor="upload"
                    sx={{
                      width: "100%",
                      backgroundColor: "#0070f3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      p: ".5rem",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Upload image
                    <CloudUploadIcon sx={{ color: "white" }} />
                  </InputLabel>
                  <input
                    style={{ width: "100%" }}
                    id="upload"
                    {...register("image")}
                    type="file"
                    hidden
                    accept="image/*"
                  />
                  {errors.image && (
                    <Typography
                      sx={{
                        margin: "5px 0 0 0%",
                        color: "red",
                        fontSize: ".8rem",
                      }}
                    >
                      {errors.image.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Container
            sx={{
              textAlign: "end",
              marginTop: "2rem",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "5rem",
                fontWeight: "700",
                mr: ".5rem",
              }}
              color="warning"
              onClick={closePopupModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: "6rem",
                color: "white",
                fontWeight: "700",
              }}
            >
              Submit
            </Button>
          </Container>
        </form>
      </Paper>
    </Container>
  );
};

export default AddForm;
