import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://blog-app-backend-yqxs.onrender.com";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/blogs/${id}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const deleteBlog = async () => {
    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`);
      alert("Blog deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (!blog) return <h2>Loading blog...</h2>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>{blog.title}</h1>
      <p><strong>Author:</strong> {blog.author}</p>
      <hr />
      <p>{blog.content}</p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate(`/write?id=${blog.id}`)}>
          Edit
        </button>

        <button
          onClick={deleteBlog}
          style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BlogDetail;