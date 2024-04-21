import React from "react";

import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaGlasses } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import "./index.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Details";
import Questions from "./Quizzes/Questions";
import Editor from "./Quizzes/Questions/Editor"
import QuizDetailsEditor from "./Quizzes/Details/Editor";
import { log } from "console";



function Courses({ courses }: { courses: any[]; }) {

    const API_BASE = process.env.REACT_APP_BASE_API_URL;
    //const API_BASE = 'http://localhost:4000/';

    //const API_BASE = "http://localhost:4000";
    //const API_BASE = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";
    console.log(API_BASE)
    
    const { courseId } = useParams();
     const COURSES_API = `${API_BASE}/api/courses`;
    //const COURSES_API = "http://localhost:4000/api/courses";

    console.log(COURSES_API)

    const [course, setCourse] = useState<any>({ _id: "" });
    const findCourseById = async (courseId?: string) => {
      const response = await axios.get(
        `${COURSES_API}/${courseId}`
      );
      setCourse(response.data);
    };
  
    const { pathname } = useLocation();

    const lastSegment = pathname.split('/').pop();
    useEffect(() => {
        findCourseById(courseId);
      }, [courseId]);
    
    return (
        <div>
                <h2 className="wd-courses-h2">
                    <HiMiniBars3 className="wd-courses-minibar"
                    /> Course {course?.name} 
                     <IoIosArrowForward/> {lastSegment}
                    <button id="student-view"><FaGlasses /> Student View</button>

                </h2>
       
            <CourseNavigation />
            <div>
                <div
                    className="overflow-y-scroll position-fixed bottom-0 end-0"
                    style={{ left: "320px", top: "50px" }} >
                    <Routes>
                    <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Piazza" element={<h1>Piazza</h1>} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
                        <Route path="Grades" element={<h1>Grades</h1>} />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Quizzes/Details" element={<QuizDetails />} />
                        <Route path="Quizzes/Details/Editor" element={<QuizDetailsEditor />} />
                        <Route path="Quizzes/Questions" element={<Questions />} />
                        <Route path="Quizzes/Questions/Editor" element={<Editor />} />
                    </Routes>
                </div>
            </div>
        </div>
    );


}
export default Courses;
