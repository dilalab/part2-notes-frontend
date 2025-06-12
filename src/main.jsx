import ReactDOM from 'react-dom/client'
import App from './App'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
]


const persons = [
  {
    id: 1,
    name: 'Dilara Bozkurt',
  },
  {
    id: 2,
    name: 'Ipek Bozkurt',
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} persons={persons} />
)
