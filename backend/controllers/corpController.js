import bcrypt from "bcryptjs";
import { Corporator } from "../../models/corpSchema.js";
import { generateToken } from "../../lib/utils.js";

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
      generateToken(newCorporator._id, res); // calling a function to generate token and send it using cookie to user ..... newuser._id is the unique field assigned by MongoDb to each document

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

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const corporator = await Corporator.findOne({ email });

    if (!corporator) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, corporator.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    generateToken(corporator._id, res);

    res.status(200).json({
      _id: corporator._id,
      // fullName: corporator.fullName,
      email: corporator.email,
      political_party: corporator.political_party,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log("Error in login controller", error.message);
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); // just clearing up the stored cookie of the user with name jwt , empty token and age of 0
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log("Error in logout controller", error.message);
  }
};


// Add a new project (corporator only)
export const addProject = async (req, res) => {
  const { name, category, description, startDate, visualizationType, data } =
    req.body;

  // Get the logged-in corporator's ID from req.user (set in the authMiddleware)
  const corporatorId = req.user._id;

  // Check if corporator exists
  const corporator = await Corporator.findById(corporatorId);
  if (!corporator) {
    return res.status(404).json({ message: "Corporator not found" });
  }

  try {
    const newProject = new Project({
      name,
      category,
      description,
      startDate,
      visualizationType,
      data,
    });

    await newProject.save();
    res
      .status(201)
      .json({ message: "Project added successfully!", project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Error adding project", error });
  }
};

// Update an existing project (corporator only)
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params; // Get project ID from URL
    const { name, description, data } = req.body; // Fields to update

    // Find the project by ID
    let project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update fields if provided
    if (name) project.name = name;
    if (description) project.description = description;
    if (data) project.data = data;

    // Save updated project
    await project.save();

    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
