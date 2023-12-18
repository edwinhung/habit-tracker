
function App() {
  const todoList = ['meditate', 'cold shower', 'read']

  return (
    <div>
      <ul>
        {todoList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
