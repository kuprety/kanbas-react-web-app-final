import React, { useState, useEffect } from "react";
import {
  BsFillCheckCircleFill, BsPencil,
  BsTrash3Fill, BsPlusCircleFill,
} from "react-icons/bs";

import * as client from "./client";
import { Quiz } from "./client";
export default function QuizTable() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quiz, setQuiz] = useState<Quiz>({
    _id: "", name:"", course: "", title: "",
    description: "", quizType: "", points: 0, assignmentGroup: "Quizzes", shuffleAnswers: true,
    timeLimit: 20, multipleAttempts: false, showCorrectAnswers: false, accessCode: "", oneQuestionAtATime: true,
    webcamRequired: false, lockQuestionsAfterAnswering: false, dueDate: new Date("2024-06-20"), availableDate: new Date(), untilDate: new Date("2024-06-20") });

    const selectQuiz = async (quiz: Quiz) => {
      try {
        const q = await client.findQuizById(quiz._id);
        setQuiz(q);
      } catch (err) {
        console.log(err);
      }
    };
    const updateQuiz = async () => {
      try {
        const status = await client.updateQuiz(quiz);
        setQuizzes(quizzes.map((q) =>
          (q._id === quiz._id ? quiz : q)));
      } catch (err) {
        console.log(err);
      }
    };
  
    
    const createQuiz = async () => {
        try {
          const newQuiz = await client.createQuiz(quiz);
          setQuizzes([newQuiz, ...quizzes]);
        } catch (err) {
          console.log(err);
        }
      };
    
    const fetchQuizzes = async () => {
    const quizzes = await client.findAllQuizzes();
    setQuizzes(quizzes);
  };

  const deleteQuiz = async (quiz: Quiz) => {
    try {
      await client.deleteQuiz(quiz);
      setQuizzes(quizzes.filter((q) => q._id !== quiz._id));
    } catch (err) {
      console.log(err);
    }
  };

  

  useEffect(() => { fetchQuizzes(); }, []);
  return (
    <div>
      <h1>Quiz Table</h1>
      <table className="table">
        <thead>
          <tr>
            <td>
            <tr> Quiz Name </tr>
            <div className="row">
  <div className="col">
    <input 
      value={quiz.name} 
      className="form-control mx-100" 
      style={{ width: '200px' }} 
      onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
    />
  </div>
  <td>
  <tr> Description </tr>

  <div className="col">
    <input 
      value={quiz.description} 
      className="form-control mx-100" 
      style={{ width: '200px' }} 
      onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
    />
    
  </div>
  </td>
</div>

            </td>
            <td>
            <tr> Points </tr>
              <input value={quiz.points} className="form-control" style={{ width: '200px'}} onChange={(e) =>
                setQuiz({ ...quiz, points: parseFloat(e.target.value) })}/>
            </td>
            <td>
            <tr> Due Date </tr>
              <input value={quiz.dueDate instanceof Date ? quiz.dueDate.toISOString().split('T')[0] : quiz.dueDate} className="form-control" style={{ width: '200px'}} onChange={(e) =>
                setQuiz({ ...quiz, dueDate: new Date(e.target.value) })}/>
            </td>
            <td>
            <tr> Assignment Group </tr>

              <select value={quiz.assignmentGroup} className="form-select" style={{ width: '200px', marginTop: "10px" }} onChange={(e) =>
                setQuiz({ ...quiz, assignmentGroup: e.target.value })}>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECT">Project</option>
              </select>
            </td>
            <td>
            <BsFillCheckCircleFill
      onClick={updateQuiz}
      className="me-2 text-success fs-1 text"
    />
    <BsPlusCircleFill
      onClick={createQuiz}
      className="text-success fs-1 text"
    />
                </td>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz: any) => (
            <tr key={quiz._id}>
              <td>{quiz.name}</td>
              {/* <td>{user.firstName}</td>
              <td>{user.lastName}</td> */}
              <td>
                <button onClick={() => deleteQuiz(quiz)} className="btn btn-danger">
                  <BsTrash3Fill />
                </button>
                <button className="btn btn-warning me-2" style={{marginLeft: "10px"}}>
      <BsPencil onClick={() => selectQuiz(quiz)} />
    </button>

              </td>

            </tr>))}
        </tbody>
      </table>
    </div>
  );
}
