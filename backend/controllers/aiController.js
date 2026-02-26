const axios = require("axios");

exports.generateSuggestions = async (req, res) => {
  const { title, content } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Suggest 3 related blog topics or introductory paragraph ideas.

Title: ${title}
Content: ${content}

Return each suggestion on a new line.`
              }
            ]
          }
        ]
      }
    );

    const text =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const suggestions = text
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    res.json({ suggestions });

  } catch (err) {
    console.error("Gemini Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate AI suggestions" });
  }
};