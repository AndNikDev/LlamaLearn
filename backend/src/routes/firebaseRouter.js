const express = require("express");
const { uploadFile } = require("../services/storageService");

const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    const filePath = req.body.filePath; // Supongamos que recibes el path de un archivo.
    const destination = req.body.destination || "uploads/default.jpg";

    const downloadURL = await uploadFile(filePath, destination);
    res.status(200).json({ url: downloadURL });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
