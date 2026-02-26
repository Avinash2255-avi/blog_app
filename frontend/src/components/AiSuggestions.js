import { useState } from "react";
import axios from "axios";

const API_URL = "https://blog-app-backend-yqxs.onrender.com";

function AiSuggestions({ title, content }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const generateSuggestions = async () => {
    if (!title && !content) {
      alert("Please enter title or content first.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/ai-suggestions`,
        { title, content }
      );

      setSuggestions(response.data?.suggestions || []);
    } catch (error) {
      console.error("Error generating suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        marginTop: "20px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9"
      }}
    >
      <h3>AI Content Suggestions</h3>

      <button onClick={() => setVisible(!visible)}>
        {visible ? "Hide Suggestions" : "Show Suggestions"}
      </button>

      <button
        onClick={generateSuggestions}
        style={{ marginLeft: "10px" }}
      >
        Generate New Suggestions
      </button>

      {loading && <p>Generating suggestions...</p>}

      {visible && suggestions.length > 0 && (
        <ul style={{ marginTop: "15px" }}>
          {suggestions.map((suggestion, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {visible && !loading && suggestions.length === 0 && (
        <p style={{ marginTop: "10px" }}>
          No suggestions yet. Click "Generate New Suggestions".
        </p>
      )}
    </div>
  );
}

export default AiSuggestions;