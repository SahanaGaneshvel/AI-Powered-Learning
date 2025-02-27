import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

export default function Quiz({ userId, onComplete }) {
  const allQuestions = [
    { question: "What is AI?", options: ["Artificial Intelligence", "Automated Input", "Auto Industry"], correct: "Artificial Intelligence" },
    { question: "Who developed Python?", options: ["Guido van Rossum", "Elon Musk", "Mark Zuckerberg"], correct: "Guido van Rossum" },
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Machine Learning", "Home Tool Multi Language"], correct: "Hyper Text Markup Language" },
    { question: "Which company owns Java?", options: ["Microsoft", "Sun Microsystems", "IBM"], correct: "Sun Microsystems" },
    { question: "What is React?", options: ["A JavaScript library", "A database", "A programming language"], correct: "A JavaScript library" }
  ];

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    setQuestions(shuffleArray(allQuestions)); // Shuffle questions when component loads
  }, []);

  const handleAnswer = async (answer) => {
    if (answer === questions[currentQuestionIndex].correct) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
      await saveScore(score + 1, questions.length);
      onComplete(score + 1, questions.length);
    }
  };

  const saveScore = async (finalScore, total) => {
    if (!userId) return;
    const userRef = doc(db, "quizScores", userId);

    try {
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        await setDoc(userRef, { scores: [] });
      }

      await updateDoc(userRef, {
        scores: arrayUnion({ date: new Date().toISOString(), score: finalScore, total: total }),
      });

      console.log("Score saved successfully.");
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  return (
    <div className="p-4 bg-white text-black rounded shadow-md">
      {!quizFinished ? (
        <>
          <h2 className="text-xl font-bold">{questions[currentQuestionIndex]?.question}</h2>
          {questions[currentQuestionIndex]?.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              className="block w-full p-2 mt-2 bg-blue-500 text-white rounded"
            >
              {option}
            </button>
          ))}
        </>
      ) : (
        <h2 className="text-xl font-bold">Quiz Completed! Score: {score}/{questions.length}</h2>
      )}
    </div>
  );
}
