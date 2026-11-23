import { ref, push, set, get } from "firebase/database";
import { database } from "../firebaseConfig";

export async function saveQuestion(questionData) {
  const questionRef = push(ref(database, "quizQuestions"));
  await set(questionRef, questionData);
}

export async function getQuestions() {
  const questionsRef = ref(database, "quizQuestions");
  const snapshot = await get(questionsRef);

  if (snapshot.exists()) {
    return Object.entries(snapshot.val()).map(([id, data]) => ({
      id,
      ...data,
    }));
  }

  return [];
}