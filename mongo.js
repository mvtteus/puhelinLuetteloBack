const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url =
  `mongodb+srv://matias:${password}@cluster0-lf02j.mongodb.net/luettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: newName,
  number: newNumber
})

if (newName === undefined || newNumber === undefined) {
    console.log("Phonebook:")
    Person.find({}).then(result => {
        result.forEach(note => {
          console.log(note.name, note.number)
        })
        mongoose.connection.close()
      })
} else {
    person.save().then(response => {
        console.log('new person saved!');
        mongoose.connection.close();
      })
}

