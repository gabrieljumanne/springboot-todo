package com.castorosa.todo.service;

import com.castorosa.todo.model.Task;
import com.castorosa.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service // Marks this class as a service layer component
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // CREATE a task
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // READ all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // READ task by ID
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    // UPDATE task
    public Task updateTask(Long id, Task updatedTask) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setStatus(updatedTask.getStatus());
            task.setPriority(updatedTask.getPriority());
            task.setDueDate(updatedTask.getDueDate());
            task.setCompleted(updatedTask.isCompleted());
            return taskRepository.save(task);
        } else {
            return null;
        }
    }

    // DELETE task
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    // FILTERS
    public List<Task> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status);
    }

    public List<Task> getTasksByPriority(String priority) {
        return taskRepository.findByPriority(priority);
    }

    public List<Task> searchTasksByTitle(String keyword) {
        return taskRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public List<Task> getCompletedTasks() {
        return taskRepository.findByCompletedTrue();
    }

    public List<Task> getPendingTasks() {
        return taskRepository.findByCompletedFalse();
    }
}
