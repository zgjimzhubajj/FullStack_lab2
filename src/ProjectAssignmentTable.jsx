import React, { useState, useEffect } from 'react';

const ProjectAssignmentTable = () => {
  const [projectAssignments, setProjectAssignments] = useState([]);

  useEffect(() => {
    const fetchProjectAssignments = async () => {
      try {
        const response = await fetch('/api/project_assignments');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setProjectAssignments(data);
          } else {
            console.error('Response is not an array:', data);
          }
        } else {
          throw new Error('Failed to fetch project assignments');
        }
      } catch (error) {
        console.error('Error fetching project assignments:', error);
      }
    };

    fetchProjectAssignments();

    const interval = setInterval(fetchProjectAssignments, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Latest Project Assignments</h2>
      <table>
        <thead>
          <tr>
            <th>Employee_ID</th>
            <th>Project_code</th>
            <th>Start_date</th>
          </tr>
        </thead>
        <tbody>
          {projectAssignments.map(assignment => (
            <tr key={assignment._id}>
              <td>{assignment.employee_id}</td>
              <td>{assignment.project_code}</td>
              <td>{assignment.start_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectAssignmentTable;
