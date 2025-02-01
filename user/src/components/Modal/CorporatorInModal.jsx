import React, { useState, useEffect } from "react";

const GraphInputModal = ({ isOpen, onClose, onSubmit, graphs, onDeleteGraph }) => {
  const [chartType, setChartType] = useState("");
  const [dataPoints, setDataPoints] = useState([{ label: "", value: "" }]);
  const [developmentCategory, setDevelopmentCategory] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Clear form data when the modal is opened
      setChartType("");
      setDataPoints([{ label: "", value: "" }]);
      setDevelopmentCategory("");
    }
  }, [isOpen]);

  const handleDataPointChange = (index, field, value) => {
    const updatedDataPoints = [...dataPoints];
    updatedDataPoints[index][field] = value;
    setDataPoints(updatedDataPoints);
  };

  const addDataPoint = () => {
    setDataPoints([...dataPoints, { label: "", value: "" }]);
  };

  const removeDataPoint = (index) => {
    const updatedDataPoints = dataPoints.filter((_, i) => i !== index);
    setDataPoints(updatedDataPoints);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (chartType && developmentCategory && dataPoints.every(dp => dp.label && dp.value)) {
      onSubmit({ chartType, developmentCategory, dataPoints });
      onClose();
    } else {
      alert("Please fill out all fields.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Add Graph Data</h2>
        <form onSubmit={handleSubmit}>
          {/* Chart Type Input */}
          <div className="mb-4">
            <label htmlFor="chartType" className="block text-sm font-medium text-gray-700">
              Chart Type
            </label>
            <select
              id="chartType"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="">Select Chart Type</option>
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
            </select>
          </div>

          {/* Development Category Input */}
          <div className="mb-4">
            <label htmlFor="developmentCategory" className="block text-sm font-medium text-gray-700">
              Development Category
            </label>
            <select
              id="developmentCategory"
              value={developmentCategory}
              onChange={(e) => setDevelopmentCategory(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="">Select Category</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Environment">Environment</option>
            </select>
          </div>

          {/* Data Points Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Data Points
            </label>
            {dataPoints.map((dataPoint, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Label"
                  value={dataPoint.label}
                  onChange={(e) => handleDataPointChange(index, "label", e.target.value)}
                  className="w-1/2 border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Value"
                  value={dataPoint.value}
                  onChange={(e) => handleDataPointChange(index, "value", e.target.value)}
                  className="w-1/2 border border-gray-300 p-2 rounded-md"
                />
                {dataPoints.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDataPoint(index)}
                    className="text-red-500 font-bold"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addDataPoint}
              className="text-blue-500 font-bold mt-2"
            >
              + Add Data Point
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
