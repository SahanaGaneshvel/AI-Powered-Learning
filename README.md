# 🎓 Personalized Learning App

A modern, AI-powered e-learning platform designed to deliver personalized learning experiences through video capsule analytics, adaptive quizzes, peer trends, and interactive progress visualizations.

---

## 🚀 Features

### 🧠 AI & Learning Analytics
- **AI-Powered Study Assistant** – Ask questions and get topic-wise explanations.
- **Smart Notes Generator** – Auto-generate notes from video lectures.
- **Adaptive Learning Paths** – Recommend content based on user performance.

### 📊 Video Interaction Analytics
- **Most Replayed Sections** – Heatmaps for each video.
- **Drop-off Rate Detection** – Track where users stop watching.
- **Playback Speed Trends** – Understand how students engage.

### 📚 Quiz & Performance Insights
- **Topic-wise Strength/Weakness** – Visualize performance graphs.
- **Time vs Accuracy Analysis** – Deeper insights into learning speed.
- **Revision Frequency Tracker** – Encourage spaced repetition.

### 👥 Peer-Based Engagement
- **Most Asked Questions** – View common doubts from learners.
- **Leaderboard & Peer Learning** – Track trends and top performers.

### 🧩 Gamification & Habit Building
- **Daily Challenges & Streaks** – Motivate consistent study.
- **Collaborative Projects** – Team-based assignments & peer reviews.
- **Real-Time Progress Heatmaps** – Immediate feedback visuals.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js + Tailwind CSS
- **Authentication**: Firebase 
- **Database**: Firebase Firestore
- **AI Services**: **Gemini API (by Google)**
- **State Management**: Redux / Zustand
- **Video Processing**: Client-side Interaction Tracking
  
##Folder Structure
- personalized-learning-app
┣ components
┣ pages
┣ utils
┣ firebase
┣ styles
┣ data
┗ README.md

---
## 🔧 Setup Instructions

1. **Clone the repository**
   git clone https://github.com/yourusername/personalized-learning-app.git
   cd personalized-learning-app

2.Install dependencies
  npm install

3.Set up Firebase
  -Go to Firebase Console
  -Create a new project or use an existing one.
  -Enable Authentication (Phone & Email/Password).
  -Enable Firestore Database.
  -Copy your Firebase config and create a .env.local file in the root directory:
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

4.Set up Gemini API
  -Go to Google AI Studio
  -Generate an API Key from the API Keys section.
  -Add it to your .env.local file:
    -GEMINI_API_KEY=your_gemini_api_key

5.Run the development server
  -npm run dev
 
