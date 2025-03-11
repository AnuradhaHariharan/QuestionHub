import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Home.css';
import { StoreContext } from '../../context/StoreContext';

const Home = () => {
  const { url } = useContext(StoreContext); // Removed token dependency
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''], // Four options as an array
    correctAnswer: '',
    teacherName: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith('option')) {
      const index = Number(name.replace('option', ''));
      setFormData((prevData) => {
        const newOptions = [...prevData.options];
        newOptions[index] = value;
        return { ...prevData, options: newOptions };
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/api/projects/create`, formData);

      if (response.status === 201) {
        alert('Question submitted successfully');
        setFormData({
          question: '',
          options: ['', '', '', ''],
          correctAnswer: '',
          teacherName: '',
        });
      } else {
        alert('Failed to submit the question. Try again.');
      }
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('Error submitting question.');
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h2>Submit a Question</h2>

        <div className='form-group'>
          <label htmlFor='teacherName'>Your Name:</label>
          <input
            type='text'
            id='teacherName'
            name='teacherName'
            value={formData.teacherName}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className='form-group'>
          <label htmlFor='question'>Question:</label>
          <textarea
            id='question'
            name='question'
            value={formData.question}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Enter the question"
          />
        </div>

        <div className='form-group'>
          <label>Options:</label>
          {formData.options.map((option, index) => (
            <input
              key={index}
              type='text'
              name={`option${index}`}
              value={option}
              onChange={handleChange}
              required
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>

        <div className='form-group'>
          <label htmlFor='correctAnswer'>Correct Answer:</label>
          <select
            id='correctAnswer'
            name='correctAnswer'
            value={formData.correctAnswer}
            onChange={handleChange}
            required
          >
            <option value='' disabled>Select the correct answer</option>
            {formData.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <button type='submit' className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Home;

