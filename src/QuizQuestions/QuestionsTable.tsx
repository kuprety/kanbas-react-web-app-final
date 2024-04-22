import React, { useState, useEffect } from "react";
import { QuizQuestions, createQuizQuestions } from "./client";

import {
  BsFillCheckCircleFill, BsPencil,
  BsTrash3Fill, BsPlusCircleFill,
} from "react-icons/bs";

import * as client from "../Quizzes/client";
import { Quiz } from "../Quizzes/client";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";



export default function QuestionsTable() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quiz, setQuiz] = useState<Quiz>({
    _id: "", name: "", course: "", title: "",
    description: "", quizType: "", points: 0, assignmentGroup: "Quizzes", shuffleAnswers: true,
    timeLimit: 20, multipleAttempts: false, showCorrectAnswers: false, accessCode: "", oneQuestionAtATime: true,
    webcamRequired: false, lockQuestionsAfterAnswering: false, dueDate: new Date("2024-06-20"), availableDate: new Date(), untilDate: new Date("2024-06-20")
  });


  

  const { CourseName } = useParams();
  const { pathname } = useLocation();
  const [timeLimitChecked, setTimeLimitChecked] = useState(false);

  const handleTimeLimitChange = () => {

    setTimeLimitChecked(!timeLimitChecked);

  };

  const selectQuiz = async (quiz: Quiz) => {
    try {
      const q = await client.findQuizById(quiz._id);
      setQuiz(q);
    } catch (err) {
      console.log(err);
    }
  };
  const updateQuiz = async () => {
    try {
      const status = await client.updateQuiz(quiz);
      setQuizzes(quizzes.map((q) =>
        (q._id === quiz._id ? quiz : q)));
    } catch (err) {
      console.log(err);
    }
  };

  

  const createQuiz = async () => {
    try {
      const newQuiz = await client.createQuiz(quiz);
      setQuizzes([newQuiz, ...quizzes]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchQuizzes = async () => {
    const quizzes = await client.findAllQuizzes();
    setQuizzes(quizzes);
  };

  const deleteQuiz = async (quiz: Quiz) => {
    try {
      await client.deleteQuiz(quiz);
      setQuizzes(quizzes.filter((q) => q._id !== quiz._id));
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    fetchQuizzes();

    setTimeLimitChecked(true);
  }, []);
    
  return (
    <div>
      <div style={{ marginTop: "15px" }} />

      <p className="points">Points 0</p>

      <div style={{ marginBottom: "100px" }} />


      <div className="buttons-questions">

     

          <button onClick={createQuizQuestions} type="button" className="btn btn-light individual-button-question" style={{ width: "auto" }}><FaPlus /> New Question</button>


        <button type="button" className="btn btn-light individual-button-question" style={{ width: "auto" }}><FaPlus /> New Question Group</button>
        <button type="button" className="btn btn-light individual-button-question" style={{ width: "auto" }}><FaSearch /> Find Questions</button>
      </div>




      <div style={{ marginBottom: "40px" }} />

<div className="buttons-saving-quiz-details">
<Link to="../Quizzes">
  <button type="button" className="btn btn-light individual-buttons-saving" style={{ width: "auto" }}>Cancel</button>
  </Link>
<button  onClick={createQuiz} type="button" className="btn btn-light individual-buttons-saving" style={{ width: "auto" }}>Save & Publish</button>
  <button type="button" onClick={updateQuiz} className="btn btn-primary individual-buttons-saving" style={{ width: "auto" }}>Save</button>
</div>
<div style={{ marginBottom: "40px" }} />


    </div>


  );
}

