import React from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./style.css";
import { FaPlus, FaSearch } from "react-icons/fa";
import QuestionsTable from "../../../../QuizQuestions/QuestionsTable";

function Questions() {
  const { CourseName } = useParams();
  const { pathname } = useLocation();

  return (
    
          <div className="container-fluid">
<QuestionsTable />
    </div>
   );
}

export default Questions;


