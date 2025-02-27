import React, { useState } from "react";
import courses from "../data/courses";

const CourseList = ({ onSelectCourse }) => {
  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-lg font-semibold mb-2">Available Courses</h2>
      {courses.map((course) => (
        <div key={course.id} className="p-3 border-b">
          <h3 className="text-md font-bold">{course.title}</h3>
          <p className="text-sm text-gray-600">{course.description}</p>
          <button
            onClick={() => onSelectCourse(course.id)}
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
          >
            Start Course
          </button>
        </div>
      ))}
    </div>
  );
};

export default CourseList;

