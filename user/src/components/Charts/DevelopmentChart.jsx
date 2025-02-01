import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const DevelopmentChart = ({ projectId }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Mock data for testing
    const mockProjects = [
      {
        id: "1",
        name: "Education Development",
        visualizationType: "bar",
        data: [
          { name: "Jan", value: 30 },
          { name: "Feb", value: 45 },
          { name: "Mar", value: 60 },
          { name: "Apr", value: 50 },
          { name: "May", value: 70 },
        ],
      },
      {
        id: "2",
        name: "Healthcare Development",
        visualizationType: "line",
        data: [
          { name: "Jan", value: 20 },
          { name: "Feb", value: 35 },
          { name: "Mar", value: 40 },
          { name: "Apr", value: 55 },
          { name: "May", value: 65 },
        ],
      },
    ];
    setProjects(mockProjects);
  }, []);

  const renderChart = (project) => {
    if (!project?.data || project.data.length === 0) {
      return (
        <p className="text-lg font-semibold text-center">
          No data available for this project.
        </p>
      );
    }

    switch (project.visualizationType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={project.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={project.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <p className="text-lg font-semibold text-center">
            Unsupported visualization type.
          </p>
        );
    }
  };

  // Filter projects by the selected projectId, or show all if 'all' is selected
  const filteredProjects = projectId === "all" ? projects : projects.filter((project) => project.id === projectId);

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-indigo-600 to-pink-600 p-1 rounded-md hover:scale-105 transition-transform duration-300 ease-in-out mb-6">
      <div className="w-full h-full bg-white rounded-md flex flex-wrap items-center justify-center gap-8 p-4 hover:shadow-lg">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex-1 min-w-[300px] max-w-full mb-2 overflow-hidden"
            >
              <h3 className="text-lg font-semibold mb-4 text-center">
                Project: {project.name}
              </h3>
              <h4 className="text-md font-semibold mb-4 text-center">
                Visualization Type: {project.visualizationType}
              </h4>
              {/* Chart occupying full width and height of its container */}
              <div className="w-full h-[300px] overflow-hidden">{renderChart(project)}</div>
            </div>
          ))
        ) : (
          <p className="text-lg font-semibold text-center">
            No data available for the selected development type.
          </p>
        )}
      </div>
    </div>
  );
};

export default DevelopmentChart;
