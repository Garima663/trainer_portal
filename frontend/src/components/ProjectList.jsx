import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/trainer/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProjects(res.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (projects.length === 0) return <p>No projects found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold uppercase mb-4"> Projects</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
  <tr>
    <th className="px-4 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 bg-gray-200">
      Title
    </th>
    <th className="px-4 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 bg-gray-200">
      Description
    </th>
    <th className="px-4 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 bg-gray-200">
      Type
    </th>
    <th className="px-4 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 bg-gray-200">
      Created At
    </th>
    
  </tr>
</thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{project.title}</td>
                <td className="px-4 py-2">{project.description}</td>
                <td className="px-4 py-2 capitalize">{project.type}</td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {new Date(project.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
