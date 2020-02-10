const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()
const Person = require('./models/person')

let info = {
  date: new Date()
}
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('setit', function (request) {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :setit'))


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
  console.log(Person.estimatedDocumentCount())
  console.log(Person.length)
  const lengthh = Number(Person.estimatedDocumentCount())
  res.send(
    `<p>Phonebook has info for ${lengthh} people</p>
      <p>${info.date}</p>`
  )
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove({ _id: id }).then(persons => {
    response.json(persons)
  })
  response.status(204).end().catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  console.log(request.body)
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000) + 1
  })
  person.save().catch(error => next(error)).then(savedPerson => {
    return savedPerson.toJSON()
  })
    .then(savedFormPerson => {
      response.json(savedFormPerson)
    })
    .catch(error => next(error))
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

const unknownEndpoint = (response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
