import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:8080/api/quizzes"
})

export const createQuestion = async(quizQustion) =>{
    try {
        const response = await api.post("/create-new-question", quizQustion)
        return response.data
    } catch (error) {
        console.error(error)
    }
}


export const getAllQuizzes = async() =>{
    try {
        const response = await api.get("/get-all-quizzes")
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getAllQuestions = async() =>{
    try {
        const response = await api.get("/all-questions")
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}

export const createQuizForUser = async(number, subject, title) =>{
    try {
        const response = await api.post(`/quiz/fetch-quizzes-for-user?numOfQuestions=${number}&subject=${subject}&title=${title}`)
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getSubjects = async() =>{
    try {
        const response = await api.get("/subjects")
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const updateQuestion = async(id, question) =>{
    try {
        const response = await api.put(`/question/${id}/update`, question)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getQuestionById = async(id) =>{
    try{
        const response = await api.get(`/question/${id}`)
        return response.data
    }catch (error){
        console.error(error)
    }
}

export const getQuizById = async(id) =>{
    try{
        const response = await api.get(`/quiz/${id}`)
        return response.data
    }catch (error){
        console.error(error)
    }
}

export const deleteQuestion = async(id) =>{
    try{
        const response = await api.get(`/question/${id}/delete`)
        return response.data
    }catch (error){
        console.error(error)
    }
}