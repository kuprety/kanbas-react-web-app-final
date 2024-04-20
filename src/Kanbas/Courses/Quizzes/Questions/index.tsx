import * as client from "./client";

import React, { useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./style.css";
import { FaPlus, FaSearch } from "react-icons/fa";
import { profile } from "../../../../Users/client";


function Questions() {
  const { CourseName } = useParams();
  const { pathname } = useLocation();


  const navigate = useNavigate();
  const fetchProfile = async () => {
      // const account = await client.profile();
      // setProfile(account);
      const save = async () => {
          await client.updateQuiz(profile);
      };
  };


  useEffect(() => {
      fetchProfile();
  }, []);
  const save = async () => {
      await client.updateQuiz(profile);
  };

  return (
    <div>
      <div style={{ marginTop: "15px" }} />

      <p className="points">Points 0</p>

      <div>
        <nav className="nav nav-tabs mt-2">

          <Link to="../Quizzes/Details/Editor"
            className={`nav-link ${pathname.includes("Details") ? "active" : ""}`}>Details
          </Link>


          <div
            className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`}>Questions

          </div>
        </nav>
      </div>
      <div style={{ marginBottom: "100px" }} />


      <div className="buttons-questions">

        <Link to="../Quizzes/Questions/Editor"
          className={` ${pathname.includes("Editor") ? "active" : ""}`}>

          <button type="button" className="btn btn-light individual-button-question" style={{ width: "auto" }}><FaPlus /> New Question</button>
        </Link>

      <button /* </div>onClick={addNewCourse} */ className="btn btn-primary">
        Add
      </button>
        <button type="button" className="btn btn-light individual-button-question" style={{ width: "auto" }}><FaPlus /> New Question Group</button>
        <button type="button" className="btn btn-light individual-button-question" style={{ width: "auto" }}><FaSearch /> Find Questions</button>
      </div>






      <div className="buttons-saving-quiz-details">
      <Link to="../Quizzes">
<button type="button" className="btn btn-light individual-buttons-saving" style={{ width: "auto" }}>Cancel</button>
        </Link>


        <button type="button" className="btn btn-light individual-buttons-saving" style={{ width: "auto" }}>Save & Publish</button>
        
        


        <button type="button" onClick={save} className="btn btn-primary individual-buttons-saving" style={{ width: "auto" }}>Save</button>
      </div>
      <div style={{ marginBottom: "40px" }} />




    </div>







  );
}

export default Questions;


