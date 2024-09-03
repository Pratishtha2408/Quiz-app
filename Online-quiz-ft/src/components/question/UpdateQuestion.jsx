import React, { useState, useEffect } from "react"
import { getQuestionById, updateQuestion } from "../../../utils/QuizService"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const UpdateQuestion = () => {
    const[question, setQuestion] = useState("")
    const[choices, setChoices] = useState([""])
    const[correctAnswers, setCorrectAnswers] = useState([""])
    const[isLoading, setIsLoading] = useState(true)

    const {id} = useParams()
    
    useEffect(() => {
		fetchQuestion()
	}, [])

    const fetchQuestion = async() => {
        try {
            const questionToUpdate = await getQuestionById(id)
            if(questionToUpdate){
                setQuestion(questionToUpdate.question)
                setChoices(questionToUpdate.choices)
                setCorrectAnswers(questionToUpdate.correctAnswers)
            }
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value)
    }

    const handleChoiceChange = (index, e) => {
        const updatedChoices = [...choices]
        updatedChoices[index] = e.target.value
        setChoices(updatedChoices)
    }

    const handleCorrectAnswerChange = (e) => {
        setCorrectAnswers(e.target.value)
    }

    const handleQuestionUpdate = async(e) => {
        e.preventDefault()
        try {
            const updatedQuestion = {question, choices, correctAnswers: correctAnswers.toString().split(",").map((answer) => answer.trim()) }
            await updateQuestion(id, updatedQuestion)
			navigate("/all-quizzes")
        } catch (error) {
            console.error(error)
        }
    }

    if(isLoading){
        <p>Loading...</p>
    }

    return (
        <section className="container">
            <h4 className="mt-5" style={{color: "GrayText"}}>Update Quiz Question</h4>
            <div className="col-md-8">
                <form onSubmit={handleQuestionUpdate}>
                    <div className="form-group">
                        <label className="text-info">Question:</label>
                        <textarea className="form-control" rows={4} value={question} onChange={handleQuestionChange}></textarea>
                    </div>

                    <div className="form-group"> 
                        <label className="text-info">Choices:</label>
                        {choices.map((choice, index) => (
                            <input 
                            key = {index}
                            type="text" 
                            className="form-control mb-4"
                            value={choice}
                            onChange={(e) => handleChoiceChange(index, e)}
                            />

                            
                        ))}
                    </div>

                    <div className="form-group"> 
                        <label className="text-info">Correct Answer(s):</label>
                        <input
                            type="text" 
                            className="form-control mb-4"
                            value={correctAnswers}
                            onChange={handleCorrectAnswerChange}
                        />
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn btn-sm btn-outline-warning">
                            Update Question
                        </button>

                        <Link to={"/all-quizzes"} className="btn btn-outline-primary ml-2">
							Back to all questions
						</Link>

                    </div>
                </form>
            </div>
        </section>
    )
}

export default UpdateQuestion