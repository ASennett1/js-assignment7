const router = require('express').Router()

const { MongoClient, ObjectId } = require('mongodb')

const url = process.env.MONGODB_URI || require('../secrets/mongodb.json').url
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}


// GET /api/todos

router.get('/', async (_, response) => {
	const collection = await getCollection('todo-api', 'todo')
	const todos = await collection.find().toArray()
	response.json(todos)
	
})

// POST /api/todos

router.post('/', async (request, response) => {
	const { item, complete } = request.body
	// const id = todos.length + 1
	// const complete = false
	// todos.push({ id, item, complete })
	const collection = await getCollection('todo-api', 'todo')
	const result = await collection.insertOne({ item, complete: false })
	response.json({ result })
})

// PUT /api/todos/:id

router.put('/:id', async (request, response) => {
	const { id } = request.params
	const collection = await getCollection('todo-api', 'todo')
	const todo = await collection.findOne({ _id: new ObjectId(id) })
	const complete = !todo.complete
	const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { complete } })
	response.json({ result })
})

module.exports = router