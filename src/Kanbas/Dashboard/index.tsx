import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import db from "../Database";
import {FaPencilAlt } from "react-icons/fa";


function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; }  
) {
  
  // const [courses, setCourses] = useState(db.courses);
  // const [course, setCourse] = useState({
  //   _id: "0", name: "New Course", number: "New Number",
  //   startDate: "2023-09-10", endDate: "2023-12-15",
  //   description: "New Description",
  //   image: "/images/reactjs.jpg"
  // });

  // const updateCourse = () => {
  //   setCourses(
  //     courses.map((c) => {
  //       if (c._id === course._id) {
  //         return course;
  //       } else {
  //         return c;
  //       }
  //     })
  //   );
  // };


  // const addNewCourse = () => {
  //   const newCourse = { ...course,
  //                       _id: new Date().getTime().toString() };
  //   setCourses([...courses, { ...course, ...newCourse }]);
  // };
  // const deleteCourse = (courseId: string) => {
  //   setCourses(courses.filter((course) => course._id !== courseId));
  // };
  
  return (
    <div className="rowing">
      <h1>Dashboard</h1>


      <h2>Published Courses (12)</h2> <hr />
      <h5>Course</h5>
      <input value={course.name} className="form-control"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <input value={course.number} className="form-control"
             onChange={(e) => setCourse({ ...course, number: e.target.value }) } />
        <input value={course.description} className="form-control"
             onChange={(e) => setCourse({ ...course, description: e.target.value }) }/>
      <input value={course.startDate} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, startDate: e.target.value }) }/>
      <input value={course.endDate} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />

      <button onClick={addNewCourse} className="btn btn-primary">
        Add
      </button>
      <button onClick={updateCourse} className="btn btn-secondary" style={{marginLeft: 10}}>
        Update
      </button>

      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
        {courses.map((course : any) => (
            <div key={course._id} className="col" style={{ width: "300px" }}>
              <div className="card">
                <img src={`/images/${course.image}`} className="card-img-top"
                     style={{ height: 150 }}/>
                <div className="card-body">
                  <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                    {course.name} 

                    </Link>
                  <p className="card-text">{course.number} | {course._id} | {course.startDate}</p> 
                  <p className="card-text">{course.description}</p>

                  <Link to={`/Kanbas/Courses/${course._id}/Edit`} className="wd-color-gray">
                  <button className="btn btn-light" onClick={(event) => {
                event.preventDefault();
                setCourse(course);
              }}>
                  <FaPencilAlt size="1em" />
            </button>

                  <button className="btn btn-primary" style={{marginLeft: 10}} onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }}>
                      Delete
                    </button>

                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;