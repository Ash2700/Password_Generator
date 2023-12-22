const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const port = 3000

app.use(express.static('public'))
app.engine('.hbs',(engine({extname:'.hbs'})))
app.set('view engine','.hbs')
app.set('views','./views')


app.get('/',(req,res)=>{
  res.redirect('/generator')
})

app.get('/generator',(req,res)=>{
  res.render()
})

app.listen(port,()=>{
  console.log(`express server is running on http://localhost:${port}`)
})