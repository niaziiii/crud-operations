import nc from "next-connect";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

// get request api
handler.get((req, res) => {
  fs.readFile("public/position.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read data from file." });
    }
    res.status(200).json({
      message: "Data has been read from file.",
      length: JSON.parse(data).length,
      data: JSON.parse(data),
    });
  });
});

handler.post((req, res) => {
  const previousData = JSON.parse(
    fs.readFileSync("public/position.json", "utf8")
  );

  if (previousData.length === 0) {
    fs.writeFile("public/position.json", JSON.stringify([req.body]), (err) => {
      if (err) {
        res.status(500).json({ error: "Failed to write data to file." });
      }

      res.status(201).json({
        message: "Data has been written to file.",
        data: [req.body],
      });
    });
  } else {
    2;
    previousData.push(req.body);
    fs.writeFile(
      "public/position.json",
      JSON.stringify(previousData),
      (err) => {
        if (err) {
          res.status(500).json({ error: "Failed to write data to file." });
        }
        res.status(201).json({
          message: "Data has been written to file.",
          data: previousData,
        });
      }
    );
  }
});

handler.delete((req, res) => {
  const previousData = JSON.parse(
    fs.readFileSync("public/position.json", "utf8")
  );
  const newData = previousData.filter(
    (item: { id: any }) => item.id !== req.body.id
  );

  fs.writeFile("public/position.json", JSON.stringify(newData), (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to write data to file." });
    }
    res.status(202).json({
      message: "Data has been Deleted from file.",
      data: newData,
    });
  });
});

export default handler;
