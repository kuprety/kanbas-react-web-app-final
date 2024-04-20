import * as client from "./client";

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./style.css";
import { FaPlus, FaSearch } from "react-icons/fa";
import { quiz } from "./client";

function QuizDetailsEditor() {
  const { CourseName } = useParams();
  const { pathname } = useLocation();
  const [timeLimitChecked, setTimeLimitChecked] = useState(false);

  const handleTimeLimitChange = () => {
    setTimeLimitChecked(!timeLimitChecked);
  };

  const navigate = useNavigate();
  const fetchProfile = async () => {

  };


  useEffect(() => {
      fetchProfile();
  }, []);
  const save = async () => {
      await client.updateQuiz(quiz);
  };

  return (
    <div>
              <div style={{ marginTop: "15px" }} />

      <p className="points">Points 0</p>

      <nav className="nav nav-tabs mt-2">
        <div className={`nav-link ${pathname.includes("Details/Editor") ? "active" : ""}`}>
          Details
        </div>
        <Link to="../Quizzes/Questions" className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`}>
          Questions
        </Link>
      </nav>

      <div style={{ marginTop: "25px" }} />

      <input className="form-control small-width-input" placeholder="Unnamed Quiz" />

      <div style={{ marginTop: "30px" }} />
      <p>Quiz Instructions:</p>
      <textarea className="form-control textarea-width" rows={3}></textarea>

      <div style={{ marginTop: "90px" }} />

      <p>Options</p>
      <div className="row">
        <div className="col-auto">
          <p className="mb-0 quiz-type">Quiz Type</p>
        </div>
        <div className="col-auto">
          <select className="form-select" aria-label="Quiz Type">
            <option value="GRADED-QUIZ" selected>Graded Quiz</option>
            <option value="PRACTICE-QUIZ">Practice Quiz</option>
            <option value="GRADED-SURVEY">Graded Survey</option>
            <option value="PRACTICE-SURVEY">Practice Survey</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: "20px" }} />

      <div className="row">
        <div className="col-auto">
          <p className="mb-0 assignment-group">Assignment Group</p>
        </div>
        <div className="col-auto">
          <select className="form-select" aria-label="Assignment Group">
            <option value="ASSIGNMENT-GROUP-DEFAULT" selected>QUIZZES</option>
            <option value="ASSIGNMENT-GROUP-EXAMS">EXAMS</option>
            <option value="ASSIGNMENT-GROUP-ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="ASSIGNMENT-GROUP-PROJECT">PROJECTS</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: "20px" }} />

      <div className="row options">
        <div className="col-auto">
          <label className="checkbox-container">
            <input type="checkbox" checked={timeLimitChecked} onChange={handleTimeLimitChange} /> Time Limit
          </label>
        </div>
        {timeLimitChecked && (
          <div className="col-auto">
            <div className="row">
              <div className="col-auto">
                <input type="number" className="form-control width-minutes" defaultValue={20} />
              </div>
              <div className="col-auto">
                <p className="mb-0">Minutes</p>
              </div>
            </div>
          </div>
        )}

        <label className="checkbox-container">
          <input type="checkbox" /> Allow multiple attempts
        </label>

        <div style={{ marginTop: "10px" }} />


        <div className="row">
        <div className="col-auto">
            <p className="mb-0">Access code:</p>
          </div>
          <div className="col-auto">
            <input type="number" className="form-control width-access-code"/>
          </div>

        </div>

        <div style={{ marginTop: "10px" }} />


        <label className="checkbox-container">
          <input type="checkbox" checked/> One Question at a Time
        </label>


        <label className="checkbox-container">
          <input type="checkbox" /> Webcam Required
        </label>
        <label className="checkbox-container">
          <input type="checkbox" /> Lock Questions After Answering
        </label>

        <div style={{ marginTop: "40px" }} />

        <p>Due</p>
        <input className="form-control small-width-input" type="date"/>

        <div style={{ marginTop: "20px" }} />

        <div className="row">
  <div className="col-auto">
    <p>Available from</p>
    <input className="form-control small-width-input-half" type="date"/>
  </div>
  <div className="col-auto">
    <p>Until</p>
    <input className="form-control small-width-input-half" type="date"/>
  </div>
</div>


<div style={{ marginBottom: "40px" }} />

<div className="buttons-saving-quiz-details">
<Link to="../Quizzes">
<button type="button" className="btn btn-light individual-buttons-saving" style={{ width: "auto" }}>Cancel</button>
</Link>

<button type="button" onClick={save} className="btn btn-light individual-buttons-saving" style={{ width: "auto" }}>Save & Publish</button>


<button type="button" className="btn btn-primary individual-buttons-saving" style={{ width: "auto" }}>Save</button>


</div>
<div style={{ marginBottom: "40px" }} />

      </div>
    </div>
  );
}

export default QuizDetailsEditor;
