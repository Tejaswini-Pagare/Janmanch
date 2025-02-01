import React, { useState } from "react";
import Navbar from "../components/Navigation/Navbar";

const GrievanceForm = () => {
  const [formData, setFormData] = useState({
    submissionType: "",
    category: "",
    description: "",
    image: null,
    location: { latitude: null, longitude: null },
  });

  const [lastSubmission, setLastSubmission] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          }));
          setErrorMessage("");  // Clear any previous error
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setErrorMessage("Permission to access location was denied.");
              break;
            case error.POSITION_UNAVAILABLE:
              setErrorMessage("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setErrorMessage("The request to get your location timed out.");
              break;
            default:
              setErrorMessage("An unknown error occurred while retrieving location.");
          }
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLastSubmission({
      ...formData,
      image: formData.image?.name || "No image uploaded",
      location: `${formData.location.latitude}, ${formData.location.longitude}`,
    });
    setConfirmationMessage("Your submission has been received successfully!");
    setErrorMessage("");

    setFormData({ submissionType: "", category: "", description: "", image: null, location: { latitude: null, longitude: null } });

    setTimeout(() => setConfirmationMessage(""), 5000);
  };

  return (
    <div>
    <div className="p-6 max-w-4xl mx-auto text-center font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Grievance Form</h1>
      <form className="bg-gray-100 p-6 rounded-lg shadow-lg space-y-4" onSubmit={handleSubmit}>
        <label className="block font-semibold text-left" htmlFor="submissionType">
          Submission Type
        </label>
        <select
          name="submissionType"
          id="submissionType"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          value={formData.submissionType}
          onChange={handleInputChange}
          required
        >
          <option value="">-- Select Type --</option>
          <option value="Grievance">Grievance</option>
          <option value="Suggestion">Suggestion</option>
        </select>

        <label className="block font-semibold text-left" htmlFor="category">
          Category
        </label>
        <select
          name="category"
          id="category"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">-- Select Category --</option>
          <option value="Roads">Roads</option>
          <option value="Water">Water</option>
          <option value="Power">Power</option>
          <option value="Sanitation">Sanitation</option>
        </select>

        <label className="block font-semibold text-left" htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          rows="5"
          placeholder="Describe your issue or suggestion..."
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>

        <label className="block font-semibold text-left" htmlFor="image">
          Upload Image (optional)
        </label>
        <input
          type="file"
          name="image"
          id="image"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button
          type="button"
          onClick={handleLocation}
          className="w-full bg-teal-400 hover:bg-teal-600 text-white p-3 rounded transition-all mb-4"
        >
          Get Location
        </button>

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-700 text-white p-3 rounded hover:bg-teal-600 transition-all"
        >
          Submit
        </button>
      </form>

      {errorMessage && <p className="text-red-600 font-semibold mt-4">{errorMessage}</p>}
      {confirmationMessage && <p className="text-green-600 font-semibold mt-4">{confirmationMessage}</p>}

      {lastSubmission && (
        <div className="mt-8 p-4 bg-green-100 rounded shadow">
          <h3 className="text-xl font-bold">Last Submission</h3>
          <p><strong>Type:</strong> {lastSubmission.submissionType}</p>
          <p><strong>Category:</strong> {lastSubmission.category}</p>
          <p><strong>Description:</strong> {lastSubmission.description}</p>
          <p><strong>Image:</strong> {lastSubmission.image}</p>
          <p><strong>Location:</strong> {lastSubmission.location}</p>
          <p className="text-gray-500 italic">User details are hidden for privacy.</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default GrievanceForm;
