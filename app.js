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


const todos = [
	{ id: 1, item: 'Learn JavaScript', complete: false },
	{ id: 2, item: 'Learn Express', complete: false },
	{ id: 3, item: 'Build a To Do App', complete: false }
]

router.get('/', (_, response) => {
	response.sendFile('index.html', { root })
})






const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))