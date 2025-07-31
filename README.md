# Focus Flow

**Focus Flow** is a productivity web application that helps you manage projects, tasks, and habits with a focus on daily progress and time tracking. It features project and task management, a Pomodoro timer, habit tracking, and visual dashboards to help you stay on track.

---

## Features

- **Project & Task Management:**  
  Create projects, add tasks and subtasks, set daily goals, and track completion.

- **Today's Tasks:**  
  Mark tasks as "in today" to focus on what matters most each day.

- **Pomodoro Timer:**  
  Built-in timer for focused work sessions, with automatic time tracking for tasks.

- **Habit Tracker:**  
  Track daily habits, set targets, and view streaks and statistics.

- **Visual Dashboards:**  
  See your progress, completed tasks, and time spent at a glance.

- **MongoDB Backend:**  
  All data is stored in MongoDB for persistence.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally on default port)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd focus-flow
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start MongoDB:**  
   Make sure MongoDB is running. If not, start it with:
   ```sh
   mongod --dbpath "C:\data\db"
   ```
   (or your preferred data directory)

4. **Start the server:**
   ```sh
   npm start
   ```
   or
   ```sh
   node server.js
   ```

5. **Open the app:**  
   Go to [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

---

## Project Structure

```
focus-flow/
├── index.html         # Main frontend (projects, tasks, dashboard)
├── habits.html        # Habits tracker frontend
├── server.js          # Express backend server
├── app.js             # (Legacy/unused server file)
├── package.json       # Project dependencies and scripts
├── README.md          # This file
└── ...                # Other config and static files
```

---

## API Endpoints

- `GET /api/projects` — List all projects
- `POST /api/projects` — Create a new project
- `PUT /api/projects/:id` — Update a project (including tasks)
- `DELETE /api/projects/:id` — Delete a project

- `GET /api/habits` — List all habits
- `POST /api/habits` — Create a new habit
- `PUT /api/habits/:id` — Update a habit
- `DELETE /api/habits/:id` — Delete a habit

---

## Usage Tips

- **Add tasks to “Today’s Tasks”** by clicking the ☀️ icon next to a task.
- **Set daily goals** for tasks to track your progress.
- **Use the Pomodoro timer** to log focused work sessions.
- **Track habits** on the Habits page for daily consistency.

---

## Troubleshooting

- If you see "This site can’t be reached", ensure:
  - MongoDB is running
  - The server is started from the `focus-flow` directory
  - You are visiting [http://127.0.0.1:5000](http://127.0.0.1:5000)

---

## License

MIT License
