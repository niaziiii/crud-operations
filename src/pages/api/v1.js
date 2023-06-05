import nc from "next-connect";
import { writeData, getData, deleteData, updateData } from "./utilties";
import upload from "./multerUpload";
import "./schema/db.entities.js";

const handler = nc();
export const config = {
  api: {
    bodyParser: false,
  },
};

// get request api
handler.get(async (req, res) => await getData(req, res));

// post request api with images
handler.use(upload.single("image"));
handler.post(async (req, res) => await writeData(req, res));

// update request api
handler.patch(async (req, res) => await updateData(req, res));

// delete request api
handler.delete(async (req, res) => await deleteData(req, res));

export default handler;
