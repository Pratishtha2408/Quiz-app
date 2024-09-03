package com.pdhiraj.online_quiz.controller;

import com.pdhiraj.online_quiz.model.Quiz;
import com.pdhiraj.online_quiz.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/get-all-quizzes")
    public ResponseEntity<List<Quiz>> getAllQuizzes(){
        List<Quiz> quizzes = quizService.getAllQuizzes();
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/quiz/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Quiz> theQuiz = quizService.getQuizById(id);
        if(theQuiz.isPresent()){
            return ResponseEntity.ok(theQuiz.get());
        }else{
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    @PostMapping("/quiz/fetch-quizzes-for-user")
    public ResponseEntity<String> getQuizForUser(@RequestParam int numOfQuestions, @RequestParam String subject, @RequestParam String title) {
        return quizService.getQuizForUser(numOfQuestions, subject, title);
    }

}
