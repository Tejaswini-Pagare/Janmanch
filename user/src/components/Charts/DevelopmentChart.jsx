import React, { useState, useEffect } from "react";
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
import EditGraphModal from "../Modal/EditGraphModel";
import { toast } from "react-toastify";

const DevelopmentChart = ({ project, onUpdate }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [updating, setUpdating] = useState(false); // Added updating state

  const handleEditClick = (project) => {
    setCurrentProject(project);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("https://janmanch-cep.onrender.com/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  const handleSaveChanges = async (updatedProject) => {
    try {
      setUpdating(true); // Start updating state
      const response = await fetch(`https://janmanch-cep.onrender.com/api/corps/update/${updatedProject._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: updatedProject.description,
          data: updatedProject.data,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Data Updated Successfully!");
        onUpdate(data.project); // Ensure the updated project is reflected in UI
        setModalOpen(false);
      } else {
        toast.error("Failed to update project: " + data.message);
      }
    } catch (error) {
      toast.error("Error updating project: " + error.message);
      console.error("Error updating project:", error);
    } finally {
      setUpdating(false); // Reset updating state
    }
  };

  const formatDate = (date) => {
    const [year, day, month] = date.split("-");
    const validDate = `${year}-${month}-${day}`;
    const formattedDate = new Date(validDate);

    return formattedDate.toString() === "Invalid Date"
      ? "Invalid Date"
      : formattedDate.toLocaleDateString();
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedDescription =
    project.description && project.description.length > 80
      ? project.description.slice(0, 80) + "..."
      : project.description;

  const calculateTotalProgress = () => {
    if (!project?.data || project.data.length === 0) return 0;

    const total = project.data.reduce((sum, dp) => sum + dp.value, 0);
    return Math.min(total, 100);
  };

  return (
    <div className="relative max-w-2xl p-4 mx-auto my-5 mb-1 bg-white border rounded-md shadow-lg">
      <div className="relative flex items-center justify-center mb-5">
        <h3 className="mb-2 text-lg font-semibold text-center">
          {project.name}
        </h3>
        {userRole === "corporator" && (
          <button
            onClick={() => handleEditClick(project)}
            className="absolute right-0 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
          >
            Edit Project
          </button>
        )}
      </div>

      <p className="mb-4 text-[1.1rem] font-semibold text-center text-gray-700">
        Current Progress: {calculateTotalProgress()}%
      </p>

      <p className="absolute text-sm font-medium text-center text-gray-600 right-3 top-16">
        Start Date: {formatDate(project.startDate)}
      </p>

      <ResponsiveContainer width="100%" height={300}>
        {project.visualizationType === "bar" ? (
          <BarChart data={project.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        ) : (
          <LineChart data={project.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        )}
      </ResponsiveContainer>

      <p className="mt-4 text-sm font-medium text-center text-gray-600">
        {isExpanded ? project.description : truncatedDescription}
        <button
          onClick={toggleDescription}
          className="ml-2 text-blue-500 hover:underline"
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      </p>

      {isModalOpen && currentProject && (
        <EditGraphModal
          isOpen={isModalOpen}
          project={currentProject}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveChanges}
          updating={updating} // Pass updating state to modal
        />
      )}
    </div>
  );
};

export default DevelopmentChart;
