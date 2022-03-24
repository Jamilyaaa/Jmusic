const axios = require("axios");
const express = require("express");

const router = express.Router();

router.get("/:artist/:title", async (req, res) => {
  const {artist, title}=req.params;
  console.log(artist, title);
  try {
    const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    res.json(response.data);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
