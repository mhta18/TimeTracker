import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./pages/DashboardLayout";
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Project from './pages/Project';
import Tasks from './pages/Tasks';
import TaskFormPage from './pages/TaskFormPage';
import Teams from './pages/Teams';
import TeamPage from './pages/TeamPage';
import Timer from './pages/Timer';
import TaskDetails from './pages/TaskDetails';
import './App.css'

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/projects/:id"
            element={<ProjectDetails />}
          />

          <Route
            path="/projects/:id/edit"
            element={<Project />}
          />


          <Route
            path="/projects/create"
            element={<Project />}
          />

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/tasks/create"
            element={<TaskFormPage />}
          />

          <Route
            path="/tasks/:id/view"
            element={<TaskDetails />}
          />

          <Route
            path="/tasks/:id/edit"
            element={<TaskFormPage />}
          />

          <Route path="/tasks/:id/status" element={<TaskFormPage mode="status" />} />
          
          <Route
            path="/teams"
            element={<Teams />}
          />
          <Route
            path="/teams/create"
            element={<TeamPage />}
          />

          <Route
            path="/teams/:id/edit"
            element={<TeamPage />}
          />

          <Route
              path="/timer"
              element={<Timer />}
            />
{/* 
            <Route
              path="/history"
              element={<History />}
            />    */}

        </Route>


      </Routes>

    </BrowserRouter>

  );

}

export default App;

