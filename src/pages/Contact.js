import React, { useState } from "react";

function Contact() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent: ${message}`);
    setMessage("");
  };

  return (
    <div>
      <h1>📞 Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          rows="4"
          cols="40"
          style={{ padding: "10px", fontSize: "1rem" }}
        />
        <br />
        <button type="submit" style={{ marginTop: "10px" }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;
