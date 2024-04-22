import React from "react";
import { Link, useParams } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import QuizQuestionsTable from "../../../../../QuizQuestions/Table";

export default function Quizzes() {
  return (
    <div className="container-fluid">
<QuizQuestionsTable />
    </div>
  );
}