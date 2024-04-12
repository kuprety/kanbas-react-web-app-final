import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import QuizDetails from "./Details";

function Quizzes() {
  const { CourseName } = useParams();

  return (
    <div className="container-fluid">
      <h1>{ "Lal's code"}</h1>


    </div>
  );
}

export default Quizzes;
