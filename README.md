# ✅ Castorosa To-Do List Application

A simple, full-stack **To-Do List web application** built using **Spring Boot** (Java), **PostgreSQL**, and a basic **HTML/CSS/JavaScript frontend**. This project demonstrates **CRUD operations**, **RESTful APIs**, and core **OOP principles** like Abstraction, Encapsulation, and Layered Architecture.

---

## 📌 Features

- Add, update, delete, and view tasks
- Filter by status (completed/pending)
- Filter by priority and search by title
- Connects with PostgreSQL database
- RESTful backend with Spring Boot
- Web-based interface using HTML/JS
- Clean project structure following OOP

---

## 🛠 Tech Stack

| Layer        | Technology            |
|--------------|-----------------------|
| Backend      | Java 17, Spring Boot  |
| Database     | PostgreSQL            |
| Frontend     | HTML, CSS, JavaScript |
| REST Testing | Postman               |
| Build Tool   | Maven                 |

---

## 🧠 OOP Principles Applied

| Principle        | Implementation                                                                 |
|------------------|---------------------------------------------------------------------------------|
| **Abstraction**  | Business logic is hidden inside `TaskService`                                   |
| **Encapsulation**| `Task.java` model class uses private fields with public getters/setters         |
| **Inheritance**  | CRUD functionality inherited from `JpaRepository`                               |
| **Polymorphism** | Overriding/customizing repository methods using Spring JPA query methods        |

---

## 🚀 Getting Started

### 📦 Prerequisites

- Java 17
- Maven
- PostgreSQL installed and running
- VS Code or IntelliJ

---

### 🧱 Project Structure

```
castorosa-todo/
├── src/main/java/com/castorosa/todo
│   ├── model/Task.java
│   ├── repository/TaskRepository.java
│   ├── service/TaskService.java
│   ├── controller/TaskController.java
│   └── TodoApplication.java
├── src/main/resources
│   └── application.properties
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js
```

---

### ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/castorosa-todo.git
   cd castorosa-todo
   ```

2. **Create the PostgreSQL database**
   ```sql
   CREATE DATABASE todo_db;
   ```

3. **Configure `application.properties`**
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/todo_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

4. **Build and run the application**
   ```bash
   ./mvnw spring-boot:run
   ```

5. **Open the frontend**
   - Open `frontend/index.html` in your browser.
   - It connects to your backend running on `http://localhost:8080/api/tasks` using `fetch()`.

---

## 📮 API Endpoints

| Method | Endpoint                         | Description              |
| ------ | -------------------------------- | ------------------------ |
| GET    | `/api/tasks`                     | List all tasks           |
| POST   | `/api/tasks`                     | Create a new task        |
| GET    | `/api/tasks/{id}`                | Get task by ID           |
| PUT    | `/api/tasks/{id}`                | Update a task            |
| DELETE | `/api/tasks/{id}`                | Delete a task            |
| GET    | `/api/tasks/status/{status}`     | Filter tasks by status   |
| GET    | `/api/tasks/priority/{priority}` | Filter tasks by priority |
| GET    | `/api/tasks/search?keyword=abc`  | Search tasks by title    |
| GET    | `/api/tasks/completed`           | List completed tasks     |
| GET    | `/api/tasks/pending`             | List pending tasks       |

---

## 🖼 Sample Screenshot

![image](https://github.com/user-attachments/assets/e269cf0c-870f-4f7e-9c5e-36eae0b54c4c)

```html
<!-- Example placeholder -->
<img src="screenshot.png" width="700px" alt="Web UI Screenshot" />
```

---

## 🧑‍💻 Author

**Castorosa**  
[GitHub Profile](https://github.com/gabrieljumanne)  
[Email](mailto:your-email@example.com)

---

## 📜 License

This project is licensed for educational and personal use.  
Feel free to modify and improve it for your own purposes.
