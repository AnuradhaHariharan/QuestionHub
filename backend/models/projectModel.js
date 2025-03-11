import mongoose from 'mongoose';

// Define the question schema
const projectSchema = new mongoose.Schema({
    question: { type: String, required: true }, // The question text
    options: { 
        type: [String], 
        required: true, 
        validate: [arrayLimit, 'Exactly four options are required'] 
    }, // Array of four multiple-choice options
    correctAnswer: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(value) {
                return this.options.includes(value);
            },
            message: 'Correct answer must be one of the provided options'
        }
    }, // The correct answer must be one of the options
    teacherName: { type: String, required: true }, // Name of the teacher who submitted the question
    createdAt: { type: Date, default: Date.now } // Automatically set the creation date
});

// Function to ensure exactly four options are provided
function arrayLimit(val) {
    return val.length === 4;
}

// Create or retrieve the project model
const projectModel = mongoose.models.project || mongoose.model("project", projectSchema);

// Export the model
export default projectModel;
