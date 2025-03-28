  // import express from "express";
  // import { authMiddleware, roleMiddleware } from "../middleware/auth.js";
  // import {
  //   addProject,
  //   deleteProject,
  //   getProjects,
  //   myProfile,
  //   updateProject,
  // } from "../controllers/corporators/corpController.js";
  // import {
  //   login,
  //   logout,
  //   register,
  // } from "../controllers/corporators/corpController.js";

  // const router = express.Router();

  // router.post("/register", register);
  // // router.post("/login", login);
  // // router.post("/logout", logout);

  // // router.get("/projects", authMiddleware, getProjects);
  // router.get(
  //   "/projects",
  //   // authMiddleware,
  //   // roleMiddleware("corporator"),
  //   getProjects
  // );

  // // Add a new project (corporator only)
  // router.post("/add", authMiddleware, roleMiddleware("corporator"), addProject);
  // // Update an existing project (corporator only)

  // router.put(
  //   "/update/:id",
  //   authMiddleware,
  //   roleMiddleware("corporator"),
  //   updateProject
  // );

  // router.delete(
  //   "/delete/:id",
  //   authMiddleware,
  //   roleMiddleware("corporator"),
  //   deleteProject
  // );

  // router.get("/me", authMiddleware, myProfile);

  // export default router;


  import express from "express";
  import { authMiddleware, roleMiddleware } from "../middleware/auth.js";
  import {
    addProject,
    deleteProject,
    getProjects,
    myProfile,
    updateProject,
    addUser,
    addCorporator,
    getAllUsers,
    getAllCorporators,
    register,
  } from "../controllers/corporators/corpController.js";

  const router = express.Router();

  router.post("/register", register);

  router.get(
    "/projects",
    authMiddleware,
    roleMiddleware("corporator", "admin"),
    getProjects
  );

  router.post(
    "/add",
    authMiddleware,
    roleMiddleware("corporator", "admin"),
    addProject
  );

  router.put(
    "/update/:id",
    authMiddleware,
    roleMiddleware("corporator", "admin"),
    updateProject
  );

  router.delete(
    "/delete/:id",
    authMiddleware,
    roleMiddleware("corporator", "admin"),
    deleteProject
  );

  router.get("/me", authMiddleware, myProfile);

  // ADMIN-ONLY ROUTES
  router.post("/dashboard", authMiddleware, roleMiddleware("admin"), addUser);
  router.post(
    "/add-corporator",
    authMiddleware,
    roleMiddleware("admin"),
    addCorporator
  );
  router.get("/get-users", authMiddleware, roleMiddleware("admin"), getAllUsers);
  router.get(
    "/get-corporators",
    authMiddleware,
    roleMiddleware("admin"),
    getAllCorporators
  );

  export default router;
