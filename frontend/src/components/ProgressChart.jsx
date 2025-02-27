import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

export default function ProgressChart({ userId, courseId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!userId || !courseId) return;

    const fetchProgress = async () => {
      try {
        const docRef = doc(db, "progress", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const progressData = docSnap.data()[courseId] || {};
          const chartData = Object.keys(progressData).map((topic, index) => ({
            name: topic,
            value: progressData[topic],
            color: COLORS[index % COLORS.length],
          }));
          setData(chartData);
        }
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchProgress();
  }, [userId, courseId]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Progress Overview</h2>
      {data.length > 0 ? (
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      ) : (
        <p className="text-center text-gray-500">No progress data available.</p>
      )}
    </div>
  );
}
