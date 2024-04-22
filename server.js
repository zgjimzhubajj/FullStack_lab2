import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Employee from './model/Employee.js';
import Project from './model/Project.js';
import ProjectAssignment from './model/ProjectAssignment.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Add initial documents to Employee collection
const initialEmployees = [
  { employee_id: "emp001", full_name: "John Doe", email: "john@example.com", hashed_password: "password123" },
  { employee_id: "emp002", full_name: "Jane Smith", email: "jane@example.com", hashed_password: "password456" },
  { employee_id: "emp003", full_name: "Michael Johnson", email: "michael@example.com", hashed_password: "password789" },
  { employee_id: "emp004", full_name: "Emily Davis", email: "emily@example.com", hashed_password: "passwordabc" },
  { employee_id: "emp005", full_name: "David Brown", email: "david@example.com", hashed_password: "passworddef" }
];

Employee.insertMany(initialEmployees)
  .then(() => {
    console.log('Initial employees added');
  })
  .catch(err => {
    console.error('Error adding initial employees:', err);
  });

// Add initial documents to Project collection
const initialProjects = [
  { project_code: "proj001", project_name: "Project A", project_description: "Description of Project A" },
  { project_code: "proj002", project_name: "Project B", project_description: "Description of Project B" },
  { project_code: "proj003", project_name: "Project C", project_description: "Description of Project C" },
  { project_code: "proj004", project_name: "Project D", project_description: "Description of Project D" },
  { project_code: "proj005", project_name: "Project E", project_description: "Description of Project E" }
];

Project.insertMany(initialProjects)
  .then(() => {
    console.log('Initial projects added');
  })
  .catch(err => {
    console.error('Error adding initial projects:', err);
  });

// Add initial documents to ProjectAssignment collection
const initialProjectAssignments = [
  { employee_id: "emp001", project_code: "proj001", start_date: new Date('2024-04-01') },
  { employee_id: "emp002", project_code: "proj002", start_date: new Date('2024-04-02') },
  { employee_id: "emp003", project_code: "proj003", start_date: new Date('2024-04-03') },
  { employee_id: "emp004", project_code: "proj004", start_date: new Date('2024-04-04') },
  { employee_id: "emp005", project_code: "proj005", start_date: new Date('2024-04-05') }
];

ProjectAssignment.insertMany(initialProjectAssignments)
  .then(() => {
    console.log('Initial project assignments added');
  })
  .catch(err => {
    console.error('Error adding initial project assignments:', err);
  });


// Employee Collection Endpoints
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/employees', async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error('Error adding new employee:', err);
    res.status(400).json({ message: err.message });
  }
});

// Project Collection Endpoints
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error adding new project:', err);
    res.status(400).json({ message: err.message });
  }
});

// Project Assignment Collection Endpoints
app.get('/api/project_assignments', async (req, res) => {
  try {
    const projectAssignments = await ProjectAssignment.find();
    res.json(projectAssignments);
  } catch (err) {
    console.error('Error fetching project assignments:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/project_assignments', async (req, res) => {
  try {
    const newProjectAssignment = await ProjectAssignment.create(req.body);
    res.status(201).json(newProjectAssignment);
  } catch (err) {
    console.error('Error adding new project assignment:', err);
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
