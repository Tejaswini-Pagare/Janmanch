import React, { useState, useEffect } from "react";
import { Textarea } from "@nextui-org/react";

const EditGraphModal = ({ isOpen, onClose, project, onSave }) => {
  const [editedProject, setEditedProject] = useState(project || {});

  useEffect(() => {
    if (project) {
      setEditedProject(project);
    }
  }, [project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addDataPoint = () => {
    setEditedProject((prevState) => ({
      ...prevState,
      data: [...(prevState.data || []), { name: "", value: 0 }], // Ensure an empty array if undefined
    }));
  };

  const removeDataPoint = (index) => {
    setEditedProject((prevState) => ({
      ...prevState,
      data: prevState.data.filter((_, i) => i !== index),
    }));
  };

  const handleDataPointChange = (index, e) => {
    const { name, value } = e.target;
    const updatedData = [...editedProject.data];
    updatedData[index][name] =
      name === "value" ? parseFloat(value) || 0 : value;
    setEditedProject((prevState) => ({
      ...prevState,
      data: updatedData,
    }));
  };

  const handleSubmit = () => {
    onSave(editedProject); // Pass updated project to parent
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Edit Graph Data</h2>
        <form>
          <div className="mb-4 ">
            <Textarea
              label="Description"
              placeholder="Enter project description"
              name="description"
              value={editedProject.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <h3 className="mb-2 font-semibold text-md">Data Points</h3>
            {editedProject?.data?.map((point, index) => (
              <div key={index} className="flex mb-2 space-x-2">
                <input
                  type="text"
                  name="name"
                  value={point.name}
                  onChange={(e) => handleDataPointChange(index, e)}
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  placeholder="Label"
                />
                <input
                  type="number"
                  name="value"
                  value={point.value}
                  onChange={(e) => handleDataPointChange(index, e)}
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  placeholder="Value"
                />
                <button
                  type="button"
                  onClick={() => removeDataPoint(index)}
                  className="px-2 py-1 text-red-500 border border-red-500 rounded-md"
                >
                  ✖
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

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-gray-500 rounded-md"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-blue-500 rounded-md"
            >
              Update Graph
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGraphModal;
