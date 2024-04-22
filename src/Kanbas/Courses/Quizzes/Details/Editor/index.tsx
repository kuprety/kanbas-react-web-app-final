import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./style.css";
import EditDetailsTable from "../../../../../Quizzes/EditDetailsTable";
function QuizDetailsEditor() {
  const { CourseName } = useParams();
  const { pathname } = useLocation();
  const [timeLimitChecked, setTimeLimitChecked] = useState(false);

  const handleTimeLimitChange = () => {
    setTimeLimitChecked(!timeLimitChecked);
  };

  return (
    
      <div className="container-fluid">
    <EditDetailsTable />
 

      </div>
   
  );
}

export default QuizDetailsEditor;
