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

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/api/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${info.persons} people</p>
        <p>${info.date}</p>`
    )
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
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
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000) + 1  
  }
  persons = persons.concat(person)
  response.json(person)
})
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
