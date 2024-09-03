import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { createQuizForUser, getSubjects } from "../../../utils/QuizService"

const QuizStepper = () => {
    const[selectedTitle, setSelectedTitle] = useState("")
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedSubject, setSelectedSubject] = useState("")
    const [selectedNumQuestions, setSelectedNumQuestions] = useState("")
    const [subjects, setSubjects] = useState([])
	const navigate = useNavigate()

    useEffect(() => {
        fetchSubjectData()
    }, [])

    const fetchSubjectData = async () => {
        try {
            const allSubjects = await getSubjects()
            setSubjects(allSubjects)
        } catch (error) {
            console.error(error)
        }
    }
    
    const handleNext = async () => {
        
        if (currentStep === 4) {
            // console.log("hello")
            if(selectedSubject && selectedNumQuestions && selectedTitle){
                await createQuizForUser(selectedNumQuestions, selectedSubject, selectedTitle)
                    alert("Quiz Created Successfully!")
                    navigate("/admin")
            }else {
                alert("Please select a subject and number of questions.")
            }
        } else {
            setCurrentStep((prevStep) => prevStep + 1)
        }
    }

    const handlePrevious = () => {
        setCurrentStep((prevStep) => prevStep - 1)
    }

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value)
    }

    const handleNumQuestionsChange = (event) => {
        setSelectedNumQuestions(event.target.value)
    }
    
    const renderStepContent = () => {
        switch(currentStep){
            case 1:
                return (
                    <div>
                        <h3 className='text-info mb-2'>Give a title to your new quiz : </h3>
                        
								<textarea className="form-control"
								value={selectedTitle}
								onChange={(e) => setSelectedTitle(e.target.value)}> </textarea>
							
                    </div>
                )
            case 2:
                return (
                    <div>
                        <h3 className='text-info mb-2'>Create a new quiz on : </h3>
                        <select
								className="form-select"
								value={selectedSubject}
								onChange={handleSubjectChange}>
								<option value="">Select a subject</option>
								{subjects.map((subject) => (
									<option key={subject} value={subject}>
										{subject}
									</option>
								))}
							</select>
                    </div>
                    
                )
                case 3:
					return (
						<div>
							<h4 className="text-info mb-2">How many questions your quiz should contain ?</h4>
							<input
								type="number"
								className="form-control"
								value={selectedNumQuestions}
								onChange={handleNumQuestionsChange}
								placeholder="Enter the number of questions"
							/>
						</div>
					)
				case 4:
					return (
						<div>
							<h2>Confirmation</h2>
                            <p>Quiz Title: {selectedTitle}</p>
							<p>Subject: {selectedSubject}</p>
							<p>Number of Questions: {selectedNumQuestions}</p>
						</div>
					)
				default:
					return null
        }
    }

    const renderProgressBar = () => {
        const progress = ((currentStep - 1) / 3) * 100
        return (
            <div className="progress">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}>
                    Step {currentStep}
                </div>
            </div>
        )
    }

    return (
        <section className="mt-5">
            <h3 style={{ color: "GrayText" }} className="mb-4">
                Create a New Quiz
            </h3>
            {renderProgressBar()}
            <div className="card">
                <div className="card-body">
                    {renderStepContent()}
                    <div className="d-flex justify-content-between mt-4">
                        {currentStep > 1 && (
                            <button className="btn btn-primary" onClick={handlePrevious}>
                                Previous
                            </button>
                        )}
                        {currentStep < 4 && (
                            <button
                                className="btn btn-primary"
                                onClick={handleNext}
                                disabled={
                                    (currentStep === 1 && !selectedTitle) ||
                                    (currentStep === 2 && !selectedSubject) ||
                                    (currentStep === 3 && !selectedNumQuestions)
                                }>
                                Next
                            </button>
                        )}
                        {currentStep === 4 && (
                            <button type="submit" className="btn btn-outline-success mr-2" onClick={handleNext}>
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            </div>
		</section>
    )
}

export default QuizStepper
