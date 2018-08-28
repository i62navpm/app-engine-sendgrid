const express = require('express')
const bodyParser = require('body-parser')

const { sendMails } = require('./src/mails')

const app = express()

app.use(bodyParser.json())

app.post('/send', sendMails)

if (module === require.main) {
  const PORT = process.env.PORT || 8080
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
    console.log('Press Ctrl+C to quit.')
  })
}

module.exports = app
