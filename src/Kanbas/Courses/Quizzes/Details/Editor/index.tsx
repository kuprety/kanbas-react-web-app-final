import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./style.css";
import EditDetailsTable from "../../../../../Quizzes/EditDetailsTable";
import QuizDetails from "..";


function QuizDetailsEditor() {
  const { CourseName } = useParams();
  const { pathname } = useLocation();
  const [timeLimitChecked, setTimeLimitChecked] = useState(false);

  const handleTimeLimitChange = () => {
    setTimeLimitChecked(!timeLimitChecked);
  };

  return (
    
      <div className="container-fluid">
    <QuizDetails/>
 

      </div>
   
  );
}

export default QuizDetailsEditor;
