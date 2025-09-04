import { db } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

async function addMood(items) {
  try {
    const docRef = await addDoc(collection(db, "moods"), items);
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

function listenMoods(callback) {
  const q = query(collection(db, "moods"), orderBy("date", "desc"));
  return onSnapshot(q, (snapshot) => {
    const moods = [];
    snapshot.forEach((doc) => {
      moods.push({ id: doc.id, ...doc.data() });
    });
    callback(moods);
  });
}

async function deleteMood(id) {
  try {
    await deleteDoc(doc(db, "moods", id));
    console.log(`Mood dengan id ${id} dihapus`);
  } catch (error) {
    console.error("Gagal hapus mood:", error);
    throw error;
  }
}

async function deleteOldMoods(days = 3, moods) {
  const now = new Date();
  const cutoff = now.setDate(now.getDate() - days);

  for (const mood of moods.value) {
    let moodDate = mood.date;

    // Ubah Firestore Timestamp ke Date
    if (moodDate?.seconds) {
      moodDate = new Date(moodDate.seconds * 1000);
    } else {
      moodDate = new Date(moodDate);
    }

    // Hapus kalau lebih lama dari cutoff
    if (moodDate.getTime() < cutoff) {
      await deleteMood(mood.id);
    }
  }
}

export { addMood, getMood, deleteOldMoods, deleteMood, listenMoods };
