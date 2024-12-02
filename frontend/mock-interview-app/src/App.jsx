import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isJobTitleDisabled, setIsJobTitleDisabled] = useState(false);
  const scrollRef = useRef(null);

  const handleSubmit = () => {
    if (userInput.trim()) {
      // Disable the job title input after the first submit
      if (!isJobTitleDisabled) {
        setIsJobTitleDisabled(true);
      }
      setMessages([...messages, userInput]);
      setUserInput("");
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
            disabled={isJobTitleDisabled} // Disable the input if the state is true
          />
        </div>
        <div className="scrollable-box" ref={scrollRef}>
          {messages.length > 0 ? (
            messages.map((msg, index) => <p key={index}>{msg}</p>)
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
            disabled={!jobTitle.trim() || !userInput.trim()}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
