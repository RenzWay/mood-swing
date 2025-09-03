import { db } from "@/firebase/firebase";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";

async function addMood(items) {
  try {
    const response = await addDoc(collection(db, "moods"), items);
    console.log(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getMood() {
  try {
    const response = await getDocs(collection(db, "moods"));
    const mood = [];
    response.forEach((doc) => {
      mood.push({ id: doc.id, ...doc.data() });
    });

    return mood;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { addMood,getMood };
