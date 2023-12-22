import { useState } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [newInput, setNewInput] = useState('')
  const [todoList, setTodoList] = useState([])
  const [displayCompleted, setDisplayCompleted] = useState(false)
  const today = new Date()

  const handleAdd = () => {
    if (!newInput) return;
    const newObj = {
      id: uuidv4(),
      value: newInput,
      completed: false
    }
    setTodoList(todoList.concat(newObj))
    setNewInput('')
  }

  const handleInput = (event) => {
    setNewInput(event.target.value)
  }

  const handleClickCheck = (event, id) => {
    const newList = todoList.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          completed: event.target.checked
        }
        return updatedItem
      }
      return item
    })
    setTodoList(newList)
  }

  const handleDisplayCompleted = () => {
    setDisplayCompleted(!displayCompleted)
  }

  const handleDelete = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id))
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
        onClickDelete={handleDelete}
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
              onClickDelete={handleDelete}
              checked={true}
            />
          }
        </div>
      }
    </div>
  )
}

function List({ list, onClickCheck, onClickDelete, checked }) {
  return (
    <div className="list">
      <ul>
        {list.map((item) => (
          <Item
            key={item.id}
            item={item}
            onClickCheck={onClickCheck}
            onClickDelete={onClickDelete}
            checked={checked}
          />
        ))}
      </ul>
    </div>
  )
}

List.propTypes = {
  list: PropTypes.array,
  onClickCheck: PropTypes.func,
  onClickDelete: PropTypes.func,
  checked: PropTypes.bool
}

function Item({ item, onClickCheck, onClickDelete, checked }) {
  return (
    <li className="item">
      <label className="checklabel">
        <input
          type="checkbox"
          className="checkbox"
          onClick={(event) => onClickCheck(event, item.id)}
          defaultChecked={checked}
        />
        {item.value}
      </label>
      <button className="delete" onClick={() => onClickDelete(item.id)}>X</button>
    </li>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onClickCheck: PropTypes.func,
  onClickDelete: PropTypes.func,
  checked: PropTypes.bool
}

export default App
