import { useState } from 'react'
import { use } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons.js'


// PART 2 EXERCISES
// 2.6

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }


  const addName = (event) => {
    event.preventDefault()


    const isNameExists = persons.some(person => person.name === newName)
    const isNumberExists = persons.some(person => person.number === newNumber)
    if (isNameExists && !isNumberExists) {
      const confirmUpdate = window.confirm(
        newName + ' is already added to the phonebook, do you want to replace it with the new number?'
      )
      if (confirmUpdate) {
        const existingPerson = persons.find(person => person.name === newName)
        const updatedPerson = {
          ...existingPerson, number: newNumber
        }
        personsService.update(existingPerson.id, updatedPerson).then(
          returnedPerson => {
            setPersons(persons.map(
              p => p.id !== existingPerson.id ? p : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
          }
        )
      }
      // alert(newName + ' is already added to the phonebook, do you want to replace it with the new number?')
      // return personsService.update(personObject).then(
      //   response => {
      //     setNewNumber('')
      //   }
      // )
    }
    else {
      // const isNumberExists = persons.some(person => person.number === newNumber)
      //   if (isNameExists == true && isNumberExists == false) {
      //     alert(persons[id].name + ' is already added to the phonebook, replace the old number with the new one?')
      //   }

      const personObject = {
        name: newName,
        number: newNumber,
      }

      personsService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
      // axios.post('http://localhost:3003/persons', personObject)
      //   .then(response => {setPersons(persons.concat(response.data))
      //     setNewName('')
      //     setNewNumber('')
      //   })

      // personsService.create(personObject).then(
      //   response => {
      //     setPersons(persons.concat(response.data))
      //     setNewName('')
      //     setNewNumber('')
      //   }
      // )


      // const addObjectName = {
      //   name: newName,
      //   id: String(persons.length + 1),
      //   number: newNumber
      // }
      // setPersons(persons.concat(addObjectName))
      // setNewName('')
    }
  }

  const deletePerson = (id) => {
    personsService.deletePerson(id).then(
      response => {
        setPersons(persons.filter(
          person => {
            return person.id !== id
          }
        ))
      }
    )
  }

  return (
    <div>
      <h2>Phone Book</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNewName} />
          <br />
          number: <input
            value={newNumber}
            onChange={handleNewNumber} />
        </div>
        <div><button type='submit'>add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map((person) => <li key={person.id}>{person.name} {person.number}
            <button type='button' onClick={() => deletePerson(person.id)}>delete</button></li>)}
        </ul>
      </div>
    </div>
  )
}
// import Note from './components/Note'

// const App = (props) => {
//   const [notes, setNotes] = useState(props.notes)
//   // const [notes, setNotes] = useState([])
//   const [newNote, setNewNote] = useState([])
//   const [showAll, setShowAll] = useState(true)

//   const addNote = (event) => {
//     event.preventDefault()
//     //console.log('button clicked', event.target)
//     const noteObject = {
//       content: newNote,
//       important: Math.random() < 0.5,
//       id: String(notes.length + 1)
//     }

//     setNotes(notes.concat(noteObject))
//     setNewNote('')
//   }

//   const handleNewNote = (event) => {
//     console.log(event.target.value)
//     setNewNote(event.target.value)
//   }


//   const notesToShow = showAll 
//     ? notes
//     // : notes.filter(note => note.important === true)
//     : notes.fiter(note => note.important)

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all'}
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map(note => <Note key={note.id} note={note}/>)}
//       </ul>
//       {/* <ul>
//         {notes.map((note) => (
//           <Note key={note.id} note={note} />
//         ))}
//       </ul> */}
//       <form onSubmit={addNote}>
//         <input 
//           value={newNote} 
//           onChange={handleNewNote}
//         />
//         <button type='submit'>Save</button>
//       </form>
//     </div>
//   )
// }

export default App
