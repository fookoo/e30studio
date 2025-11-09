
import './App.css'
import { useToggle } from 'e30studio/hooks'


function App() {
  const { value, toggle } = useToggle(false)

  return (
    <>
     <pre>{value ? 'on' : 'off'}</pre>
      <button onClick={toggle}>on/off</button>
    </>
  )
}

export default App
