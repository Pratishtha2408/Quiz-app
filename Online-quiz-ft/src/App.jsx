import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import QuizStepper from "./components/question/QuizStepper"
import Quiz from "./components/quiz/Quiz"
import FetchQuiz from "./components/quiz/FetchQuiz"
import QuizResult from "./components/quiz/QuizResult"
import GetAllQues from "./components/quiz/GetAllQues"
import AddQuestion from "./components/question/AddQuestion"
import UpdateQuestion from "./components/question/UpdateQuestion"
import Navbar from "./components/layouts/NavBar"
import Admin from "./components/Admin"

function App() {

  return (
    <main className='container mt-5 mb-5'>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/quiz-stepper" element={<QuizStepper />} />
            <Route path="/take-quiz" element={<Quiz />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/fetch-quiz" element={<FetchQuiz />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/create-quiz" element={<AddQuestion />} />
            <Route path="/update-quiz/:id" element={<UpdateQuestion />} />
            <Route path="/all-quizzes" element={<GetAllQues />} />
            <Route path="/quiz-result" element={<QuizResult />} />
          </Routes>
      </Router>
    </main>
      
  )
}

export default App
