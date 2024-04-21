import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./style.css";
import DetailsTable from "../../../../../Quizzes/QuizDetails";
function QuizDetailsEditor() {
  const { CourseName } = useParams();
  const { pathname } = useLocation();
  const [timeLimitChecked, setTimeLimitChecked] = useState(false);

  const handleTimeLimitChange = () => {
    setTimeLimitChecked(!timeLimitChecked);
  };

  return (
    
      <div className="container-fluid">
    <DetailsTable />
 

      </div>
   
  );
}

export default QuizDetailsEditor;
