import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UserHistory() {
    const [grievances, setGrievances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGrievance, setSelectedGrievance] = useState(null);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchGrievances();
    }, []);

    const fetchGrievances = async () => {
        try {
            const response = await axios.get(`/api/grievance/get_grievance/${userId}`);
            setGrievances(response.data);
            localStorage.setItem("grievances", JSON.stringify(response.data));
        } catch (error) {
            toast.error("Failed to fetch grievances.");
        } finally {
            setLoading(false);
        }
    };

    const openModal = (grievance) => {
        setSelectedGrievance(grievance);
    };

    const closeModal = () => {
        setSelectedGrievance(null);
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-700 border border-yellow-500 px-2 py-1 rounded";
            case "in progress":
                return "bg-blue-100 text-blue-700 border border-blue-500 px-2 py-1 rounded";
            case "resolved":
                return "bg-green-100 text-green-700 border border-green-500 px-2 py-1 rounded";
            case "rejected":
                return "bg-red-100 text-red-700 border border-red-500 px-2 py-1 rounded";
            default:
                return "bg-gray-100 text-gray-700 border border-gray-500 px-2 py-1 rounded";
        }
    };
    

    return (
        <>  
        <h2 className='text-2xl font-bold text-gray-800 mb-4 mt-3'>User Grievance History</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            {/* <th className="py-2 px-4 border-b">User ID</th> */}
                            <th className="py-2 px-4 border-b">Submission Type</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Grievance ID</th>
                            {/* <th className="py-2 px-4 border-b">Description</th> */}
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center py-4">Loading...</td>
                            </tr>
                        ) : grievances.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-4">No grievances found.</td>
                            </tr>
                        ) : (
                            grievances.map((grievance) => (
                                <tr key={grievance._id} className="hover:bg-gray-100 transition">
                                    {/* <td className="py-2 px-4 border-b">{grievance.userid}</td> */}
                                    <td className="py-2 px-4 border-b">{grievance.submissionType}</td>
                                    <td className="py-2 px-4 border-b">{grievance.category}</td>
                                    <td className="py-2 px-4 border-b">
    <span className={getStatusClass(grievance.status)}>
        {grievance.status}
    </span>
</td>
                                    <td className="py-2 px-4 border-b">G_{grievance._id}</td>
                                    {/* <td className="py-2 px-4 border-b">{grievance.description}</td> */}
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => openModal(grievance)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {selectedGrievance && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold font-serif mb-4">Grievance Details</h2>
                        <hr />
                        <br />
                        <div className="flex gap-6">
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
                            <div className={`${selectedGrievance.file ? "w-2/3" : "w-full"} overflow-y-auto max-h-[60vh] pr-3`}>
                                <div className="text-left border-l-4 border-l-red-200 px-3 rounded-xl">
                                    <div className="mb-2"><strong>Grievance Id: </strong>G_{selectedGrievance._id}</div>
                                    <div className="mb-2"><strong>Category:</strong> {selectedGrievance.category}</div>
                                    <div className="mb-2"><strong>Submission Type:</strong> {selectedGrievance.submissionType}</div>
                                    <div className="mb-2"><strong>Status:</strong> {selectedGrievance.status}</div>
                                    <div className="mb-2"><strong>User ID:</strong> {selectedGrievance.userid}</div>
                                    <div className="mb-4"><strong>Description:</strong> {selectedGrievance.description}</div>
                                </div>
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
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserHistory;
