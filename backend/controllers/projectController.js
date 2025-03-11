import userModel from "../models/userModel.js";
import projectModel from "../models/projectModel.js";
import { use } from "bcrypt/promises.js";


const createProject = async (req, res) => {
    try {
        // Extract required fields from the request body
        const { question, options, correctAnswer, teacherName } = req.body;
        console.log('req.body:', req.body);

        // Ensure exactly four options are provided
        if (!Array.isArray(options) || options.length !== 4) {
            return res.status(400).json({ success: false, message: "Exactly four options are required" });
        }

        // Ensure the correct answer is one of the provided options
        if (!options.includes(correctAnswer)) {
            return res.status(400).json({ success: false, message: "Correct answer must be one of the provided options" });
        }

        // Create a new question instance
        const newQuestion = new projectModel({
            question,
            options,
            correctAnswer,
            teacherName,
            createdAt: new Date(), // Automatically set timestamp
        });

        console.log('newQuestion:', newQuestion);

        // Save the new question to the database
        await newQuestion.save();

        // Send a success response with the saved question details
        res.status(201).json({ success: true, message: "Question submitted successfully", question: newQuestion });
    } catch (error) {
        console.error("Error submitting question:", error.message);
        res.status(500).json({ success: false, message: "Error submitting question", error: error.message });
    }
};

const getProjects = async (req, res) => {
    try {
        // Fetch all questions from the database
        const questions = await projectModel.find();

        // Check if there are no questions
        if (!questions || questions.length === 0) {
            return res.json({ success: true, message: "No questions to display" });
        }

        // Send the questions data in the response
        res.json({ success: true, projects: questions }); // Returning questions as 'projects' to match the original response format
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ success: false, message: "Error fetching questions", error: error.message });
    }
};


export { getProjects ,createProject};