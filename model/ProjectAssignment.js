import mongoose, { Schema } from 'mongoose';

const projectAssignmentSchema = new mongoose.Schema({
  employee_id: {type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true},
  project_code:{type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true},
  start_date: Date
}); 

const ProjectAssignment = mongoose.model('ProjectAssignment', projectAssignmentSchema);



export default ProjectAssignment;
