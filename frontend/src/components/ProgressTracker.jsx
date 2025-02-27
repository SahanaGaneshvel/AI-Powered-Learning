import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProgressTracker({ userId }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (!userId) return;
    const fetchScores = async () => {
      const userRef = doc(db, "quizScores", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setScores(userDoc.data().scores || []);
      }
    };
    fetchScores();
  }, [userId]);

  return (
    <div className="p-4 bg-white text-black rounded shadow-md">
      <h2 className="text-xl font-bold">Your Progress</h2>
      {scores.length > 0 ? (
        <ul>
          {scores.map((entry, index) => (
            <li key={index} className="p-2 border-b">{new Date(entry.date).toLocaleString()} - Score: {entry.score}/{entry.total}</li>
          ))}
        </ul>
      ) : (
        <p>No scores recorded yet.</p>
      )}
    </div>
  );
}
