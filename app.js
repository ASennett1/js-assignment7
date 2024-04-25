const path = require('path')
const express = require('express')
const router = require('./routes/api-routes')
const app = express()

const port = process.env.PORT || 3000
const root = path.join(__dirname,'public')

app.use(express.json())
app.use(express.static('public'))
app.use('/api/todos', require('./routes/api-routes'))
app.use(require('./routes/static'))



const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))