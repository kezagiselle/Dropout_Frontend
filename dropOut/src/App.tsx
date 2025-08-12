import { useState } from 'react'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUp'
// import ResetPasswordPage from './components/ResetPassword'
import NewPasswordReset from './components/ResetInfo'
import PasswordChangedConfirmation from './components/PasswordChange'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <LoginPage />
     {/* <SignUpPage /> */}
     {/* <ResetPasswordPage /> */}
     {/* <PasswordChangedConfirmation /> */}
     {/* <NewPasswordReset /> */}
    </>
  )
}

export default App
