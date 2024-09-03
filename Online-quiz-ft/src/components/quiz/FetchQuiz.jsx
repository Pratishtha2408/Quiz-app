import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllQuizzes } from "../../../utils/QuizService";

const FetchQuiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const allQuizzes = await getAllQuizzes();
            setQuizzes(allQuizzes);
        } catch (error) {
            console.error("Error fetching quizzes: ", error);
        }
    };

    const handleQuizClick = (quizId) => {
        // console.log("Navigating to quiz:", quizId);
        navigate(`/quiz/${quizId}`);
    };

    return (
        <div className="container">
            <h2 className="my-4">Available Quizzes</h2>
            <div className="list-group">
                {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <button
                            key={quiz.id}
                            className="list-group-item list-group-item-action"
                            onClick={() => handleQuizClick(quiz.id)}
                        >
                            {quiz.title}
                        </button>
                    ))
                ) : (
                    <p>No quizzes available</p>
                )}
            </div>
        </div>
    );
};

export default FetchQuiz;

