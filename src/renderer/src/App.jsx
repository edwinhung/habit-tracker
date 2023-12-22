import { useState } from 'react'
import PropTypes from 'prop-types'

function App() {
  const [newInput, setNewInput] = useState('')
  const [itemId, setItemId] = useState(0)
  const [todoList, setTodoList] = useState([])
  const [displayCompleted, setDisplayCompleted] = useState(false)
  const today = new Date()

  const handleAdd = () => {
    const newObj = {
      id: itemId,
      value: newInput,
      completed: false
    }
    setTodoList(todoList.concat(newObj))
    setItemId(itemId + 1)
  }

  const handleInput = (event) => {
    setNewInput(event.target.value)
  }

  const handleClickCheck = (event, item) => {
    let listCopy = [...todoList]
    listCopy.forEach((e) => {
      if (e.id === item.id) {
        e.completed = event.target.checked
      }
    })
    setTodoList(listCopy)
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
          value={newInput}
          onChange={handleInput}
          placeholder="Add a task or habit"
        />
      </div>
      <List
        list={todoList.filter((item) => item.completed == false)}
        onClickCheck={handleClickCheck}
        checked={false}
      />
      {todoList.filter((item) => item.completed == true).length > 0 &&
        <div>
          <button className="completed" onClick={handleDisplayCompleted}>
            Completed
          </button>
          {displayCompleted &&
            <List
              list={todoList.filter((item) => item.completed == true)}
              onClickCheck={handleClickCheck}
              checked={true}
            />
          }
        </div>
      }
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
      <label className="checklabel">
        <input
          type="checkbox"
          className="checkbox"
          onClick={(event) => onClickCheck(event, item)}
          defaultChecked={checked}
        />
        {item.value}
      </label>
    </li>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onClickCheck: PropTypes.func,
  checked: PropTypes.bool
}

export default App
