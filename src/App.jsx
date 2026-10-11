import React, { useState } from "react";
import "./App.css";

// Part A: User Greeting
function UserGreeting() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <section className="section">
      <h2>1. Conditional Rendering</h2>

      {isLoggedIn ? (
        <h3>Welcome back, User!</h3>
      ) : (
        <h3>Please log in to continue.</h3>
      )}

      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </section>
  );
}

// Part A: Loading Indicator
function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(true);

  // Using if-else
  if (isLoading) {
    return (
      <section className="section">
        <h2>2. Loading Indicator</h2>
        <p className="spinner">Loading...</p>
        <button onClick={() => setIsLoading(false)}>Show Content</button>
      </section>
    );
  }

  return (
    <section className="section">
      <h2>2. Loading Indicator</h2>
      <p>Content loaded successfully!</p>
      <button onClick={() => setIsLoading(true)}>Load Again</button>
    </section>
  );
}

// Part B: Todo List
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Practice JavaScript", completed: false },
    { id: 3, text: "Complete Assignment", completed: true }
  ]);

  const [task, setTask] = useState("");

  function addTodo(e) {
    e.preventDefault();

    if (!task.trim()) {
      alert("Please enter a task");
      return;
    }

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: task.trim(),
        completed: false
      }
    ]);

    setTask("");
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <section className="section">
      <h2>3. Todo List</h2>

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          placeholder="Enter a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {todos.length === 0 && <p>No tasks available.</p>}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className={todo.completed ? "completed" : ""}>
                {todo.text}
              </span>
            </label>

            <button className="remove-button" onClick={() => removeTodo(todo.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Part C: Registration Form
function RegistrationForm() {
  const initialData = {
    name: "",
    email: "",
    password: "",
    gender: "",
    interests: [],
    country: "",
    bio: ""
  };

  const [formData, setFormData] = useState(initialData);
  const [submittedData, setSubmittedData] = useState(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "interests") {
      setFormData((previous) => ({
        ...previous,
        interests: checked
          ? [...previous.interests, value]
          : previous.interests.filter((item) => item !== value)
      }));
    } else {
      setFormData((previous) => ({
        ...previous,
        [name]: value
      }));
    }

    setSubmittedData(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.gender ||
      formData.interests.length === 0 ||
      !formData.country ||
      !formData.bio.trim()
    ) {
      alert("Please fill in all fields");
      return;
    }

    setSubmittedData({ ...formData });
    setFormData(initialData);
  }

  return (
    <section className="section">
      <h2>4. Registration Form</h2>

      <form onSubmit={handleSubmit} className="registration-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <div>
          <p>Gender:</p>

          <label className="inline-label">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              required
            />
            Male
          </label>

          <label className="inline-label">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>

          <label className="inline-label">
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>

        <div>
          <p>Interests:</p>

          {["Reading", "Music", "Sports"].map((interest) => (
            <label className="inline-label" key={interest}>
              <input
                type="checkbox"
                name="interests"
                value={interest}
                checked={formData.interests.includes(interest)}
                onChange={handleChange}
              />
              {interest}
            </label>
          ))}
        </div>

        <label>
          Country:
          <select name="country" value={formData.country} onChange={handleChange} required>
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
        </label>

        <label>
          Bio:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            required
          />
        </label>

        <button type="submit">Register</button>
      </form>

      {submittedData && (
        <div className="success">
          <h3>Registration Successful!</h3>
          <p>
            <strong>Name:</strong> {submittedData.name}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>Password:</strong> Not displayed for privacy
          </p>
          <p>
            <strong>Gender:</strong> {submittedData.gender}
          </p>
          <p>
            <strong>Interests:</strong> {submittedData.interests.join(", ")}
          </p>
          <p>
            <strong>Country:</strong> {submittedData.country}
          </p>
          <p>
            <strong>Bio:</strong> {submittedData.bio}
          </p>
        </div>
      )}
    </section>
  );
}

// Main Application
function App() {
  return (
    <div className="container">
      <h1>React Concepts Demo</h1>

      <UserGreeting />
      <LoadingIndicator />
      <TodoList />
      <RegistrationForm />
    </div>
  );
}

export default App;
