// import bcrypt from "bcryptjs";
// import { Corporator } from "../../models/corpSchema.js";
// import { Project } from "../../models/projectSchema.js";
// import { generateToken } from "../../lib/utils.js";

// export const register = async (req, res) => {
//   const { name, email, password, political_party } = req.body;
//   try {
//     // hash passwords using bcrypt.js
//     if (!name || !email || !password || !political_party) {
//       return res.status(400).json({ message: "All fields are required!" });
//     }
//     if (password.length < 6) {
//       // first check the password field validation
//       return res
//         .status(400)
//         .json({ message: "Password must be at least 6 characters!" });
//     }

//     const corporator = await Corporator.findOne({ email }); // check if it's an existing user

//     if (corporator)
//       return res.status(400).json({ message: "Corporator Already Exists" });

//     const salt = await bcrypt.genSalt(10); // generating hashed password for new user
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newCorporator = new Corporator({
//       // creating a new user
//       name,
//       email, // same as email: email,
//       password: hashedPassword,
//       political_party,
//     });

//     if (newCorporator) {
//       // generate JWT token
//       generateToken(newCorporator._id, "corporator", res); // calling a function to generate token and send it using cookie to user ..... newuser._id is the unique field assigned by MongoDb to each document

//       await newCorporator.save(); // saving user to database

//       // console.log(salt);
//       // console.log(hashedPassword);
//       res.status(201).json({
//         _id: newCorporator._id,
//         name: newCorporator.name,
//         email: newCorporator.email,
//         political_party: newCorporator.political_party,
//       });
//     } else {
//       res.status(400).json({ message: "Invalid Corporator Data!" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//     console.log("Error in signup controller", error.message);
//   }
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const corporator = await Corporator.findOne({ email });

//     if (!corporator) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }

//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       corporator.password
//     );

//     if (!isPasswordCorrect) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }

//     generateToken(corporator._id, corporator.role, res);

//     res.status(200).json({
//       _id: corporator._id,
//       // fullName: corporator.fullName,
//       email: corporator.email,
//       political_party: corporator.political_party,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error!" });
//     console.log("Error in login controller", error.message);
//   }
// };

// export const logout = (req, res) => {
//   try {
//     res.cookie("jwt", "", { maxAge: 0 }); // just clearing up the stored cookie of the user with name jwt , empty token and age of 0
//     res.status(200).json({ message: "Logged out successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error!" });
//     console.log("Error in logout controller", error.message);
//   }
// };

// // Add a new project (corporator only)
// export const addProject = async (req, res) => {
//   try {
//     const { name, visualizationType, category, description, startDate, data } =
//       req.body;
//     // const corporatorId = req.user.id;
//     const corporatorId = "679cab2c26e28c3c630a6b55";

//     if (
//       !name ||
//       !visualizationType ||
//       !category ||
//       !description ||
//       !startDate ||
//       !data
//     ) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     // Ensuring data points are valid
//     if (
//       !Array.isArray(data) ||
//       data.some((dp) => !dp.name || isNaN(dp.value))
//     ) {
//       return res.status(400).json({ message: "Invalid data points." });
//     }

//     const newProject = new Project({
//       name,
//       visualizationType,
//       category,
//       description,
//       startDate,
//       data,
//       corporator: corporatorId,
//     });

//     console.log("Saving project:", newProject);
//     await newProject.save();
//     res
//       .status(201)
//       .json({ message: "Project added successfully!", project: newProject });
//   } catch (error) {
//     console.error("Error adding project:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // Get all projects (optionally filtered by category or other criteria)
// export const getProjects = async (req, res) => {
//   try {
//     const category = req.query.category || "all"; // Default to "all" if undefined
//     // console.log(`Received category: "${category}"`);

//     // filter condition
//     const filter =
//       category !== "all"
//         ? { category: { $regex: new RegExp(category.trim(), "i") } }
//         : {};

//     // Fetch projects, sort by startDate (latest first), and populate corporator name
//     const projects = await Project.find(filter)
//       .sort({ startDate: -1 })
//       .populate("corporator", "name");

//     // console.log(
//     //   `Fetched ${projects.length} project(s) for category: "${category}"`
//     // );

//     res.json({ message: "Projects fetched successfully", projects });
//   } catch (error) {
//     console.error("Error fetching projects:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch projects", error: error.message });
//   }
// };

// export const updateProject = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, data } = req.body;

//     let project = await Project.findById(id);
//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     let corporator_id = "679cab2c26e28c3c630a6b55"; // Hardcoded for now

//     // Check if the corporator matches the one assigned to the project
//     if (project.corporator.toString() !== corporator_id) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to update this project" });
//     }

//     // Only update fields if provided
//     if (name !== undefined) project.name = name;
//     if (description !== undefined) project.description = description;
//     if (data !== undefined) project.data = data;

//     // Save changes
//     await project.save();

//     res.status(200).json({ message: "Project updated successfully", project });
//   } catch (error) {
//     console.error("Error updating project:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Delete a project (corporator only)
// export const deleteProject = async (req, res) => {
//   try {
//     const { id } = req.params; // Get project ID from URL
//     console.log(`Attempting to delete project with ID: ${id}`);

//     // Find the project by ID
//     const project = await Project.findById(id);
//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     let corporator_id = "679cab2c26e28c3c630a6b55";
//     // Check if the logged-in user is the corporator who created the project
//     if (project.corporator.toString() !== corporator_id.toString()) {
//       console.log("Unauthorized deletion attempt");
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to delete this project" });
//     }

//     // Delete the project
//     await Project.findByIdAndDelete(id);
//     console.log(`Project with ID: ${id} deleted successfully`);

//     res.status(200).json({ message: "Project deleted successfully" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export const myProfile = async (req, res) => {
//   console.log("Decoded user:", req.user);

//   try {
//     const corporator = await Corporator.findById(req.user?.userId).select(
//       "name"
//     );

//     if (!corporator) {
//       return res.status(404).json({ message: "Corporator not found" });
//     }

//     res.json({ name: corporator.name });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


import bcrypt from "bcryptjs";
import { Corporator } from "../../models/corpSchema.js";
import { Project } from "../../models/projectSchema.js";
import { User } from "../../models/userSchema.js";
import { generateToken } from "../../lib/utils.js";
import {sendMail} from "../../lib/sendMail.js";

export const register = async (req, res) => {
  const { name, email, password, political_party } = req.body;
  try {
    // hash passwords using bcrypt.js
    if (!name || !email || !password || !political_party) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (password.length < 6) {
      // first check the password field validation
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters!" });
    }

    const corporator = await Corporator.findOne({ email }); // check if it's an existing user

    if (corporator)
      return res.status(400).json({ message: "Corporator Already Exists" });

    const salt = await bcrypt.genSalt(10); // generating hashed password for new user
    const hashedPassword = await bcrypt.hash(password, salt);

    const newCorporator = new Corporator({
      // creating a new user
      name,
      email, // same as email: email,
      password: hashedPassword,
      political_party,
    });

    if (newCorporator) {
      // generate JWT token
      generateToken(newCorporator._id, "corporator", res); // calling a function to generate token and send it using cookie to user ..... newuser._id is the unique field assigned by MongoDb to each document

      await newCorporator.save(); // saving user to database

      // console.log(salt);
      // console.log(hashedPassword);
      res.status(201).json({
        _id: newCorporator._id,
        name: newCorporator.name,
        email: newCorporator.email,
        political_party: newCorporator.political_party,
      });
    } else {
      res.status(400).json({ message: "Invalid Corporator Data!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error in signup controller", error.message);
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const category = req.query.category || "all"; // Default to "all" if undefined
    // console.log(`Received category: "${category}"`);

    // filter condition
    const filter =
      category !== "all"
        ? { category: { $regex: new RegExp(category.trim(), "i") } }
        : {};

    // Fetch projects, sort by startDate (latest first), and populate corporator name
    const projects = await Project.find(filter)
      .sort({ startDate: -1 })
      .populate("corporator", "name");

    // console.log(
    //   `Fetched ${projects.length} project(s) for category: "${category}"`
    // );

    res.json({ message: "Projects fetched successfully", projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch projects", error: error.message });
  }
};

// Delete a project (corporator only)
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params; // Get project ID from URL
    console.log(`Attempting to delete project with ID: ${id}`);

    // Find the project by ID
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    let corporator_id = "67dc51d5d459e99d8ed54fab";
    // Check if the logged-in user is the corporator who created the project
    if (project.corporator.toString() !== corporator_id.toString()) {
      console.log("Unauthorized deletion attempt");
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this project" });
    }

    // Delete the project
    await Project.findByIdAndDelete(id);
    console.log(`Project with ID: ${id} deleted successfully`);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const myProfile = async (req, res) => {
  // console.log("Decoded user:", req.user);

  try {
    const corporator = await Corporator.findById(req.user?.userId).select(
      "name"
    );

    if (!corporator) {
      return res.status(404).json({ message: "Corporator not found" });
    }

    res.json({ name: corporator.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addProject = async (req, res) => {
  try {
    const { name, visualizationType, category, description, startDate, data } =
      req.body;
    const corporatorId = "67dc51d5d459e99d8ed54fab"; // Hardcoded for now

    if (
      !name ||
      !visualizationType ||
      !category ||
      !description ||
      !startDate ||
      !data
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (
      !Array.isArray(data) ||
      data.some((dp) => !dp.name || isNaN(dp.value))
    ) {
      return res.status(400).json({ message: "Invalid data points." });
    }

    const newProject = new Project({
      name,
      visualizationType,
      category,
      description,
      startDate,
      data,
      corporator: corporatorId,
    });

    console.log("Saving project:", newProject);
    await newProject.save();

    // Fetch users before sending emails
    // const users = await User.find({}, "email name");

    // // Send notifications to all users asynchronously
    // await Promise.all(
    //   users.map((user) =>
    //     sendMail(
    //       user.email,
    //       user.name,
    //       "🚀 New Project Added!",
    //       `A new project **"${name}"** has been added. Stay updated with the latest developments!`,
    //       "https://janmanch.com/projects"
    //     ).catch((error) =>
    //       console.error(`Email failed for ${user.email}:`, error.message)
    //     )
    //   )
    // );

    res
      .status(201)
      .json({ message: "Project added successfully!", project: newProject });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, data } = req.body;

    let project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    let corporator_id = "67dc51d5d459e99d8ed54fab"; // Hardcoded for now

    if (project.corporator.toString() !== corporator_id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this project" });
    }

    if (name !== undefined) project.name = name;
    if (description !== undefined) project.description = description;
    if (data !== undefined) project.data = data;

    await project.save();

    // Fetch all users and notify about the project update
    // const users = await User.find({}, "email name");
    // for (const user of users) {
    //   await sendMail(
    //     user.email,
    //     user.name,
    //     "🔔 Project Update Notification!",
    //     `The project **"${project.name}"** has been updated. Click below to see the latest changes.`,
    //     `https://janmanch.com/projects/${id}`
    //   );
    // }

    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Add a New User (Admin Only)
export const addUser = async (req, res) => {
  const { name, email, password, phoneNumber, voterID } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      voterID,
    });

    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Error adding user:", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Add a New Corporator (Admin Only)
export const addCorporator = async (req, res) => {
  const { name, email, password, political_party } = req.body;

  try {
    const existingCorporator = await Corporator.findOne({ email });
    if (existingCorporator) {
      return res.status(400).json({ message: "Corporator already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCorporator = await Corporator.create({
      name,
      email,
      password: hashedPassword,
      political_party,
      role: "corporator", // Default role is "corporator"
    });

    res.status(201).json({
      success: true,
      corporator: newCorporator,
    });
  } catch (error) {
    console.error("Error adding corporator:", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Get All Users (Admin Only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Get All Corporators (Admin Only)
export const getAllCorporators = async (req, res) => {
  try {
    const corporators = await Corporator.find().select("-password"); // Exclude passwords
    res.status(200).json({
      success: true,
      corporators,
    });
  } catch (error) {
    console.error("Error fetching corporators:", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};