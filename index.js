const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()
const Person = require('./models/person')


let persons = [
    { 
      name: "Arto Hellas", 
      number: "040-123456",
      id: 1
    },
    { 
      name: "Ada Lovelace", 
      number: "39-44-5323523",
      id: 2
    },
    { 
      name: "Dan Abramov", 
      number: "12-43-234345",
      id: 3
    },
    { 
      name: "Mary Poppendieck", 
      number: "39-23-6423122",
      id: 4
    },
    {
      name: "Iivari Laaksonen",
      number: "112",
      id: 5
    }
  ]

let info = {
    persons: persons.length,
    date: new Date()
}
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('setit', function (request, response) {
  if (request.method === "POST") {
    return JSON.stringify(request.body)
  } 
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :setit'))

        
app.get('/', (req, res) => {
  res.send('<h1>HUUTISTA</h1>')
  res.sendDate()
})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person.toJSON())
    })
    .catch(error => next(error))
})

app.get('/api/info', (req, res) => {
  console.log(Person.length)
  const length = Person.length
  res.send(
      `<p>Phonebook has info for ${length} people</p>
      <p>${info.date}</p>`
  )
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndRemove({_id: id}).then(persons => {
    response.json(persons)
  })
    response.status(204).end().catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  console.log(request.body)
  const body = request.body
  if (body.number === undefined || body.name === undefined) {
    return response.status(400).json({
      error: 'Missing name or number'
    })
  } else if (persons.filter(p => p.name === body.name)[0] !== undefined) {
    console.log(persons.filter(p => p.name === body.name)[0])
    return response.status(400).json({
      error: 'Name must be unique'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000) + 1  
  })
  person.save().then(person => {
  response.json(person.toJSON())
}).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
