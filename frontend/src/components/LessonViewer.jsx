import React from "react";

const LessonViewer = ({ lesson }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mt-4">
      <h3 className="text-lg font-bold">{lesson.title}</h3>
      <div className="mt-2">
        <iframe
          width="100%"
          height="315"
          src={lesson.videoUrl}
          title={lesson.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default LessonViewer;

