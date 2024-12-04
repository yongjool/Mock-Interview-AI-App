import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./App.css";

const App = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [messages, setMessages] = useState([
    "Interviewer: Tell me about yourself.",
  ]);
  const [history, setHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [isJobTitleDisabled, setIsJobTitleDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track the submission state
  const [isSimulating, setIsSimulating] = useState(false); // Track the submission state
  const scrollRef = useRef(null);

  const callYongAPI = async (jobTitle, history, message) => {
    return axios.post("http://localhost:4000/api/yong", {
      jobTitle: jobTitle,
      history: history,
      message: message,
    });
  };

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
        const response = await callYongAPI(jobTitle, history, userInputCopy);

        // Add AI response to messages
        const serverMessage = `Interviewer: ${response.data.message}`;
        setMessages((prevMessages) => [...prevMessages, serverMessage]);
        setServerMessage(response.data.message);

        // Save the chat history
        setHistory([
          ...history,
          { role: "user", parts: [{ text: userInputCopy }] },
          { role: "model", parts: [{ text: response.data.message }] },
        ]);
      } catch (error) {
        console.error("Error calling backend API:", error);
        const errorMessage = "server: There was an error with the AI service.";
        setMessages((prevMessages) => [...prevMessages, errorMessage]);

        setUserInput(userInputCopy);
      } finally {
        // Re-enable the submit button and show "Submit" again
        setIsSubmitting(false);
      }
    }
  };

  const swapUserModelRoles = (history) => {
    return history.map((message) => {
      if (message.role === "user") {
        return {
          ...message,
          role: "model", // Change 'user' to 'model'
        };
      } else if (message.role === "model") {
        return {
          ...message,
          role: "user", // Change 'model' to 'user'
        };
      }
      return message; // If the role is neither 'user' nor 'model', keep it unchanged
    });
  };

  const handleSimulateInterview = async () => {
    const startMessage = {
      role: "user",
      parts: [{ text: "Tell me about yourself" }],
    };

    // Disable the submit button and show "waiting for response"
    setIsSimulating(true);

    try {
      // Send the user's message to your backend
      const response = await axios.post("http://localhost:4000/api/yongTest", {
        jobTitle: jobTitle,
        history: [startMessage, ...swapUserModelRoles(history)],
        message: serverMessage,
      });

      setUserInput(response.data.message);
    } catch (error) {
      console.error("Error calling backend API:", error);
      const errorMessage = "server: There was an error with the AI service.";
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      // Re-enable the submit button and show "Submit" again
      setIsSimulating(false);
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
              <p key={index} className="message">
                {msg}
              </p>
            ))
          ) : (
            <p>Interviewer: Tell me about yourself</p>
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
        <button
          onClick={handleSimulateInterview}
          className="simulate-button"
          disabled={isSimulating}
        >
          {" "}
          {isSimulating ? "  ... " : "Simulate my interview question"}{" "}
          {/* Button text */}
        </button>
      </div>
    </>
  );
};

export default App;
