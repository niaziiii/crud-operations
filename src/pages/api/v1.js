import nc from "next-connect";
import { writeData, getData, deleteData, updateData } from "./utilties";
import multer from "multer";
import upload from "./multerUpload";

const handler = nc();
export const config = {
  api: {
    bodyParser: false,
  },
};

// get request api
handler.get((req, res) => getData(req, res));

// post request api with images
handler.use(upload.single("image"));
handler.post((req, res) => writeData(req, res));

// update request api
handler.patch((req, res) => updateData(req, res));

// delete request api
handler.delete((req, res) => deleteData(req, res));

export default handler;
