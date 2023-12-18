import { useState } from 'react'
import PropTypes from 'prop-types'

function App() {
  const [newItem, setNewItem] = useState('')
  const [itemId, setItemId] = useState(0)
  const [todoList, setTodoList] = useState([])
  const today = new Date()

  const handleAdd = () => {
    const newObj = {
      id: itemId,
      value: newItem
    }
    setTodoList(todoList.concat(newObj))
    setItemId(itemId + 1)
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
      <List todoList={todoList} />
    </div>
  )
}

function List({ todoList }) {
  return (
    <div className="list">
      <ul>
        {todoList.map((item) => (
          <Item key={item.id} task={item.value} />
        ))}
      </ul>
    </div>
  )
}

List.propTypes = {
  todoList: PropTypes.array
}

function Item({ task }) {
  return (
    <li className="item">
      <input type="checkbox" className="checkbox" />
      <label>{task}</label>
    </li>
  )
}

Item.propTypes = {
  task: PropTypes.string.isRequired
}

export default App
