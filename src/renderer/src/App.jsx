import { useState } from 'react'

function App() {
  const [newItem, setNewItem] = useState('');
  const [todoList, setTodoList] = useState([])
  const today = new Date()

  const handleAdd = () => {
    setTodoList(todoList.concat(newItem))
  }

  const handleClick = (event) => {
    setNewItem(event.target.value)
  }

  return (
    <div className="container">
      <div className="date">Today is {today.toDateString()}</div>
      <div className="add">
        <input type="text" onChange={handleClick} />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="list">
        <ul>
          {todoList.map((item) => (
            <li key={item} className="item">
              <input type="checkbox" className="checkbox" />
              <label>{item}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
