import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./App.css";

const App = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [messages, setMessages] = useState(['Interviewer: Tell me about yourself.']);
  const [userInput, setUserInput] = useState("");
  const [isJobTitleDisabled, setIsJobTitleDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track the submission state
  const scrollRef = useRef(null);

const handleSubmit = async () => {
    if (userInput.trim()) {
      // Disable the job title input after the first submit
      if (!isJobTitleDisabled) {
        setIsJobTitleDisabled(true);
      }

      // Add user message to messages
      const userMessage = `Me: ${userInput}`;
      setMessages([...messages, userMessage]);
      const userInputCopy = userInput; // Capture current input for server usage
      setUserInput("");

       // Disable the submit button and show "waiting for response"
       setIsSubmitting(true);

      try {
        // Send the user's message to your backend
        const response = await axios.post("http://localhost:4000/api/chat", {
          jobTitle: jobTitle,
          message: userInputCopy,
        });

        // Add AI response to messages
        const serverMessage = `Interviewer: ${response.data.message}`;
        setMessages((prevMessages) => [...prevMessages, serverMessage]);
        
      } catch (error) {
        console.error("Error calling backend API:", error);
        const errorMessage = "server: There was an error with the AI service.";
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }finally {
        // Re-enable the submit button and show "Submit" again
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <h1 className="title">AI Mock Interviewer</h1>
      <div className="container">
        <div className="job-title-section">
          <label className="label">Job Title:</label>
          <input
            type="text"
            className="input"
            placeholder="Enter job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            disabled={isJobTitleDisabled}
          />
        </div>
        <div className="scrollable-box" ref={scrollRef}>
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <p key={index} className="message">{msg}</p>
            ))
          ) : (
            <p>No messages yet...</p>
          )}
        </div>
        <div className="input-section">
          <input
            type="text"
            className="input"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={!jobTitle.trim() || !userInput.trim() || isSubmitting} // Disable when submitting
          >
            {isSubmitting ? "  ... " : "Submit"} {/* Button text */}
          </button>
        </div>
      </div>
    </>
  );
};


export default App;
