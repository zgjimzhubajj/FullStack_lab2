import mongoose from 'mongoose';

const projectAssignmentSchema = new mongoose.Schema({
  employee_id: String,
  project_code: String,
  start_date: Date
});

const ProjectAssignment = mongoose.model('ProjectAssignment', projectAssignmentSchema);

export default ProjectAssignment;
