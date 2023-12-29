import { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

const ADD_ITEM = 'ADD_ITEM'
const UPDATE_INPUT = 'UPDATE_INPUT'
const CLICK_CHECK = 'CLICK_CHECK'
const DISPLAY_COMPLETED = 'DISPLAY_COMPLETED'
const DELETE_ITEM = 'DELETE_ITEM'
const RESET = 'RESET'
const LIST_KEY = 'list'

const initialState = {
  input: '',
  todoList: [],
  displayCompleted: false
}

const todoListReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      if (!state.input) return state
      const newObj = {
        id: uuidv4(),
        value: state.input,
        completed: false
      }
      return {
        ...state,
        todoList: state.todoList.concat(newObj),
        input: ''
      }
    }
    case UPDATE_INPUT: {
      return {
        ...state,
        input: action.payload.input
      }
    }
    case CLICK_CHECK: {
      const newList = state.todoList.map((item) => {
        if (item.id === action.payload.id) {
          const updatedItem = {
            ...item,
            completed: action.payload.checked
          }
          return updatedItem
        }
        return item
      })
      return {
        ...state,
        todoList: newList
      }
    }
    case DISPLAY_COMPLETED: {
      return {
        ...state,
        displayCompleted: !state.displayCompleted
      }
    }
    case DELETE_ITEM: {
      return {
        ...state,
        todoList: state.todoList.filter((item) => item.id !== action.payload.id)
      }
    }
    case RESET: {
      return initialState
    }
  }
}

function App() {
  const [list, dispatchTodoList] = useReducer(
    todoListReducer,
    JSON.parse(localStorage.getItem(LIST_KEY)) || initialState
  )
  // const [newInput, setNewInput] = useState('')
  // const [todoList, setTodoList] = useState([])
  // const [displayCompleted, setDisplayCompleted] = useState(false)
  const today = new Date()

  const handleAdd = () => {
    dispatchTodoList({
      type: ADD_ITEM
    })
  }
  
  const handleInput = (event) => {
    dispatchTodoList({
      type: UPDATE_INPUT,
      payload: { input: event.target.value }
    })
  }

  const handleClickCheck = (event, id) => {
    dispatchTodoList({
      type: CLICK_CHECK,
      payload: {
        id: id,
        checked: event.target.checked
      }
    })
  }

  const handleDisplayCompleted = () => {
    dispatchTodoList({
      type: DISPLAY_COMPLETED
    })
  }

  const handleDelete = (id) => {
    dispatchTodoList({
      type: DELETE_ITEM,
      payload: { id: id }
    })
  }

  const handleReset = () => {
    dispatchTodoList({ type: RESET })
  }

  useEffect(() => {
    localStorage.setItem(LIST_KEY, JSON.stringify(list))
  }, [list])

  return (
    <div className="container">
      <div className="date">Today is {today.toDateString()}</div>
      <div id="add-box">
        <button className="plus" onClick={handleAdd}>+</button>
        <input
          className="input"
          type="text"
          value={list.input}
          onChange={handleInput}
          placeholder="Add a task or habit"
        />
        <button className="reset" onClick={handleReset}>Reset</button>
      </div>
      <hr />
      <List
        list={list.todoList.filter((item) => item.completed == false)}
        onClickCheck={handleClickCheck}
        onClickDelete={handleDelete}
        checked={false}
      />
      {list.todoList.filter((item) => item.completed == true).length > 0 &&
        <div>
          <button className="completed" onClick={handleDisplayCompleted}>
            Completed
          </button>
          {list.displayCompleted &&
            <List
              list={list.todoList.filter((item) => item.completed == true)}
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
