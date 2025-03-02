import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GrievanceList = () => {
    const [grievances, setGrievances] = useState([]);
    const [filteredGrievances, setFilteredGrievances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGrievance, setSelectedGrievance] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetchGrievances();
    }, []);

    const fetchGrievances = async () => {
        try {
            const response = await axios.get("/api/grievance/get_grievance");
            setGrievances(response.data);
            setFilteredGrievances(response.data);
            setLoading(false);
        } catch (error) {
            toast.error("Failed to fetch grievances.");
            setLoading(false);
        }
    };

    // Handle filtering
    useEffect(() => {
        let filteredData = grievances;
        if (searchQuery) {
            filteredData = filteredData.filter((grievance) =>
                grievance.userid.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (selectedCategory) {
            filteredData = filteredData.filter((grievance) => grievance.category === selectedCategory);
        }
        setFilteredGrievances(filteredData);
    }, [searchQuery, selectedCategory, grievances]);

    // Update grievance status
    const updateStatus = async (id, status) => {
        try {
            await axios.put(`/api/grievance/update_status/${id}`, { status });
            toast.success(`Grievance marked as ${status}`);
            fetchGrievances();
        } catch (error) {
            toast.error("Failed to update status.");
        }
    };

    return (
        <div className="p-6 max-w-full mx-auto text-center font-sans h-screen">
            <h1 className="text-4xl font-bold text-white mb-6 flex items-center  justify-between my-2 bg-green-600 bg-opacity-70 border-4 rounded-xl border-green-900 p-3"><div>📌 </div> <div>Grievance Dashboard</div> <div>📌</div>  </h1>
        

            {/* Search & Filter Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="🔍 Search by User ID"
                    className="border p-2 rounded-md w-full md:w-1/5"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <select
                    className="border p-2 rounded-md w-full md:w-1/3 mt-2 md:mt-0"
                    value={selectedCategory}
                    placeholder="📂 Filter by Category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Roads">Roads</option>
                    <option value="Water">Water</option>
                    <option value="Power">Power</option>
                    <option value="Sanitation">Sanitation</option>
                </select>
            </div>

            {/* Grievance Table */}
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border border-gray-200 w-max">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Grievance ID</th>
                            <th className="py-2 px-4 border-b text-left">Submission Type</th>
                            <th className="py-2 px-4 border-b text-left">Category</th>
                            <th className="py-2 px-4 border-b text-left">User ID</th>
                            <th className="py-2 px-4 border-b text-left">Status</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">Loading...</td>
                            </tr>
                        ) : filteredGrievances.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No grievances found.</td>
                            </tr>
                        ) : (
                            filteredGrievances.map((grievance) => (
                                <tr key={grievance._id} className="hover:bg-gray-100 transition">
                                    <td className="py-2 px-4 border-b">G_{grievance._id}</td>
                                    <td className="py-2 px-4 border-b"><span className={`px-2 py-1 rounded 
                                            ${grievance.submissionType === "Grievance"
                                            ? "border-b-4 border-red-600"
                                            :"border-b-4 border-yellow-400"
                                            }`}>
                                            {grievance.submissionType}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                    <span className={`px-2 py-1 rounded 
                                            ${grievance.category === "Roads"
                                            ? "bg-slate-500 text-white"
                                            : grievance.category === "Water"
                                            ? "bg-blue-500 text-white"
                                            : grievance.category === "Power"
                                            ? "bg-blue-800 text-white"
                                            :grievance.category === "Sanitation"
                                            ?"bg-green-500 text-white"
                                            :"bg-amber-700 text-white"
                                            }`}>
                                            {grievance.category}
                                        </span>
                                    </td>
                                    <td className="p-2 px-4 border-b">{grievance.userid}</td>
                                    <td className="p-2 px-4 border-b">
                                        <span className={`px-2 py-1 rounded ${grievance.status === "Pending"
                                            ? "bg-yellow-500 text-white"
                                            : grievance.status === "Completed"
                                                ? "bg-green-500 text-white"
                                                : "bg-blue-500 text-white"
                                            }`}>
                                            {grievance.status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => setSelectedGrievance(grievance)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => updateStatus(grievance._id, "In Progress")}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                        >
                                            Assign
                                        </button>
                                        <button
                                            onClick={() => updateStatus(grievance._id, "Completed")}
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                        >
                                            Complete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
            {selectedGrievance && (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto 
            scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 scrollbar-rounded-lg">
            
            <h2 className="text-2xl font-bold font-serif mb-4">Grievance Details</h2>
            <hr />
            <br />

            <div className="flex gap-6">
                
                {/* Image Block - Fixed Height */}
                {selectedGrievance.file && (
                    <div className="w-3/5 max-h-[60vh] overflow-hidden rounded-lg shadow-md border border-gray-300">
                        <a href={`http://localhost:5000/Images/${selectedGrievance.file}`} target="_blank" rel="noopener noreferrer">
                            <img
                                src={`http://localhost:5000/Images/${selectedGrievance.file}`}
                                alt="Grievance Image"
                                className="w-full h-auto rounded-lg"
                            />
                        </a>
                    </div>
                )}

                {/* Right Section (Scrollable) */}
                <div className={`${selectedGrievance.file ? "w-2/3" : "w-full"} overflow-y-auto max-h-[60vh] pr-3 
                    scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 scrollbar-rounded-lg`}>
                    
                    <div className="text-left border-l-4 border-l-red-200 px-3 rounded-xl">
                        <div className="mb-2"><strong>Grievance Id: </strong>G_{selectedGrievance._id}</div>
                        <div className="mb-2"><strong>Category:</strong> {selectedGrievance.category}</div>
                        <div className="mb-2"><strong>Submission Type:</strong> {selectedGrievance.submissionType}</div>
                        <div className="mb-2"><strong>Status:</strong> {selectedGrievance.status}</div>
                        <div className="mb-2"><strong>User ID:</strong> {selectedGrievance.userid}</div>
                        <div className="mb-4"><strong>Description:</strong> {selectedGrievance.description}</div>
                    </div>

                    {/* Map Location */}
                    <div className="mt-4 text-left">
                        <h3 className="font-semibold mb-2">Location:</h3>
                        <iframe
                            width="100%"
                            height="300"
                            loading="lazy"
                            className="rounded-lg"
                            src={`https://www.google.com/maps?q=${selectedGrievance.latitude},${selectedGrievance.longitude}&hl=es;z=14&output=embed`}
                        ></iframe>
                    </div>
                </div>
            </div>
            
            <br />
            <hr />

            {/* Close Button */}
            <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => setSelectedGrievance(null)}
            >
                Close
            </button>
        </div>
    </div>
)}


        </div>
    );
};

export default GrievanceList;
