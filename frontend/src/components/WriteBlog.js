import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const API_URL = "https://blog-app-backend-yqxs.onrender.com";

function WriteBlog() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const blogId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch blog when editing
  useEffect(() => {
    if (!blogId) return;

    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/blogs/${blogId}`
        );

        setTitle(res.data.title);
        setContent(res.data.content);
        setAuthor(res.data.author);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const getSuggestions = async () => {
    if (!title && !content) {
      alert("Please enter title or content first.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/ai-suggestions`,
        { title, content }
      );

      setSuggestions(res.data?.suggestions || []);
    } catch (error) {
      console.error("AI Error:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const saveBlog = async () => {
    if (!title || !content || !author) {
      alert("Please fill all fields.");
      return;
    }

    try {
      if (blogId) {
        await axios.put(
          `${API_URL}/api/blogs/${blogId}`,
          { title, content, author }
        );
        alert("Blog Updated Successfully!");
      } else {
        await axios.post(
          `${API_URL}/api/blogs`,
          { title, content, author }
        );
        alert("Blog Created Successfully!");
      }

      navigate("/");
    } catch (error) {
      console.error("Save Error:", error);
      alert("Failed to save blog.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>{blogId ? "Edit Blog" : "Write Blog"}</h2>

      <input
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <textarea
        value={content}
        placeholder="Content"
        rows="6"
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <input
        value={author}
        placeholder="Author"
        onChange={(e) => setAuthor(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <button onClick={getSuggestions} disabled={loading}>
        {loading ? "Generating..." : "Generate AI Suggestions"}
      </button>

      <button onClick={saveBlog} style={{ marginLeft: "10px" }}>
        {blogId ? "Update" : "Publish"}
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>AI Suggestions</h3>

        {suggestions.length === 0 && !loading && (
          <p>No suggestions yet.</p>
        )}

        {suggestions.map((s, i) => (
          <p key={i} style={{ background: "#f5f5f5", padding: "8px" }}>
            {s}
          </p>
        ))}
      </div>
    </div>
  );
}

export default WriteBlog;