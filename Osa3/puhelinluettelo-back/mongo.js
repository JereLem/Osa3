const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('Wrong arguments, right way is: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://jereleman:${password}@cluster0.7phcly4.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 4) {
    const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

person.save().then(result => {
  console.log(`Person: ${person.name}, number: ${person.number} added to the phonebook!`)
  mongoose.connection.close()
})
}
else{
    Person.find({}).then(persons => {
      persons.forEach(person => {
        console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} 
