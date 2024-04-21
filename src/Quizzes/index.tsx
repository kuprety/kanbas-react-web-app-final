import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import QuizDetails from "./Details/Editor";

function Quizzes() {
  const { CourseName } = useParams();

  return (
    <div className="container-fluid">
       <h1>jiiiiiii</h1>
      <h1>{ "Lal's codeeee"}</h1>


    </div>
  );
}

export default Quizzes;
