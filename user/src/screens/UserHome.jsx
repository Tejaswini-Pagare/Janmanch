import React, { useEffect, useState } from "react";
import DevelopmentChart from "../components/Charts/DevelopmentChart";
import WelcomeCard from "../components/cards/Welcome";

const HomePage = () => {
  const [developmentType, setDevelopmentType] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const token = getCookie("token");
  console.log("Token from cookies:", token);

  const fetchProjects = async (category) => {
    setLoading(true);
    console.log("Fetching projects for category:", category);

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/projects?category=${category}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", 
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        throw new Error(
          `Failed to fetch projects: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Received data:", data);
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects(developmentType); // Fetch projects for the selected category
  }, [developmentType]);

  return (
    <div>
      <div className="px-10 pt-2 pb-8 mx-auto">
        {/* Hero Section */}
        <div className="relative py-1 overflow-hidden bg-gray-100 rounded-lg shadow-lg">
          <h2 className="relative mt-2 mb-4 text-5xl font-extrabold text-center text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text animate-pulse">
            Welcome to Janmanch!!
          </h2>
        </div>

        {/* Welcome Section */}
        <div className="flex flex-col items-center justify-center gap-8 pt-5 md:flex-row">
          <WelcomeCard />
        </div>

        {/* Development Filter */}
        <div className="flex items-center justify-center w-full mt-8">
          <div className="relative w-full cursor-pointer">
            <div className="relative w-full transition duration-1000 bg-blue-100 rounded-lg p-9 hover:scale-105">
              <h3 className="mx-auto my-2 text-xl font-bold text-center text-gray-800">
                Explore the progress of your ward achieved by your Corporator!
              </h3>
              <p className="mb-4 text-center text-gray-600">
                Select a development type to view detailed updates.
              </p>
              <div className="flex justify-center">
                <label htmlFor="development" className="mr-2 text-gray-800">
                  Development Type:
                </label>
                <select
                  id="development"
                  value={developmentType}
                  onChange={(e) => setDevelopmentType(e.target.value)}
                  className="py-2 px-3 bg-blue-50 rounded-md text-[0.9rem]"
                  aria-label="Select development type"
                >
                  <option value="all">All</option>
                  <option value="education">Education</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="infrastructure">Infrastructure</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Development Chart Section */}
        <div className="mt-8">
          {loading ? (
            <p className="text-lg font-semibold text-center">
              Loading projects...
            </p>
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <DevelopmentChart key={project._id} project={project} />
            ))
          ) : (
            <p className="text-lg font-semibold text-center">
              No projects available for this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;