const express = require('express')
const axios = require('axios')
const router = express.Router()
const BASE_URL = 'http://api.icndb.com/jokes/random/'
const Jokes = require('../models/Jokes')

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

router.get('/random/internal', async (req, res) => {
  try {
    const jokes = await Jokes.find()
    const result = []
    for (let i = 0; i < jokes.length; i++) {
      if (result.length < 5) {
        result.push(jokes[Math.floor(Math.random() * jokes.length)].joke)
      }
    }
    res.json({ jokes: result })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal server error')
  }
})

router.delete('/', async (req, res) => {
  try {
    await Jokes.deleteMany()
    res.json({ message: 'All jokes has been deleted' })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal server error')
  }
})

module.exports = router
