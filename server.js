import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";
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
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    insertDoc();
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
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
    const projectAssignments = await ProjectAssignment.find()
      .populate('employee_id') // we populate with Employee data with .populate
      .populate('project_code'); 
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
