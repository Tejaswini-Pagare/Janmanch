import React, { useState } from "react";
import Navbar from "../components/Navigation/Navbar";
import DevelopmentChart from "../components/Charts/DevelopmentChart";
import Footer from "../components/Navigation/Footer";
import WelcomeCard from "../components/cards/Welcome";
import GraphInputModal from "../components/Modal/CorporatorInModal";

const HomePage = () => {
  const [developmentType, setDevelopmentType] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [graphs, setGraphs] = useState([
    // Sample graph data for testing
    {
      projectId: "1",
      chartType: "Bar",
      developmentCategory: "Education",
    },
  ]);

  const handleDevelopmentTypeChange = (event) => {
    setDevelopmentType(event.target.value);
  };

  const handleAddGraph = (data) => {
    setGraphs([...graphs, data]);
    console.log("Graph added:", data);
  };

  const handleDeleteGraph = (index) => {
    const updatedGraphs = graphs.filter((_, i) => i !== index);
    setGraphs(updatedGraphs);
  };

  return (
    <div>
      {/* <Navbar /> */}

      <div className="container mx-auto px-10 pt-2 pb-8">
        {/* Hero Section */}
        <div className="relative bg-gray-100 py-1 rounded-lg shadow-lg overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 opacity-50 blur-2xl rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-pink-400 to-purple-600 opacity-50 blur-2xl rounded-full"></div>
          </div>
          <h2 className="relative text-5xl font-extrabold text-center mt-2 mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
            Welcome to Janmanch!!
          </h2>
        </div>

        {/* Welcome Card Section */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center pt-5">
          <div className="w-full">
            <WelcomeCard />
          </div>
        </div>

        {/* Progress Section */}
        <div className="flex justify-center items-center w-full mt-8">
          <div className="relative cursor-pointer">
            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-sky-600 rounded-lg"></span>
            <button className="absolute py-1 z-10 px-3 -left-10 -top-4 -rotate-[10deg] border border-black bg-sky-600 text-white font-bold">
              Your Corporator's Progress!
            </button>
            <div className="relative p-8 bg-white border-2 border-sky-600 rounded-lg transition duration-500 hover:scale-105 max-w-4xl mx-auto">
              <div className="flex items-center">
                <h3 className="my-2 text-lg font-bold text-gray-800 mx-auto text-center">
                  Explore the progress and milestones achieved by your dedicated Corporator over time!
                </h3>
              </div>
              <p className="text-gray-600 text-center mb-4">
                Select a development type to view detailed updates.
              </p>
              <div className="flex justify-center">
                <label htmlFor="development" className="mr-2 text-gray-800">
                  Development Type:
                </label>
                <select
                  id="development"
                  value={developmentType}
                  onChange={handleDevelopmentTypeChange}
                  className="border p-2 rounded-md"
                  aria-label="Select development type"
                >
                  <option value="all">All</option>
                  <option value="1">Education</option>
                  <option value="2">Healthcare</option>
                  <option value="3">Infrastructure</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Development Chart Section */}
        <div className="mt-8">
        {graphs.length === 0 ? (
            <div className="flex justify-center items-center">
            <div className="bg-gradient-to-br from-indigo-600 to-pink-600 p-1 rounded-md hover:scale-105 transition-transform duration-300 ease-in-out">
                <div className="bg-white text-gray-500 text-lg font-semibold border border-gray-300 rounded-md p-4">
                No data available to show.
                </div>
            </div>
            </div>
        ) : developmentType === "all" ? (
            graphs.map((graph, index) => (
            <DevelopmentChart key={index} projectId={graph.projectId} />
            ))
        ) : (
            (() => {
            const filteredGraphs = graphs.filter(
                (graph) => graph.projectId === developmentType
            );
            return filteredGraphs.length === 0 ? (
                <div className="flex justify-center items-center">
                <div className="bg-gradient-to-br from-indigo-600 to-pink-600 p-1 rounded-md hover:scale-105 transition-transform duration-300 ease-in-out">
                    <div className="bg-white text-gray-500 text-lg font-semibold border border-gray-300 rounded-md p-4">
                    No data available for the selected development type.
                    </div>
                </div>
                </div>
            ) : (
                filteredGraphs.map((graph, index) => (
                <DevelopmentChart key={index} projectId={graph.projectId} />
                ))
            );
            })()
        )}
        </div>
      </div>

      {/* Add and Delete Graph Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Add Graph Data
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
        >
          Delete Graph Data
        </button>
      </div>

      <Footer />

      {/* Graph Input Modal */}
      <GraphInputModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddGraph}
      />

      {/* Delete Graph Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Delete Graph</h2>
            {graphs.length === 0 ? (
              <p>No graphs available to delete.</p>
            ) : (
              <ul className="space-y-4">
                {graphs.map((graph, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">
                        Chart Type: {graph.chartType}
                      </p>
                      <p>Category: {graph.developmentCategory}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteGraph(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
