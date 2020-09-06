const express = require('express')
const axios = require('axios')
const cors = require('cors')
const cookiesMiddleware = require("universal-cookie-express");

const app = express()

app.use(cors())
app.use(cookiesMiddleware());
app.use(express.json())

app.get("/search", async (req, res) => {
  try {
      console.log(req.query);
    const response = await axios(
      `https://api.spotify.com/v1/search?q=${req.query.q}&type=track`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    return res.json(error);
  }
});

app.listen(3001);