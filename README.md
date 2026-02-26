Blog Application with GenAI Content Suggestions
Overview

This is a full-stack Blog Application built using React (frontend), Node.js with Express (backend), SQLite (database), and Google Gemini AI for content suggestions.

Users can create, edit, delete, and view blog posts. While writing a blog, the system provides AI-generated related topics and introductory paragraph suggestions.

Tech Stack

Frontend: React.js, React Router, Axios

Backend: Node.js, Express.js

Database: SQLite

AI Integration: Google Gemini (gemini-2.5-flash model)

Features

Create, Read, Update, Delete (CRUD) blog posts

View blog list and detailed blog page

Edit and delete existing posts

AI-generated blog topic and intro suggestions

Clean REST API structure

API Endpoints
Blog APIs

POST /api/blogs – Create blog

GET /api/blogs – Get all blogs

GET /api/blogs/:id – Get blog by ID

PUT /api/blogs/:id – Update blog

DELETE /api/blogs/:id – Delete blog

AI API

POST /api/ai-suggestions – Generate AI content suggestions

Database Schema

Blogs Table

id (INTEGER, Primary Key)

title (TEXT)

content (TEXT)

author (TEXT)

created_at (DATETIME)

updated_at (DATETIME)

Setup Instructions
Backend
cd backend
npm install

Create a .env file inside backend:

GEMINI_API_KEY=your_api_key_here
PORT=5000

Start backend:

npm start
Frontend
cd frontend
npm install
npm start

Frontend runs at: http://localhost:3000

Backend runs at: http://localhost:5000