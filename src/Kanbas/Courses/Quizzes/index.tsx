import React from "react";
import { Link, useParams } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import QuizDetails from "./Details/Editor";
import QuizTable from "../../../Quizzes/Table";
import QuestionsTable from "../../../QuizQuestions/QuestionsTable";

export default function Quizzes() {
  return (
    <div className="container-fluid">
      <h1>QuizTable!!</h1>
      <QuestionsTable />
{/* <QuizTable /> */}
    </div>
  );
}