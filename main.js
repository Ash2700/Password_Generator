const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const port = 3000

app.use(express.static('public'))
app.engine('.hbs', (engine({ extname: '.hbs' })))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.redirect('/mainPage')
})
app.get('/mainPage', (req, res) => {
  res.render('index')
})
app.post('/generator', (req, res) => {
  const data = req.body
  const password = randomNumber(data)
  console.log(data)
  // console.log(data.exclude.includes("a"))
  res.render('index', { password, data  })
})




function randomNumber(data) {
  const string = stringCombo(data)
  let password = ''
  let count = 0
  while (count < Number(data.length)) {
    const character = string.charAt(Math.floor(Math.random() * string.length))
    if (excludeWord(data, character)) {
      password += character
      count++
    }
  }
  return password
}
function stringCombo(data) {
  let string = ''
  const number = '0123456789'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const symbols = '!@#$%^&*{}()-=+|><.,;"[]'
  if (data.lowercase === 'on') {
    string += lowercase
  }
  if (data.uppercase === 'on') {
    string += uppercase
  }
  if (data.number === 'on') {
    string += number
  }
  if (data.symbols === 'on') {
    string += symbols
  }
  return string
}
function excludeWord(data, character) {
  return !(data.exclude.includes(character))
}


app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})