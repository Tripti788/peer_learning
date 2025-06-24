import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar'
import Login from './components/Login'
import { Router, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import QuestionList from './components/Questions/QuestionList'
import QuestionForm from './components/Questions/QuestionForm'
import QuestionDetail from './components/Questions/QuestionDetail'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <NavBar/>
      <Routes>
        <Route path='/' element={<QuestionList/>} />
        <Route path='/login' element={<Login/>}  />
        <Route path='/register' element={<Register/> }  />
        <Route path='/question/ask' element={<QuestionForm />} />
        <Route path='/question/:id' element={<QuestionDetail />} />
      </Routes>
     </>
  )
}

export default App
