const axios = require('axios');
const express = require('express')
const router = express.Router()

router
  .route("/user")
  .get((req, res) => {
    res.send(`Get user `)
  })