import React, { useState, useEffect } from "react";
import DevelopmentChart from "../components/Charts/DevelopmentChart";
import WelcomeCard from "../components/cards/Welcome";
import GraphInputModal from "../components/Modal/CorporatorInModal";

const HomePage = () => {
  const [developmentType, setDevelopmentType] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [graphs, setGraphs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userRole = localStorage.getItem("userRole");

  const fetchProjects = async () => {
    console.log("Fetching projects for category:", developmentType);
    setLoading(true);
    try {
      const response = await fetch(
        `/api/corps/projects?category=${developmentType}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch projects");

      const data = await response.json();

      if (Array.isArray(data.projects)) {
        const sortedProjects = data.projects
          .filter((p) => p.startDate)
          .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setGraphs(sortedProjects);
      } else {
        setError("Invalid data format");
        setGraphs([]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [developmentType]);

  const handleDevelopmentTypeChange = (event) => {
    setDevelopmentType(event.target.value);
  };

  const handleAddGraph = async (data) => {
    try {
      const response = await fetch("/api/corps/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if(response.ok) toast.success("Project Added Successfully!");
      if (!response.ok) throw new Error("Failed to add project");

      await response.json();
      fetchProjects(); // Refresh list
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleDeleteGraph = async (projectId) => {
    try {
      const response = await fetch(
        `/api/corps/delete/${projectId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete project");

      fetchProjects(); // Refresh list
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleUpdateProject = (updatedProject) => {
    setGraphs((prevGraphs) =>
      prevGraphs.map((graph) =>
        graph._id === updatedProject._id ? updatedProject : graph
      )
    );
  };

  return (
    <div>
      <div className="container px-10 pt-2 pb-8 mx-auto">
        {/* Hero Section */}
        <div className="relative py-1 overflow-hidden bg-gray-100 rounded-lg shadow-lg">
          <h2 className="relative mt-2 mb-4 text-5xl font-extrabold text-center text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text animate-pulse">
            Welcome to Janmanch!!
          </h2>
        </div>

        {/* Welcome Card Section */}
        <div className="flex flex-col items-center justify-center gap-8 pt-5 md:flex-row">
          <div className="w-full">
            <WelcomeCard />
          </div>
        </div>

        {/* Progress Section */}
        <div className="flex justify-center items-center w-full">
          <div className="relative cursor-pointer ">
            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-orange-500 rounded-lg"></span>
            <div className="relative p-6 bg-white border-2 border-orange-500 rounded-lg hover:scale-105 transition duration-500">

              <button className="absolute py-1 px-3 -left-14 top-0 z-1 -rotate-[20deg] border-black bg-orange-600 text-white font-bold">
                Corporator's Progress!
              </button>

              <div className="flex items-center justify-center">
                <h3 className="my-2 text-lg font-bold text-gray-800 text-center">
                  Explore the progress and milestones achieved by your Corporator!
                </h3>
              </div>

              <p className="text-gray-600 text-center">
                Select a development type:
              </p>

              <div className="flex justify-center mt-4">
                <select
                  value={developmentType}
                  onChange={handleDevelopmentTypeChange}
                  className="p-2 border rounded-md bg-slate-700 text-white shadow-2xl hover:bg-slate-600 shadow-slate-500"
                >
                  <option value="all">All</option>
                  <option value="Education">Education</option>
                  <option value="Roads">Roads</option>
                  <option value="Water">Water</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 max-full">
          {loading ? (
            <p className="text-lg font-semibold text-center">
              Loading projects...
            </p>
          ) : graphs.length > 0 ? (
            // graphs.map((graph) => (
            //   <DevelopmentChart
            //     key={graph._id}
            //     project={graph}
            //     onUpdate={handleUpdateProject}
            //   />
            // ))
            <div className="grid gap-10 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
              {graphs.map((graph, index) => (
                <div key={index} className="">
                  <DevelopmentChart
                    project={graph}
                    onUpdate={handleUpdateProject}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg font-semibold text-center border-4 p-3 border-red-500 bg-red-600 bg-opacity-50 border-x-0">
              No projects available for this category.
            </p>
            </div>
          )}
        </div>
      </div>

      {userRole === "corporator" && (
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Add Project
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Delete Project
          </button>
        </div>
      )}

      {/* Add Project Modal */}
      <GraphInputModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddGraph}
      />

      {/* Delete Project Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Delete a Project</h2>
            {graphs.length === 0 ? (
              <p>No projects available.</p>
            ) : (
              <ul>
                {graphs.map((graph) => (
                  <li
                    key={graph._id}
                    className="flex items-center justify-between"
                  >
                    <span>{graph.name}</span>
                    <button
                      onClick={() => handleDeleteGraph(graph._id)}
                      className="px-2 py-1 my-2 text-white bg-red-500 rounded-md"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 mt-4 text-white bg-gray-500 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
