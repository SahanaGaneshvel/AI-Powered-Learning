import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// Initialize progress for a new course
export const initializeProgress = async (userId, courseId) => {
  try {
    const progressRef = doc(db, `users/${userId}/progress/${courseId}`);
    const progressSnapshot = await getDoc(progressRef);

    if (!progressSnapshot.exists()) {
      await setDoc(progressRef, { completion: 0 });
      console.log(`Initialized progress for ${courseId}`);
    }
  } catch (error) {
    console.error("Error initializing progress:", error);
  }
};

// Get the progress of a user for a specific course
export const getProgress = async (userId, courseId) => {
  if (!userId || !courseId) return null;
  try {
    const progressRef = doc(db, `users/${userId}/progress/${courseId}`);
    const progressSnapshot = await getDoc(progressRef);

    if (progressSnapshot.exists()) {
      return progressSnapshot.data().completion;
    } else {
      return 0; // Default progress
    }
  } catch (error) {
    console.error("Error fetching progress:", error);
    return null;
  }
};

// Update progress
export const updateProgress = async (userId, courseId, newProgress) => {
  try {
    const progressRef = doc(db, `users/${userId}/progress/${courseId}`);
    await updateDoc(progressRef, { completion: newProgress });
    console.log(`Updated progress for ${courseId}: ${newProgress}%`);
  } catch (error) {
    console.error("Error updating progress:", error);
  }
};
