// write data to the json file
import fs from "fs";
import User from "./schema/entities.schema.js";

const writeData = async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json({
    message: "Data has been written to file.",
    data: user,
  });
};

const getData = async (req, res) => {
  const allUser = await User.find();

  res.status(200).json({
    message: "Data has been read from file.",
    length: allUser.length,
    data: allUser,
  });
};

const deleteData = async (req, res) => {
  const deleteUser = await User.deleteOne({ _id: req.body.id });

  res.status(202).json({
    message: "Data has been Deleted from file.",
    data: deleteUser,
  });
};

const updateData = async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(
    { _id: req.body._id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    message: "Data has been updated from file.",
    data: updateUser,
  });
};
export { writeData, getData, deleteData, updateData };
