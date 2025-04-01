import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaBalanceScale, FaClock, FaMoneyBillWave } from "react-icons/fa";
import corporatorImage from "../images/Shaleja_More.jpg";

const CorporatorDetails = () => {
    const [developmentType, setDevelopmentType] = useState("all");
    const [grievances, setGrievances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([]);
    const [grievanceCounts, setGrievanceCounts] = useState({
        solved: 0,
        solving: 0,
        received: 0,
    });
    const [projectCounts, setProjectCounts] = useState({
        developed: 0,
        developing: 0,
    });

    useEffect(() => {
        fetchGrievances();
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        console.log("Fetching projects for category:", developmentType);
        setLoading(true);
        try {
            const response = await axios.get(`https://janmanch-cep.onrender.com/api/corps/projects?category=${developmentType}`);
            if (response.status !== 200) throw new Error("Failed to fetch projects");
            setProjects(response.data.projects || []);
            calculateProjectCounts(response.data.projects || []);
            console.log("Received data:", response.data);
            localStorage.setItem("projectsfromcor", JSON.stringify(response.data));
        } catch (error) {
            setError(error.message);
            console.log("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateProjectCounts = (projects) => {
        let developedCount = 0;
        let developingCount = 0;

        projects.forEach(project => {
            const startDate = new Date(project.startDate);
            const currentDate = new Date();

            // Check if the project is developed
            if (startDate < currentDate && project.data.length > 0) {
                developedCount++;
            } else {
                developingCount++;
            }
        });

        setProjectCounts({
            developed: developedCount,
            developing: developingCount,
        });
    };

    const fetchGrievances = async () => {
        try {
            const response = await axios.get("https://janmanch-cep.onrender.com/api/grievance/get_grievance");
            setGrievances(response.data);
            localStorage.setItem("grievancesfromcor", JSON.stringify(response.data));
            setGrievanceCounts({
                solved: response.data.filter(grievance => grievance.status === "Completed").length,
                solving: response.data.filter(grievance => grievance.status === "Pending").length,
                received: response.data.length,
            });
            setLoading(false);
        } catch (error) {
            toast.error("Failed to fetch grievances.");
            setLoading(false);
        }
    };

    const corporatorInfo = {
        name: "Shailaja More",
        party: "Bharatiya Janata Party (BJP)",
        tenure: "2021-2026",
        budget: "₹10,00,000",
        income: "₹5,00,000",
        image: corporatorImage,
    };

    return (
        <div className="p-4 sm:p-6 font-sans max-w-6xl mx-auto">
            <ToastContainer />
            <div className="border rounded-lg p-6 bg-orange-400 shadow-lg mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white border-b-2 border-slate-200 transition-transform shadow-lg rounded-lg pb-3">
                    Corporator Details
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-11">
                    <img
                        src={corporatorInfo.image}
                        alt="Corporator"
                        className="w-40 h-40 sm:w-60 sm:h-60 rounded-full shadow-lg hover:shadow-teal-500 hover:scale-105 transition-transform"
                    />
                    <ul className="space-y-3 text-center md:text-left text-white">
                        <li className="flex items-center">
                            <FaUser className="mr-2 sm:mr-3 text-lg sm:text-xl" />
                            <span className="text-base sm:text-lg font-bold">Name: {corporatorInfo.name}</span>
                        </li>
                        <hr />
                        <li className="flex items-center">
                            <FaBalanceScale className="mr-2 sm:mr-3 text-lg sm:text-xl" />
                            <span className="text-base sm:text-lg font-bold">Party: {corporatorInfo.party}</span>
                        </li>
                        <hr />
                        <li className="flex items-center">
                            <FaClock className="mr-2 sm:mr-3 text-lg sm:text-xl" />
                            <span className="text-base sm:text-lg font-bold">Tenure: {corporatorInfo.tenure}</span>
                        </li>
                        <hr />
                        <li className="flex items-center">
                            <FaMoneyBillWave className="mr-2 sm:mr-3 text-lg sm:text-xl" />
                            <span className="text-base sm:text-lg font-bold">Budget: {corporatorInfo.budget}</span>
                        </li>
                        <hr />
                        <li className="flex items-center">
                            <FaMoneyBillWave className="mr-2 sm:mr-3 text-lg sm:text-xl" />
                            <span className="text-base sm:text-lg font-bold">Income: {corporatorInfo.income}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-2 border-slate-700 rounded-lg p-6 sm:p-7 bg-gray-300 bg-opacity-50 shadow-lg w-full md:w-11/12 mx-auto flex flex-wrap gap-4 justify-center">
                <div className="bg-green-400 items-center justify-center p-4 rounded-lg shadow-lg w-5/12 sm:w-3/12 text-center">
                    <h1 className="text-3xl sm:text-5xl font-bold font-mono">{grievanceCounts.solved}+</h1>
                    <span className="text-lg sm:text-2xl font-semibold">Grievances Solved</span>
                </div>
                <div className="bg-blue-400 items-center justify-center p-4 rounded-lg shadow-lg w-5/12 sm:w-3/12 text-center">
                    <h1 className="text-3xl sm:text-5xl font-bold font-mono">{grievanceCounts.solving}+</h1>
                    <span className="text-lg sm:text-2xl font-semibold">Grievances Solving</span>
                </div>
                <div className="bg-lime-400 items-center justify-center p-4 rounded-lg shadow-lg w-5/12 sm:w-3/12 text-center">
                    <h1 className="text-3xl sm:text-5xl font-bold font-mono">{grievanceCounts.received}+</h1>
                    <span className="text-lg sm:text-2xl font-semibold">Grievances Received</span>
                </div>
                <div className="bg-yellow-400 items-center justify-center p-4 rounded-lg shadow-lg w-5/12 sm:w-3/12 text-center">
                    <h1 className="text-3xl sm:text-5xl font-bold font-mono">{projectCounts.developed}+</h1>
                    <span className="text-lg sm:text-2xl font-semibold">Projects Developed</span>
                </div>
                <div className="bg-red-400 items-center justify-center p-4 rounded-lg shadow-lg w-5/12 sm:w-3/12 text-center">
                    <h1 className="text-3xl sm:text-5xl font-bold font-mono">{projectCounts.developing}+</h1>
                    <span className="text-lg sm:text-2xl font-semibold">Projects Developing</span>
                </div>
            </div>
        </div>
    );
};

export default CorporatorDetails;
