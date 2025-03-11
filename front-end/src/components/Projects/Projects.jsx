import React, { useEffect, useState, useContext } from 'react';
import './Projects.css'; // Import your CSS file for styling
import { StoreContext } from '../../context/StoreContext'; // Import the context
import axios from 'axios';

const Questions = () => {
  const [questions, setQuestions] = useState([]); // State to hold questions
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages
  const { url } = useContext(StoreContext); // Access URL from context

  // Fetch questions from API
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null); // Reset error state before making the request

    try {
      const response = await axios.post(`${url}/api/projects/getprojects`);

      // Log the API response for debugging
      console.log("API Response:", response.data);

      // Check if the response indicates success
      if (response.data.success) {
        setQuestions(response.data.projects || []); // Set questions from response
      } else {
        setError(response.data.message); // Set error message
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError(err.response?.data?.message || "Failed to fetch questions."); // Set a general error message
    } finally {
      setLoading(false); // Set loading to false after request
    }
  };

  useEffect(() => {
    fetchQuestions(); // Fetch questions when the component mounts
  }, []); // Run only once on mount

  return (
    <div className="questions-container" id='questions'>
      <h2 className="questions-heading">Submitted Questions</h2>
      {loading && <p>Loading questions...</p>} {/* Show loading message */}
      {error && <p className="error-message">{error}</p>} {/* Show error message if any */}
      <div className="questions-grid">
        {Array.isArray(questions) && questions.length > 0 ? (
          questions.map((question) => (
            <div className="question-card" key={question._id}> {/* Assuming each question has a unique _id */}
              <h3>{question.question || 'Untitled Question'}</h3> {/* Display question */}
              <ul>
                {question.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
              <p><strong>Correct Answer:</strong> {question.correctAnswer}</p> {/* Display correct answer */}
              <p><strong>Submitted By:</strong> {question.teacherName}</p> {/* Display teacher name */}
              <p><strong>Created At:</strong> {new Date(question.createdAt).toLocaleDateString()}</p> {/* Display creation date */}
            </div>
          ))
        ) : (
          <p>No questions to display.</p> // Message when no questions are found
        )}
      </div>
    </div>
  );
};

export default Questions;

