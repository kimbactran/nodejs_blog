const express = require('express')
const app = express()
const port = 8080

app.get('/home', (req, res) => {
  res.send('Hello World!')
})

// 127.0.0.1
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})