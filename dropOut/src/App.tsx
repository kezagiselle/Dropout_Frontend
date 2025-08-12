import { useState } from 'react'
import LoginPage from './components/LoginPage'
// import SignUpPage from './components/LoginPage'
import ResetPasswordPage from './components/ResetPassword'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <LoginPage /> */}
     {/* <SignUpPage /> */}
     <ResetPasswordPage />
    </>
  )
}

export default App
