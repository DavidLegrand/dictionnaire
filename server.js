
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

app.use(express.json())

app.get('/dictionnaire', (req, res) => {

  fs.readFile('dico.txt', 'utf-8', (err, data) => {
    data = data.split('\n')

    if (req.body.q) {
      data = data.filter((line) => line.startsWith(req.body.q))
    }
    res.json(data)
  })
})
app.post('/dictionnaire', (req, res) => {
  fs.readFile('dico.txt', 'utf-8', (err, data) => {
    data = [...data.split('\n'), req.body.q].sort()
    fs.writeFile('dico.txt', data.join('\n'), () => {
      res.json(data)
    })
  })
})
app.delete('/dictionnaire', (req, res) => {
  fs.readFile('dico.txt', 'utf-8', (err, data) => {
    data = data.split('\n')
    if (req.body.q) {
      data = data.filter((line) => line !== req.body.q)
      fs.writeFile('dico.txt', data.join('\n'), () => {
        res.json(data)
      })
    }
  })
})

app.listen(port, () => {
  console.log(`Dictionnaire listening at http://localhost:${port}`)
})

