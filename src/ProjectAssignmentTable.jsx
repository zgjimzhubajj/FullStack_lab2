import React, { useState, useEffect } from 'react';
import './ProjectAssignmentTable.css'; 

const ProjectAssignmentTable = () => {
  const [projectAssignments, setProjectAssignments] = useState([]);

  useEffect(() => {
    const fetchProjectAssignments = async () => {
      try {
        const projectAssignmentsResponse = await fetch('/api/project_assignments');
        const projectsResponse = await fetch('/api/projects');
        const employeesResponse = await fetch('/api/employees');

        if (projectAssignmentsResponse.ok && projectsResponse.ok && employeesResponse.ok) {
          const projectAssignmentsData = await projectAssignmentsResponse.json();
          const projectsData = await projectsResponse.json();
          const employeesData = await employeesResponse.json();

          const combinedData = projectAssignmentsData.map(assignment => {
            const project = projectsData.find(project => project.project_code === assignment.project_code);
            const employee = employeesData.find(employee => employee.employee_id === assignment.employee_id);
            return {
              ...assignment,
              project_name: project ? project.project_name : 'Unknown Project',
              full_name: employee ? employee.full_name : 'Unknown Employee'
            };
          });

        // We sort the combinedData array by start_date in descending order, so that we always get the latest project assignments
        combinedData.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
        
        // Here we select only 5 items based on the (latest data)
        const latestData = combinedData.slice(0, 5);

        setProjectAssignments(latestData);

        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
            <th>Employee_name</th>
            <th>Project_name</th>
            <th>Start_date</th>
          </tr>
        </thead>
        <tbody>
          {projectAssignments.map(assignment => (
            <tr key={assignment._id}>
              <td>{assignment.employee_id}</td>
              <td>{assignment.full_name}</td>
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
