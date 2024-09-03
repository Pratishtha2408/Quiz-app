package com.pdhiraj.online_quiz.repository;

import com.pdhiraj.online_quiz.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
}
