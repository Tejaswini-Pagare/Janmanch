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
  const [mapVisible, setMapVisible] = useState(false);

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
          setMapVisible(true);
          setErrorMessage("");
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

    setTimeout(() => setConfirmationMessage(""), 5000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-center font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Grievance Form</h1>
      <form className="bg-gray-100 p-6 rounded-lg shadow-lg space-y-4" onSubmit={handleSubmit}>
        <label className="block font-semibold text-left">Submission Type</label>
        <select name="submissionType" className="w-full p-2 border" value={formData.submissionType} onChange={handleInputChange} required>
          <option value="">-- Select Type --</option>
          <option value="Grievance">Grievance</option>
          <option value="Suggestion">Suggestion</option>
        </select>

        <label className="block font-semibold text-left">Category</label>
        <select name="category" className="w-full p-2 border" value={formData.category} onChange={handleInputChange} required>
          <option value="">-- Select Category --</option>
          <option value="Roads">Roads</option>
          <option value="Water">Water</option>
          <option value="Power">Power</option>
          <option value="Sanitation">Sanitation</option>
        </select>

        <label className="block font-semibold text-left">Description</label>
        <textarea name="description" className="w-full p-2 border" rows="5" placeholder="Describe your issue or suggestion..." value={formData.description} onChange={handleInputChange} required></textarea>

        <label className="block font-semibold text-left">Upload Image (optional)</label>
        <input type="file" name="image" className="w-full p-2 border" accept="image/*" onChange={handleImageChange} />

        <button type="button" onClick={handleLocation} className="w-full bg-teal-400 text-white p-3 rounded">Get Location</button>
        
        {mapVisible && formData.location.latitude && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Your Location</h3>
            <iframe
              title="Google Map"
              className="w-full h-64 border rounded"
              src={`https://www.google.com/maps?q=${formData.location.latitude},${formData.location.longitude}&hl=es;z=14&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
        )}

        <button type="submit" className="w-full bg-teal-500 text-white p-3 rounded">Submit</button>
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
        </div>
      )}
    </div>
  );
};

export default GrievanceForm;
