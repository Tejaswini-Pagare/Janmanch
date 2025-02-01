import Project from "../models/projectSchema.js";

export const getProjectsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const query = category === "all" ? {} : {category};
    const projects = await Project.find(query);

    if (!projects || projects.length === 0)
      return res
        .status(404)
        .json({ message: "No Projects found for thi+s category!" });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
