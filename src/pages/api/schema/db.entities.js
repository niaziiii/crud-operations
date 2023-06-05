import mongoose from "mongoose";
mongoose
  .connect(
    "mongodb+srv://khanniazipixako:taKqA2sYc92y8d5Y@cluster0.ckzwmsx.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to MongooDb");
  })
  .catch((err) => {
    console.log(err.message);
    console.log("error connecting to MongooDb");
  });
