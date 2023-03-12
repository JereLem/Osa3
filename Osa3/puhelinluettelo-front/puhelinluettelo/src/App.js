import React, { useEffect, useState } from 'react'

import Alert from './components/Alert'
import Filter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import MongoData from './services/request'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)

  const getAllHook = () => {
    MongoData
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => 
        console.error(error)
      )
  }

  useEffect(getAllHook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const checkValid = persons.find(person => 
      person.name.toLowerCase() === personObject.name.toLowerCase())

    if (checkValid && checkValid.number === newNumber) {
      Alert(personObject)      
    } 
    if (checkValid && checkValid.number !== newNumber) {
      const confirmNewNumber = window.confirm(`Do you want to overwrite ${checkValid.name}'s number ?`)
      
      if (confirmNewNumber) {
        const personUpdate = { ...checkValid, number: newNumber }
        MongoData
          .update(checkValid.id, personUpdate)
          .then(returnedPerson =>{
            setPersons(
              persons
                .map(person =>
                  person.id !== checkValid.id 
                    ? person 
                    : returnedPerson
              )
            )
            setNotification({
              text: `${checkValid.name}'s number was updated.`,
              type: 'notification'
            })
            setTimeout(() => setNotification(null), 3000)      
          })
          .catch(error =>
            setPersons(persons
              .filter(person => 
                person.name !== checkValid.name
              )
            )
          )
            setNotification({
              text: `${checkValid.name} has already been deleted from the phonebook.`,
              type: 'error'
            })
            setTimeout(() => {
              setNotification(null)
            }, 3000)
      }
    } 
    if (!checkValid) {
      MongoData
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => {
          setNotification({
            text: error.response.data.error, 
            type: 'error'
          })
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
      setNotification({
        text: `${personObject.name} added to the phonebook.`,
        type: 'notification'
      })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const confirmDelete = window.confirm(`Deleting ${person.name}?`)
    
    if (confirmDelete) {
      MongoData
        .remove(id)
        .then(returnedPerson => {
          persons.map(person => person.id !== id ? person : returnedPerson)
        })
      setPersons(persons.filter(person => person.id !== id))
      setNotification({
        text: `${person.name} was deleted from the phonebook.`,
        type: 'notification'
      })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsAfterFilter = 
    filter === ''  ? persons : persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase()))

      return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter
        filter={filter}
        handleFilter={handleFilter}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={personsAfterFilter}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App