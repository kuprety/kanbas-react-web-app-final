import React, { useState, useEffect } from "react";

import {
  BsFillCheckCircleFill, BsPencil,
  BsTrash3Fill, BsPlusCircleFill,
} from "react-icons/bs";

import * as client from "../Quizzes/client";
import { Quiz } from "../Quizzes/client";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import QuizQuestionsTable from "./Table";



export default function QuestionsTable() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quiz, setQuiz] = useState<Quiz>({
    _id: "", published: false, name: "", course: "", title: "",
    description: "", quizType: "", points: 0, assignmentGroup: "Quizzes", shuffleAnswers: true,
    timeLimit: 20, multipleAttempts: false, showCorrectAnswers: false, accessCode: "", oneQuestionAtATime: true,
    webcamRequired: false, lockQuestionsAfterAnswering: false, dueDate: new Date("2024-06-20"), availableDate: new Date(), untilDate: new Date("2024-06-20")
  });


  const { quizId } = useParams();

  const { CourseName } = useParams();
  const { pathname } = useLocation();
  const [timeLimitChecked, setTimeLimitChecked] = useState(false);

  const [showComponent, setShowComponent] = useState(false);

const handleClick = () => {     setShowComponent(true);   };

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



  useEffect(() => {

    setTimeLimitChecked(true);
  }, []);
    
  return (
    <div>
        <div style={{ marginTop: "15px" }} />

<p className="points">Points 0</p>

<nav className="nav nav-tabs mt-2">
<Link to={`../Quizzes/${quizId}/Details/Editor`} className={`nav-link ${pathname.includes("Details/Editor") ? "active" : ""}`}>
          Details
</Link>


<div className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`}>
          Questions
        </div>

</nav>


<div style={{ marginTop: "25px" }} />

      <div className="buttons-questions">

     


   

            {/* <button onClick={handleClick} type="button" className="btn btn-light individual-button-question" style={{ width: "auto" }}><FaPlus /> New Question</button> */}

<QuizQuestionsTable />
      </div>




      <div style={{ marginBottom: "40px" }} />

<div className="buttons-saving-quiz-details">

<Link to='../Quizzes/${quizId}/Questions'>
  <button type="button" className="btn btn-light individual-buttons-saving" style={{ width: "auto" }}>Cancel</button>
  </Link>
<button  onClick={createQuiz} type="button" className="btn btn-light individual-buttons-saving" style={{ width: "auto" }}>Save & Publish</button>
  
  


  
  <button type="button" onClick={updateQuiz} className="btn btn-primary individual-buttons-saving" style={{ width: "auto" }}>Save</button>
</div>
<div style={{ marginBottom: "40px" }} />


    </div>


  );
}









