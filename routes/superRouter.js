const axios = require("axios");
const express = require("express");

const router = express.Router();

const {
  userChecker,
} = require('../middlewares/allMiddlewares');

router.get("/:artist/:title", async (req, res) => {
  const {artist, title}=req.params;
  console.log(artist, title);
  try {
    const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({message: 'Песня не найдена'});
  }
});

module.exports = router;
