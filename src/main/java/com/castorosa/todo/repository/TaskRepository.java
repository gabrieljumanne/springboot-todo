//data access layer for the task entity
package com.castorosa.todo.repository;

import com.castorosa.todo.model.Task;
//import spring JPA components 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

// This interface gives us CRUD methods for the Task entity
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // custom query for quey operation  for the database TASK
    List<Task> findByStatus(String status);
    List<Task> findByPriority(String priority);
    List<Task> findByDueDateBefore(LocalDateTime dueDate);
    List<Task> findByTitleContainingIgnoreCase(String keyword);
    List<Task> findByStatusAndPriority(String status, String priority);
    List<Task> findByCompletedTrue();
    List<Task> findByCompletedFalse();
}
