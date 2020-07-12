const express = require('express')
const axios = require('axios')
const router = express.Router()
const BASE_URL = 'http://api.icndb.com/jokes/random/'

router.get('/random', async (req, res) => {
  try {
    const response = await axios.get(BASE_URL)

    if (response && response.data) {
      res.json({ joke: response.data.value.joke })
    } else {
      res.status(404).send('No data found')
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal server error')
  }
})

module.exports = router
