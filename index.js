const express = require('express')
const port = 3000
const app = express()
const bodyParser = require('body-parser')

app.use(express.static('./index'))

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})





app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
