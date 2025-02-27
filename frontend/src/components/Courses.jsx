import { useState } from "react";

const courseData = [
  {
    id: 1,
    title: "Introduction to AI",
    description: "Learn the basics of Artificial Intelligence.",
    videos: [
      { title: "What is AI?", url: "https://www.youtube.com/embed/2ePf9rue1Ao" },
      { title: "AI Applications", url: "https://www.youtube.com/embed/kWmX3pd1f10" }
    ],
    content: "AI stands for Artificial Intelligence, which enables machines to think and act like humans."
  },
  {
    id: 2,
    title: "Python for Beginners",
    description: "Learn Python programming from scratch.",
    videos: [
      { title: "Python Basics", url: "https://www.youtube.com/embed/rfscVS0vtbw" },
      { title: "Python Data Types", url: "https://www.youtube.com/embed/N4mEzFDjqtA" }
    ],
    content: "Python is a powerful programming language used in AI, web development, and more."
  },
  {
    id: 3,
    title: "React for Web Development",
    description: "Learn how to build modern web applications using React.",
    videos: [
      { title: "React Basics", url: "https://www.youtube.com/embed/w7ejDZ8SWv8" },
      { title: "React State & Props", url: "https://www.youtube.com/embed/Oioo0IdoEls" }
    ],
    content: "React is a JavaScript library for building user interfaces, created by Facebook."
  }
];

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="p-4 bg-white text-black rounded shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>

      {!selectedCourse ? (
        <ul className="space-y-2">
          {courseData.map((course) => (
            <li
              key={course.id}
              className="p-3 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition"
              onClick={() => setSelectedCourse(course)}
            >
              {course.title}
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <button
            className="mb-2 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => setSelectedCourse(null)}
          >
            Back to Courses
          </button>

          <h3 className="text-xl font-semibold">{selectedCourse.title}</h3>
          <p className="text-gray-700">{selectedCourse.description}</p>

          <div className="mt-4">
            <h4 className="text-lg font-semibold">Videos:</h4>
            {selectedCourse.videos.map((video, index) => (
              <div key={index} className="mt-2">
                <p className="font-medium">{video.title}</p>
                <iframe
                  width="100%"
                  height="200"
                  src={video.url}
                  title={video.title}
                  allowFullScreen
                  className="rounded"
                ></iframe>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h4 className="text-lg font-semibold">Content:</h4>
            <p className="text-gray-800">{selectedCourse.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
