import { useState, useEffect } from 'react'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import axios from 'axios'
const baseUrl = 'api/persons';

const App = () => {
const [persons, setPersons] = useState([{ name: '', number: '' }])
const [newName, setNewName] = useState('')
const [newPhone, setNewPhone] = useState('')
const [searchQuery, setSearchQuery] = useState('')

const hook = () => {
  axios.get(baseUrl)
  .then(response => {
  setPersons(response.data)
});
}

useEffect(hook, [])

const filteredPersons = persons.filter(person => person.name.includes(searchQuery));

const submit = (props) =>{
props.preventDefault();

const existingPerson = persons.find(person => person.name === newName);
if (existingPerson) {

  alert(`${newName} is already added to phonebook`);
  return;
}

setPersons(persons.concat({name: newName, number: newPhone}));
setNewName("");
setNewPhone("");
}

return (
<div>
<h1>Phonebook</h1>
<SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
<PersonForm newName={newName} setNewName={setNewName} newPhone={newPhone} setNewPhone={setNewPhone} submit={submit} />
<Phonebook persons={filteredPersons} />
</div>
)

}


const Phonebook = (props) => {
return (
<div>
{props.persons.map(person =>
<p key={person.name}> {person.name} {person.number} </p>
)}
</div>
)
}

export default App;
