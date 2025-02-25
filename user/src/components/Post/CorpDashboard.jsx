import { useState } from "react";
import AddProjectModal from "./AddProjectModal";

export default function CorpDashboard() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Road Repair Project",
      category: "roads",
      startDate: "2025-01-01",
      description: "Repairing roads in Ward 5",
      visualizationType: "bar",
      data: '[{"name": "Phase 1", "value": 30}, {"name": "Phase 2", "value": 70}]',
    },
  ]);

  // Add a new project
  const handleAddProject = (projectData) => {
    const newProject = { ...projectData, id: projects.length + 1 };
    setProjects([...projects, newProject]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Corporator Dashboard</h1>
      <AddProjectModal onAddProject={handleAddProject} />

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Existing Projects</h2>
        <div className="mt-4 space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
              <button className="text-blue-500 hover:underline">✏️ Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
