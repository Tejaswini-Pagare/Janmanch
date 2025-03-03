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
                  onChange={(e) => {
                    setDevelopmentType(e.target.value);
                  }}
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

        {/* Development Chart Section */}
        <div className="mt-8 w-max-full">
          {loading ? (
            <p className="text-lg font-semibold text-center">
              Loading projects...
            </p>
          ) : projects.length > 0 ? (
            <div className="grid gap-10 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
              {
            projects.map((project) => (
              <div className="">
              <DevelopmentChart key={project._id} 
              project={project} />
              </div>
            ))}
            </div>
          ) : (
            <p className="text-lg font-semibold text-center border-4 p-3 border-red-500 bg-red-600 bg-opacity-50 border-x-0">
              No projects available for this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;