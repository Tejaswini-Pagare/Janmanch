import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GrievanceForm = () => {
  const [formData, setFormData] = useState({
    submissionType: "",
    category: "",
    description: "",
    file: null,
    userid: "user_" + localStorage.getItem("userId"),
    location: { latitude: null, longitude: null },
  });

  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    setFormData((prevData) => ({
      ...prevData,
      userid: "user_" + userIdFromStorage,
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedFormats.includes(file.type)) {
        toast.error("Invalid file format. Only JPG, JPEG, and PNG are allowed.");
        return;
      }

      if (file.size > maxSize) {
        toast.error("File size exceeds 5MB limit.");
        return;
      }

      setFormData({ ...formData, file });
    }
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
          toast.success("Location fetched successfully!");
        },
        () => {
          toast.error("Error retrieving location. Please allow location access.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.submissionType || !formData.category || !formData.description) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("submissionType", formData.submissionType);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("userid", formData.userid);
    formDataToSend.append("location", JSON.stringify(formData.location));

    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    try {
      await axios.post("/api/grievance/upload", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Your grievance has been submitted successfully!");

      // Reset form after successful submission
      setFormData({
        submissionType: "",
        category: "",
        description: "",
        file: null,
        userid: "user_" + localStorage.getItem("userId"),
        location: { latitude: null, longitude: null },
      });

      setMapVisible(false);
    } catch (error) {
      toast.error("Error submitting grievance. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-center font-sans">
      <h1 className="text-3xl font-bold font-serif text-gray-800 mb-6 border-b-2 py-3 shadow-lg">Grievance Form</h1>

      <form className="bg-gray-100 p-6 rounded-lg shadow-lg space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
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

        <label className="block font-semibold text-left">Upload File (JPG, JPEG, PNG - Max 5MB)</label>
        <input type="file" name="file" onChange={handleFileChange} className="w-full p-2 border" />

        <button type="button" onClick={handleLocation} className="w-full bg-teal-400 text-white p-3 rounded">
          Get Location
        </button>

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

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default GrievanceForm;
