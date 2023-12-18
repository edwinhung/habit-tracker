import { useState } from 'react'
import PropTypes from 'prop-types'

function App() {
  const [newItem, setNewItem] = useState('')
  const [itemId, setItemId] = useState(0)
  const [todoList, setTodoList] = useState([])
  const [completedList, setCompletedList] = useState([])
  const [displayCompleted, setDisplayCompleted] = useState(false)
  const today = new Date()

  const handleAdd = () => {
    const newObj = {
      id: itemId,
      value: newItem
    }
    setTodoList(todoList.concat(newObj))
    setItemId(itemId + 1)
  }

  const handleInput = (event) => {
    setNewItem(event.target.value)
  }

  const handleClickCheck = (event, item) => {
    if (event.target.checked) {
      setCompletedList(completedList.concat(item))
      setTodoList(todoList.filter((e) => e.id !== item.id))
    } else {
      setTodoList(todoList.concat(item))
      setCompletedList(completedList.filter((e) => e.id != item.id))
    }
  }

  const handleDisplayCompleted = () => {
    setDisplayCompleted(!displayCompleted)
  }

  return (
    <div className="container">
      <div className="date">Today is {today.toDateString()}</div>
      <div id="add-box">
        <button className="plus" onClick={handleAdd}>+</button>
        <input
          className="input"
          type="text"
          onChange={handleInput}
          placeholder="Add a task and press plus sign"
        />
      </div>
      <List list={todoList} onClickCheck={handleClickCheck} checked={false} />
      <div>
        <button className="completed" onClick={handleDisplayCompleted}>
          Completed
        </button>
        {displayCompleted &&
          <List list={completedList} onClickCheck={handleClickCheck} checked={true} />
        }
      </div>
    </div>
  )
}

function List({ list, onClickCheck, checked }) {
  return (
    <div className="list">
      <ul>
        {list.map((item) => (
          <Item key={item.id} item={item} onClickCheck={onClickCheck} checked={checked} />
        ))}
      </ul>
    </div>
  )
}

List.propTypes = {
  list: PropTypes.array,
  onClickCheck: PropTypes.func,
  checked: PropTypes.bool
}

function Item({ item, onClickCheck, checked }) {
  return (
    <li className="item">
      <input
        type="checkbox"
        className="checkbox"
        onClick={(event) => onClickCheck(event, item)}
        checked={checked}
      />
      <label>{item.value}</label>
    </li>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onClickCheck: PropTypes.func,
  checked: PropTypes.bool
}

export default App
