import React, { useState, useEffect } from "react";

const GraphInputModal = ({ isOpen, onClose, onSubmit }) => {
  const [projectName, setProjectName] = useState("");
  const [visualizationType, setVisualizationType] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dataPoints, setDataPoints] = useState([]);
  const [totalProgress, setTotalProgress] = useState(0);

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen]);

  const resetForm = () => {
    const today = new Date();
    const defaultStartDate = today.toISOString().split("T")[0]; // YYYY-MM-DD format
    setStartDate(defaultStartDate);
    initializeDataPoints(defaultStartDate);

    setProjectName("");
    setVisualizationType("");
    setCategory("");
    setDescription("");
    setTotalProgress(0);
  };

  const getMonthName = (monthIndex) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthIndex % 12];
  };

  const initializeDataPoints = (dateString) => {
    const startMonthIndex = new Date(dateString).getMonth();
    const newDataPoints = [];

    for (let i = 0; i < 3; i++) {
      newDataPoints.push({ name: getMonthName(startMonthIndex + i), value: 0 });
    }

    setDataPoints(newDataPoints);
  };

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    setStartDate(selectedDate);
    initializeDataPoints(selectedDate);
  };

  // const addDataPoint = () => {
  //   if (dataPoints.length >= 12) {
  //     alert("You have already added data for 12 months.");
  //     return;
  //   }
  //   const lastMonthIndex = new Date(startDate).getMonth() + dataPoints.length;
  //   setDataPoints([
  //     ...dataPoints,
  //     { name: getMonthName(lastMonthIndex), value: 0 },
  //   ]);
  // };

  const addDataPoint = () => {
    if (dataPoints.length >= 12) {
      alert("You have already added data for 12 months.");
      return;
    }

    // Get last month's index based on the last available month name
    const lastMonthName = dataPoints[dataPoints.length - 1].name;
    const lastMonthIndex = getMonthIndex(lastMonthName);

    // Get the next month correctly
    const nextMonthIndex = (lastMonthIndex + 1) % 12;
    const nextMonthName = getMonthName(nextMonthIndex);

    // Ensure unique month names
    if (dataPoints.some((dp) => dp.name === nextMonthName)) {
      alert("Cannot add duplicate months. Delete properly first.");
      return;
    }

    setDataPoints([...dataPoints, { name: nextMonthName, value: 0 }]);
  };

  // Helper function to get index from month name
  const getMonthIndex = (monthName) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.indexOf(monthName);
  };

  const removeDataPoint = (index) => {
    if (index === 0) {
      alert("You cannot delete the first month of the project.");
      return;
    }
    const updatedDataPoints = dataPoints.filter((_, i) => i !== index);
    setDataPoints(updatedDataPoints);
    updateTotalProgress(updatedDataPoints);
  };

  const handleDataPointChange = (index, value) => {
    const updatedDataPoints = [...dataPoints];
    updatedDataPoints[index].value = Math.max(0, Math.min(100, Number(value)));

    const totalValue = updatedDataPoints.reduce((sum, dp) => sum + dp.value, 0);
    if (totalValue > 100) {
      alert("Total values cannot exceed 100.");
      return;
    }

    setDataPoints(updatedDataPoints);
    updateTotalProgress(updatedDataPoints);
  };

  const updateTotalProgress = (data) => {
    const total = data.reduce((sum, dp) => sum + dp.value, 0);
    setTotalProgress(total);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !projectName ||
      !visualizationType ||
      !category ||
      !description ||
      !startDate ||
      dataPoints.length === 0
    ) {
      alert("Please fill out all fields.");
      return;
    }

    if (dataPoints.some((dp) => !dp.name || dp.value === "")) {
      alert("Each data point must have a name and a value.");
      return;
    }

    const newData = {
      name: projectName,
      visualizationType,
      category,
      description,
      startDate,
      data: dataPoints.map((dp) => ({
        name: dp.name,
        value: dp.value,
      })),
    };

    onSubmit(newData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-lg font-bold">Add New Project</h2>
        <form onSubmit={handleSubmit}>
          {/* Project Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Visualization Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Visualization Type
            </label>
            <select
              value={visualizationType}
              onChange={(e) => setVisualizationType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Type</option>
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
            </select>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Category</option>
              <option value="Education">Education</option>
              <option value="Roads">Roads</option>
              <option value="Water">Water</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Infrastructure">Infrastructure</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Data Points */}
          <div className="mb-4 ">
            <label className="block text-sm font-medium text-gray-700">
              Data Points
            </label>
            {dataPoints.map((dp, index) => (
              <div
                key={index}
                className="flex items-center mb-2 space-x-5 max-full"
              >
                <input
                  type="text"
                  value={dp.name}
                  className="w-1/3 p-2 border border-gray-300 rounded-md"
                  readOnly
                />
                <input
                  type="number"
                  value={dp.value}
                  onChange={(e) => handleDataPointChange(index, e.target.value)}
                  className="w-2/4 p-2 border border-gray-300 rounded-md"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeDataPoint(index)}
                  className="text-red-500 border-red-400"
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addDataPoint}
              className="mt-2 font-bold text-blue-500"
            >
              + Add Data Point
            </button>
          </div>

          {/* 🔥 Live Project Progress */}
          <p
            className={`text-sm font-semibold mt-2 ${
              totalProgress > 100 ? "text-red-500" : "text-gray-700"
            }`}
          >
            Total Progress: {totalProgress}%
          </p>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-gray-500 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GraphInputModal;
