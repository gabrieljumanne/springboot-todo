const API_URL = 'http://localhost:8080/api/tasks';

const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const taskCount = document.getElementById('taskCount');
const emptyState = document.getElementById('emptyState');

let tasks = [];

// Load tasks on page load
fetchTasks();

// Form submit - Add task
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Validate input
  if (!titleInput.value.trim()) {
    showNotification('Please enter a task title', 'error');
    return;
  }

  const newTask = {
    title: titleInput.value.trim(),
    description: descInput.value.trim(),
    status: "PENDING",
    priority: "MEDIUM",
    completed: false
  };

  try {
    // Add loading state
    const submitBtn = taskForm.querySelector('.add-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-icon">⏳</span> Adding...';
    submitBtn.disabled = true;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    });

    if (!response.ok) {
      throw new Error('Failed to add task');
    }

    taskForm.reset();
    await fetchTasks();
    showNotification('Task added successfully!', 'success');

    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
  } catch (error) {
    console.error('Error adding task:', error);
    showNotification('Failed to add task. Please try again.', 'error');
    
    // Reset button
    const submitBtn = taskForm.querySelector('.add-btn');
    submitBtn.innerHTML = '<span class="btn-icon">+</span> Add Task';
    submitBtn.disabled = false;
  }
});

// Fetch and render all tasks
async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    
    tasks = await response.json();
    renderTasks();
    updateTaskCount();
    
  } catch (error) {
    console.error('Error fetching tasks:', error);
    showNotification('Failed to load tasks. Please refresh the page.', 'error');
  }
}

// Render tasks in the UI
function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <div class="task-content">
        <div class="task-title">
          ${escapeHtml(task.title)}
          ${task.completed ? '<span class="task-status">✅ Completed</span>' : ''}
        </div>
        ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
      </div>
      <div class="task-actions">
        <button class="delete-btn" onclick="deleteTask(${task.id})" title="Delete task">
          🗑️ Delete
        </button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Update task count
function updateTaskCount() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  
  if (totalTasks === 0) {
    taskCount.textContent = 'No tasks';
  } else if (completedTasks === totalTasks) {
    taskCount.textContent = `All ${totalTasks} tasks completed! 🎉`;
  } else {
    taskCount.textContent = `${completedTasks}/${totalTasks} completed`;
  }
}

// Delete task with confirmation
async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    await fetchTasks();
    showNotification('Task deleted successfully!', 'success');
    
  } catch (error) {
    console.error('Error deleting task:', error);
    showNotification('Failed to delete task. Please try again.', 'error');
  }
}

// Utility function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Show notification
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
    max-width: 300px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;

  // Set background color based on type
  switch (type) {
    case 'success':
      notification.style.background = '#10b981';
      break;
    case 'error':
      notification.style.background = '#ef4444';
      break;
    default:
      notification.style.background = '#3b82f6';
  }

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Enter to add task
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    taskForm.dispatchEvent(new Event('submit'));
  }
  
  // Escape to clear form
  if (e.key === 'Escape') {
    taskForm.reset();
    titleInput.focus();
  }
});

// Focus on title input when page loads
window.addEventListener('load', () => {
  titleInput.focus();
});