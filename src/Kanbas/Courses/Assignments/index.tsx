import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";

import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import "./index.css";
function Assignments() {
    const { courseId } = useParams();
    const assignmentList = assignments.filter(
        (assignment) => assignment.course === courseId);
    return (
        <>
               <div className="d-flex">
                <div id="wd-search-bar">
                <input id="text-fields-username" placeholder="Search for Assignment"/><br/>

                </div>
               <div>
                <button className="module-button">+ Group</button>
            </div>
            <div>
                <button className="module-button" style={{ backgroundColor: "rgb(206, 0, 0)", color: "white", border: "1px solid rgb(206, 0, 0)" }}>+ Assignment</button>
            </div>
            <div>
                <button className="module-button"><FaEllipsisV /></button>
            </div>
</div>


            <ul className="list-group wd-modules">
                <li className="list-group-item wd-modules-container">
                    <div className="wd-margin-bot-10 wd-bold-font">
                        <FaEllipsisV className="me-2" />
                        ASSIGNMENTS
                        <span className="float-end">
                            <FaCheckCircle className="text-success" />
                            <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
                        </span>
                    </div>
                    <ul className="list-group">
                        {assignmentList.map((assignment) => (
                            <li className="list-group-item wd-green-left-border">
                                <FaEllipsisV className="me-2" />
                                <MdEditDocument className="wd-document-icon" />
                                <Link
                                    to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}</Link>
                                <br />
                                <span id="assignment-description"><a> Multiple Modules </a> |  Due Sep 18 at 11:59pm  |  100 pts </span>
                                <span className="float-end">
                                    <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></span>
                            </li>))}
                    </ul>
                </li>
            </ul>
        </>
    );
}
export default Assignments;