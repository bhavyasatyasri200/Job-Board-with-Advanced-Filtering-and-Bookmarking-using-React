# Job Board with Advanced Filtering and Bookmarking

**Live Demo:** https://regal-fox-fb1f59.netlify.app/
---
**Video Demo:** https://youtu.be/7Dv3qVZZyQk

A multi-page Job Board application built using **React (Vite)** and **Zustand**, featuring advanced client-side filtering, searching, sorting, pagination, and bookmarking. The project is fully containerized using **Docker** and can be executed with a single command.

---

## 📌 Project Objective

This project simulates a real-world job portal where users can efficiently browse, search, filter, and track job listings. It demonstrates best practices in modern frontend development, state management, and production-ready application setup.

---

## 🚀 Features

### Job Listings
- Displays 20+ job listings from local mock data
- Grid and List view toggle
- Responsive layout for desktop and mobile

### Advanced Filtering
- Filter by job type (Remote / Hybrid / Onsite)
- Filter by experience level
- Multi-select skill filtering
- Salary range slider
- Active filter indicators
- Clear all filters functionality

### Search, Sorting & Pagination
- Debounced search by job title or company name
- Sort jobs by salary (high to low)
- Client-side pagination (10 jobs per page)

### Bookmarking & Tracker
- Bookmark jobs with persistent state using `localStorage`
- Visual bookmark indicators
- Dedicated `/tracker` page showing bookmarked jobs

---

## 🛠️ Tech Stack

- **React (Vite)**
- **Zustand** (Global State Management)
- **Tailwind CSS**
- **Docker & Docker Compose**
- **Netlify** (Hosting)

---

## 📁 Folder Structure

```bash
Job-Board-with-Advanced-Filtering-and-Bookmarking/
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── JobCard.jsx
│   │   ├── JobList.jsx
│   │   ├── FiltersPanel.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Pagination.jsx
│   │   └── ViewToggle.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Tracker.jsx
│   │
│   ├── store/
│   │   └── jobStore.js
│   │
│   ├── data/
│   │   └── mock-data.json
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 📦 Mock Data

The application loads job and company data from:


The file follows the required schema and contains at least **20 job records**, ensuring verifiable filtering, sorting, and pagination behavior.

---

## 📦 Mock Data

The application loads job and company data from:

src/data/mock-data.json

- Follows the required schema
- Contains at least 20 job records
- Enables reliable filtering, sorting, and pagination behavior

## ⚙️ Environment Variables

All required environment variables are documented in:

.env.example

No sensitive credentials are required for local development.

## 🧑‍💻 Running the Project Locally (Without Docker)

1️⃣ Install dependencies
npm install

2️⃣ Start development server
npm run dev

3️⃣ Open in browser
http://localhost:5173

## 🐳 Running the Project Inside Docker

This project is fully containerized using **Docker** and **Docker Compose**, allowing it to be built and run with a single command.

### Prerequisites
Make sure the following tools are installed on your system:

- Docker
- Docker Compose

---

### 📦 Build and Run the Application

From the project root directory, run:

```bash
 git clone https://github.com/bhavyasatyasri200/Job-Board-with-Advanced-Filtering-and-Bookmarking-using-React.git

 cd Job-Board-with-Advanced-Filtering-and-Bookmarking-using-React

 cd job-board

docker-compose up -d --build

---
The output will runs on localhost:3000
