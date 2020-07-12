const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000
const connectDB = require('./config/db')
const Jokes = require('./models/Jokes')

connectDB()

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/jokes', require('./routes/jokes'))

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`)
  const BASE_URL = 'http://api.icndb.com/jokes/'
  const TOP_TEN = 10

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
          await joke.save()
        }
      }
      console.log('done creating new jokes')
    } else {
      console.log('No data found')
    }
  } catch (error) {
    console.error(error.message)
  }
})