const express = require('express')
const axios = require('axios')
const router = express.Router()
const BASE_URL = 'http://api.icndb.com/jokes'
const Jokes = require('../models/Jokes')

const TOP_TEN = 10

router.get('/random', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/random`)

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

router.get('/', async (req, res) => {
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

router.post('/', async (req, res) => {
  const jokes = []

  try {
    const response = await axios.get(BASE_URL)

    if (response && response.data) {
      const count = await Jokes.countDocuments()

      for (let i = 0; i < TOP_TEN; i++) {
        let isExist = await Jokes.findOne({
          ext_id: response.data.value[count + i].id,
        })

        if (!isExist) {
          joke = new Jokes({
            ext_id: response.data.value[count + i].id,
            joke: response.data.value[count + i].joke,
          })
          jokes.push(joke)
          await joke.save()
        }
      }

      res.json({ jokes })
    } else {
      res.status(404).send('No data found')
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal server error')
  }
})

router.get('/summary', async (req, res) => {
  try {
    const allJokes = await Jokes.find()
    const jokes = []
    let words = []

    for (let i = 0; i < allJokes.length; i++) {
      if (jokes.length < TOP_TEN) {
        jokes.push(allJokes[Math.floor(Math.random() * allJokes.length)].joke)
      }
    }

    for (const item of jokes) {
      words.push(...item.split(' '))
    }

    words = words.sort()
    const countWords = words.reduce((r, e) => {
      r[e] = (r[e] || 0) + 1;
      return r;
    }, {});

    res.json({
      jokes,
      words: countWords,
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal server error')
  }
})

module.exports = router
