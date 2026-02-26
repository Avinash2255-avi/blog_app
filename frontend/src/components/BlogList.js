import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://blog-app-backend-yqxs.onrender.com";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <h2>Loading blogs...</h2>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>All Blog Posts</h1>

      <Link to="/write">
        <button style={{ marginBottom: "20px" }}>Write New Blog</button>
      </Link>

      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              background: "#fafafa"
            }}
          >
            <h2>{blog.title}</h2>
            <p><strong>Author:</strong> {blog.author}</p>
            <p>{blog.content.substring(0, 100)}...</p>

            <Link to={`/blog/${blog.id}`}>
              <button>Read More</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogList;