# TimeTracker

TimeTracker is a full-stack web application for managing projects, teams, tasks, and time tracking. It supports role-based access control with Admin, Supervisor, and Member roles.

## Features

- User authentication (Register/Login)
- Role-based authorization
- Project management
- Team management
- Task assignment and tracking
- Time tracking (Start, Pause, Resume, Stop)
- Dashboard with statistics
- Responsive React frontend

## Tech Stack

### Frontend
- React
- React Router
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- PostgreSQL
- Express Session

---

# Project Structure

```
timetracker/
│
├── timetracker-frontend/
│
└── timetracker-backend/
```

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/your-username/timetracker.git
cd timetracker
```

---

## 2. Backend Setup

Navigate to the backend folder:

```bash
cd timetracker-backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=timetracker
DB_USER=postgres
DB_PASSWORD=your_password

SESSION_SECRET=your_secret
```

Run the server:

```bash
npm start
```

Backend will run on

```
http://localhost:5000
```

---

## 3. Frontend Setup

Navigate to the frontend folder:

```bash
cd timetracker-frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

Frontend will run on

```
http://localhost:5173
```

---

# Database

Create a PostgreSQL database named

```
timetracker
```


---

# User Roles

### Admin

- Manage teams
- Create/Edit/Delete projects
- View Projects
- View all tasks

### Supervisor

- Create tasks
- Assign tasks to team members
- Track team progress

### Member

- View assigned tasks
- Update task status
- Track working time

---

# Available Scripts

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```


---

# License

This project was developed for educational purposes.