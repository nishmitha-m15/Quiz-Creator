"use client";

import { useEffect, useState } from "react";
import { saveQuestion, getQuestions } from "./dbManager";

export default function QuizPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("Option A");
  const [questions, setQuestions] = useState([]);

  async function loadQuestions() {
    const data = await getQuestions();
    setQuestions(data);
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      question,
      optionA: options[0],
      optionB: options[1],
      optionC: options[2],
      optionD: options[3],
      answer,
    };

    try {
      await saveQuestion(data);
      alert("Question saved!");

      setQuestion("");
      setOptions(["", "", "", ""]);
      setAnswer("Option A");

      loadQuestions();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="quiz-container">
      <h1>Quiz Creator</h1>

      <form onSubmit={handleSubmit}>
        <label>Question</label>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          placeholder="Enter quiz question"
        />

        {options.map((option, index) => (
          <div key={index}>
            <label>Option {String.fromCharCode(65 + index)}</label>
            <input
              value={option}
              onChange={(e) => {
                const updated = [...options];
                updated[index] = e.target.value;
                setOptions(updated);
              }}
              required
              placeholder={`Enter Option ${String.fromCharCode(65 + index)}`}
            />
          </div>
        ))}

        <label>Correct Answer</label>
        <select
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        >
          <option>Option A</option>
          <option>Option B</option>
          <option>Option C</option>
          <option>Option D</option>
        </select>

        <button type="submit">Save Question</button>
      </form>

      <h2>Saved Questions</h2>

      {questions.map((q) => (
        <div className="question-card" key={q.id}>
          <h3>{q.question}</h3>
          <p>Option A: {q.optionA}</p>
          <p>Option B: {q.optionB}</p>
          <p>Option C: {q.optionC}</p>
          <p>Option D: {q.optionD}</p>
          <p><b>Correct Answer: {q.answer}</b></p>
        </div>
      ))}
    </div>
  );
}