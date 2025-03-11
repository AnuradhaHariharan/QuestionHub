import express from "express"
import { getProjects ,createProject} from "../controllers/projectController.js"

const projectRouter=express.Router();

projectRouter.post("/getprojects",getProjects)
projectRouter.post("/create",createProject)


export default projectRouter;