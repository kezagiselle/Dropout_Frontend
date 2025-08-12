import { useState } from 'react'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/LoginPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <LoginPage /> */}
     <SignUpPage />
    </>
  )
}

export default App
