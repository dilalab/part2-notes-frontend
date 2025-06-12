import { useState } from 'react'

// PART 2 EXERCISES
// 2.6

const App = (props) => {
  const [persons, setPersons] = useState([{name: 'Arto Hellas'}])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(Number)

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const isNameExists = persons.some(person => person.name === newName)
    if (isNameExists == true) {
      alert(newName + ' is already added to the phonebook')
      return
    }

    const addObjectName = {
      name: newName,
      id: String(persons.length + 1),
      number: newNumber
    }
    setPersons(persons.concat(addObjectName))
    setNewName('')
  }

  return (
    <div>
      <h2>Phone Book</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
          value={newName}
          onChange={handleNewName}/>
          <br />
          number: <input 
          value={newNumber} 
          onChange={handleNewNumber}/>
        </div>
        <div><button type='submit'>add</button></div>
      </form>
      <h2>Numbers</h2>
        <div>
          <ul>
            {persons.map((person) => <li key={person.id}>{person.name} {person.number}</li>)}
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
