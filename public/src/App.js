import React, { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [essay, setEssay] = useState("");

  const generateEssay = async () => {
    setEssay("Loading...");

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        process.env.REACT_APP_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Write an essay about ${topic}` }] }],
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No essay generated.";
    setEssay(text);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>AI Essay Generator</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic"
        style={{ width: "300px", padding: "10px" }}
      />
      <button onClick={generateEssay} style={{ marginLeft: "10px", padding: "10px" }}>
        Generate
      </button>
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>{essay}</div>
    </div>
  );
}

export default App;
