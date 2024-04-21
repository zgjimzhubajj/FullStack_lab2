import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectAssignmentTable = () => {
  const [projectAssignments, setProjectAssignments] = useState([]);

  useEffect(() => {
    const fetchProjectAssignments = async () => {
      try {
        const response = await axios.get('/api/project_assignments');
        if (Array.isArray(response.data)) { // Check if response is an array
          setProjectAssignments(response.data.slice(0, 5)); 
        } else {
          console.error('Response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching project assignments:', error);
      }
    };

    fetchProjectAssignments();

    const interval = setInterval(fetchProjectAssignments, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Latest Project Assignments</h2>
      <table>
        <thead>
          <tr>
            <th>Employee_ID</th>
            <th>Employee_name</th>
            <th>Project_name</th>
            <th>Start_date</th>
          </tr>
        </thead>
        <tbody>
          {projectAssignments.map(assignment => (
            <tr key={assignment._id}>
              <td>{assignment.employee_id}</td>
              <td>{assignment.employee_name}</td>
              <td>{assignment.project_name}</td>
              <td>{assignment.start_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectAssignmentTable;
