import React, { useState, SetStateAction, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddForm from "./add/AddForm";
import { Container } from "@mui/material";
import { EntitiesDataType } from "../../context-api/AppContext";
import dynamic from "next/dynamic";
const MaptyMap = dynamic(() => import("./map/Mapty"), { ssr: false });

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1, m: "0% important" }}>{children}</Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type FormProps = {
  data: EntitiesDataType | null;
};

export default function Form({ data }: FormProps): JSX.Element {
  const [value, setValue] = useState<SetStateAction<any | number>>(0);

  const [coordinates, setCoordinates] = useState<
    SetStateAction<number[] | string[] | string | null>
  >(data?.coordinates ? data.coordinates : null);

  const [formData, setformData] = useState<
    SetStateAction<EntitiesDataType | null>
  >(data ? data : null);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container
      sx={{
        maxHeight: "95vh",
        margin: "auto",
        borderRadius: "10px",
        backgroundColor: "white !important",
        width: "800px",
        pl: "0% !important",
        pr: "0% !important",
        overflow: "auto",
      }}
      maxWidth="md"
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", height: "48px" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          indicatorColor="primary"
          sx={{
            m: "auto",
            justifyContent: "center !important",
            display: "inline-block",
          }}
        >
          <Tab
            sx={{
              flex: "1",
              ml: "auto",
              color: "black",
              fontWeight: "700",
              textTransform: "capitalize",
              minWidth: "10rem",
            }}
            label="Form"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              flex: "1",
              marginRight: "auto",
              color: "black",
              fontWeight: "700",
              textTransform: "capitalize",
              minWidth: "10rem",
            }}
            label="Location"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AddForm
          showSide={setValue}
          coordinates={coordinates as any}
          formData={formData as any}
          setformData={setformData}
          data={data ? true : false}
        />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <MaptyMap
          showSide={setValue}
          coordinates={coordinates as string | number[] | string[] | null}
          setCoordinates={setCoordinates}
        />
      </TabPanel>
    </Container>
  );
}
