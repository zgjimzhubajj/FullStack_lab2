import React, { useState, useEffect } from 'react';
import './ProjectAssignmentTable.css'; 

const ProjectAssignmentTable = () => {
  const [projectAssignments, setProjectAssignments] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    const fetchProjectAssignments = async () => {
      try {
        const projectAssignmentsResponse = await fetch('/api/project_assignments');

        if (projectAssignmentsResponse.ok) {
          let projectAssignmentsData = await projectAssignmentsResponse.json();

          // Here we sort the data based on the selected header and sortOrder
          if (sortBy) {
            projectAssignmentsData = projectAssignmentsData.sort((a, b) => {
              const aValue = a[sortBy];
              const bValue = b[sortBy];
              if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
              if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
              return 0;
            });
          }

          // While here we sort by start date to get the latest assignments as it was a requirement 
          projectAssignmentsData = projectAssignmentsData.sort((a, b) => {
            const aStartDate = new Date(a.start_date);
            const bStartDate = new Date(b.start_date);
            return sortOrder === 'asc' ? bStartDate - aStartDate : aStartDate - bStartDate;
          });

          //we set the latest 5 project assignments
          const latestAssignments = projectAssignmentsData.slice(0, 5);
          setProjectAssignments(latestAssignments);
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
  }, [sortBy, sortOrder]);


  const handleSort = (header) => {
    if (header === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(header);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      <h2>Latest Project Assignments</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('employee_id.employee_id')}>Employee_ID</th>
            <th onClick={() => handleSort('employee_id.full_name')}>Employee_name</th>
            <th onClick={() => handleSort('project_code.project_name')}>Project_name</th>
            <th onClick={() => handleSort('start_date')}>Start_date</th>
          </tr>
        </thead>
        <tbody>
          {projectAssignments.map(assignment => (
            <tr key={assignment._id}>
              <td>{assignment.employee_id.employee_id}</td>
              <td>{assignment.employee_id.full_name}</td>
              <td>{assignment.project_code.project_name}</td>
              <td>{assignment.start_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectAssignmentTable;
