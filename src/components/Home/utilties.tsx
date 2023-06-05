import { Paper } from "@mui/material";
import { deleteItems } from "../helper";

const homeStyle = {
  wrapper: {
    marginTop: "10vh",
    minHeight: "85vh",
    background: "#dddddd",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    marginTop: "2rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  heading2: {
    fontWeight: "bold",
    textAlign: "center",
    margin: "1rem 0",
  },
  card: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2rem 0rem 0 0",
    position: "relative",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    background: "#658864",
    padding: ".5rem",
    fontWeight: "bold",
  },
  lists: {
    display: "flex",
    justifyContent: "start",
    gap: "15px",
    alignItems: "center",
    padding: "4% .5rem !important",
    overflow: "hidden",
    "&:first-of-type": {
      borderRight: "1px solid #dddddd",
    },
  },
  listsContainer: {
    width: "100% !important",
    margin: "0% 0",
    borderTop: "1px solid #dddddd",
  },
  button: {
    width: "100% !important",
    borderRadius: "0%",
    "&:first-of-type": {
      borderRight: "1px solid #dddddd",
      //   background: "red",
    },
  },
  updateFormContainer: {
    background: "red",
    padding: "0% !important",
    borderRadius: "5px",
  },

  styleBox: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: 24,
    overflow: "hidden !important",
    borderRadius: "15px",
  },
  loginInfo: {
    height: "85vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const deleteEntry = async (entry: string): Promise<any> => {
  const form: FormData = new FormData();
  form.append("id", entry);
  try {
    const req = await deleteItems("/api/v1", form as any);
    return req.data.data;
  } catch (error) {
    console.log(error);
  }
};

export { homeStyle, deleteEntry };
