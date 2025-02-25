import { Project } from "../models/projectSchema.js";

// Get projects by category (common for users and corporators)
export const getProjectsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const query = category === "all" ? {} : { category };
    const projects = await Project.find(query);

    if (!projects || projects.length === 0) {
      return res
        .status(404)
        .json({ message: "No projects found for this category!" });
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
