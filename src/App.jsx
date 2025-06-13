import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import noteService from './notes.js'  // './services/notes'
import Note from './components/Note'


const App = (props) => {
  const [notes, setNotes] = useState([props.notes])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // const hook = () => {
  //   axios.get('http://localhost:3002/notes')
  //   .then(response => {
  //     console.log("promise fulfilled")
  //     setNotes(response.data)
  //   })
  // }

  // useEffect(hook, [])

  // useEffect(() => {
  //   noteService
  //   .getAll()
  //   .then(response => {setNotes(response.data)})
  // }, [])

  useEffect(() => {
    noteService.getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const Note = ({ note, toggleImportance }) => {
    const label = note.important
    ? 'make not important' : 'make important'

    return (
      <li>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
  }

  const toggleImportanceOf = id => {
    console.log('importance of' + id + 'needs to be toggled')
    // const url = `http://localhost:3002/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important}
    // console.log(`importance of ${id} needs to be toggled`)
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id? returnedNote : note))
      })
      .catch(error => {
        alert("the note" + note.content + "was already deleted from server")
        setNotes(notes.filter(n => n.id !== id))
      })
      // .then(response => {
      //   setNotes(notes.map(note => note.id === id ? response.data : note))
    // axios.put(url, changedNote).then(response => {
    //   setNotes(notes.map(note => note.id === id ? response.data : note))
    // })
  }

  // PART 2.c ex
  // const exhook = () => {
  //   axios.get('http://localhost:3001/persons')
  //   .then(response => {
  //     console.log("promise2 fulfilled")
  //     setNotes(response.data)
  //   })
  // }

  // useEffect(exhook, [])
  
  // useEffect(() => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setNotes(response.data)
  //     })
  // }, [])
  // console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
    // noteService.create(noteObject).then(response => {
    //   setNotes(notes.concat(response.data))
    //   setNewNote('')
    // })

    axios
      .post('http://localhost:3002/notes', noteObject)
      .then(response => {
        console.log(response)
        setNotes(notes.concat(response.data))
        setNewNote('')
      })

    // setNotes(notes.concat(noteObject))
    // setNewNote('')
  }

  const handleNewNote = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }


  const notesToShow = showAll 
    ? notes
    // : notes.filter(note => note.important === true)
    : notes.fiter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
        <Note key={note.id} 
        note={note}
        toggleImportance={() => toggleImportanceOf(note.id)}/>)}
      </ul>
      {/* <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul> */}
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNewNote}
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

// PART 2.a-b

// const App = (props) => {
//   const [persons, setPersons] = useState([{name: 'Arto Hellas'}])
//   const [newName, setNewName] = useState('')
//   const [newNumber, setNewNumber] = useState(Number)

//   const handleNewName = (event) => {
//     setNewName(event.target.value)
//   }

//   const handleNewNumber = (event) => {
//     setNewNumber(event.target.value)
//   }

//   const addName = (event) => {
//     event.preventDefault()

//     const isNameExists = persons.some(person => person.name === newName)
//     if (isNameExists == true) {
//       alert(newName + ' is already added to the phonebook')
//       return
//     }

//     const addObjectName = {
//       name: newName,
//       id: String(persons.length + 1),
//       number: newNumber
//     }
//     setPersons(persons.concat(addObjectName))
//     setNewName('')
//   }

//   return (
//     <div>
//       <h2>Phone Book</h2>
//       <form onSubmit={addName}>
//         <div>
//           name: <input
//           value={newName}
//           onChange={handleNewName}/>
//           <br />
//           number: <input 
//           value={newNumber} 
//           onChange={handleNewNumber}/>
//         </div>
//         <div><button type='submit'>add</button></div>
//       </form>
//       <h2>Numbers</h2>
//         <div>
//           <ul>
//             {persons.map((person) => <li key={person.id}>{person.name} {person.number}</li>)}
//           </ul>
//         </div>
//     </div>
//   )
// }

// -----------------------------------------------------
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
