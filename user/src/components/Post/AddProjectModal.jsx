import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Select,
    Textarea,
  } from "@nextui-org/react";
  import { useState } from "react";
  
  export default function AddProjectModal({ onAddProject }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formData, setFormData] = useState({
      name: "",
      category: "",
      startDate: "",
      description: "",
      visualizationType: "",
      data: "",
    });
  
    // Handle input change
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    // Handle form submission
    const handleSubmit = () => {
      onAddProject(formData); // Pass data to parent component
      setFormData({
        name: "",
        category: "",
        startDate: "",
        description: "",
        visualizationType: "",
        data: "",
      });
      onOpenChange(false); // Close modal
    };
  
    return (
      <>
        <Button color="primary" onPress={onOpen}>
          Add Project
        </Button>
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add New Project
                </ModalHeader>
                <ModalBody>
                  {/* Project Name */}
                  <Input
                    label="Project Name"
                    placeholder="Enter project name"
                    variant="bordered"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
  
                  {/* Project Category */}
                  <Select
                    label="Category"
                    placeholder="Select category"
                    name="category"
                    onChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <Select.Option value="education">Education</Select.Option>
                    <Select.Option value="roads">Roads</Select.Option>
                    <Select.Option value="water">Water</Select.Option>
                    <Select.Option value="health">Health</Select.Option>
                    <Select.Option value="infrastructure">
                      Infrastructure
                    </Select.Option>
                  </Select>
  
                  {/* Start Date */}
                  <Input
                    label="Start Date"
                    type="date"
                    variant="bordered"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
  
                  {/* Project Description */}
                  <Textarea
                    label="Description"
                    placeholder="Enter project description"
                    variant="bordered"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
  
                  {/* Visualization Type */}
                  <Select
                    label="Visualization Type"
                    placeholder="Select visualization"
                    name="visualizationType"
                    onChange={(value) =>
                      setFormData({ ...formData, visualizationType: value })
                    }
                  >
                    <Select.Option value="line">Line Chart</Select.Option>
                    <Select.Option value="bar">Bar Chart</Select.Option>
                    <Select.Option value="area">Area Chart</Select.Option>
                    <Select.Option value="pie">Pie Chart</Select.Option>
                  </Select>
  
                  {/* Visualization Data */}
                  <Textarea
                    label="Visualization Data (JSON)"
                    placeholder='e.g., [{"name": "Q1", "value": 50}]'
                    variant="bordered"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={handleSubmit}>
                    Add Project
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  