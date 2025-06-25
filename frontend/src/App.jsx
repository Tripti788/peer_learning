import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import QuestionList from './components/Questions/QuestionList';
import QuestionForm from './components/Questions/QuestionForm';
import QuestionDetail from './components/Questions/QuestionDetail';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      <NavBar />
      <div className="container py-4">
        <Routes>
          <Route path='/' element={<QuestionList />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/question/ask' element={<QuestionForm />} />
          <Route path='/question/:id' element={<QuestionDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
