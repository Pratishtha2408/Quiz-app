package com.pdhiraj.online_quiz.service;

import com.pdhiraj.online_quiz.model.Question;
import com.pdhiraj.online_quiz.model.Quiz;
import com.pdhiraj.online_quiz.repository.QuestionRepository;
import com.pdhiraj.online_quiz.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuizService{
    private final QuestionRepository questionRepository;

    @Autowired
    QuizRepository quizRepository;

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public ResponseEntity<String> getQuizForUser(Integer numOfQuestions, String subject, String title) {
        List<Question> questions = questionRepository.findRandomQuestionsBySubject(subject, numOfQuestions);
        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestions(questions);
        quizRepository.save(quiz);
        return new ResponseEntity<>("Success", HttpStatus.CREATED);
    }

    public Optional<Quiz> getQuizById(Long id) {
        return quizRepository.findById(id);
    }
}
