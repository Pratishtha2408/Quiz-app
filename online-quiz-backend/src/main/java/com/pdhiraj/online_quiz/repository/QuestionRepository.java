package com.pdhiraj.online_quiz.repository;

import com.pdhiraj.online_quiz.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question,Long> {

    @Query("SELECT DISTINCT q.subject FROM Question q")
    List<String> findDistinctSubjects();

//    Page<Question> findBySubject(String subject, Pageable pageable);

    @Query(value = "SELECT * FROM question q WHERE q.subject=:subject ORDER BY RANDOM() LIMIT :numOfQuestions", nativeQuery = true)
    List<Question> findRandomQuestionsBySubject(String subject, int numOfQuestions);
}
