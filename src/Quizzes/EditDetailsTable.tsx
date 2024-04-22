import React, { useState, useEffect } from "react";
import { QuizQuestions } from "../QuizQuestions/client";

import {
  BsFillCheckCircleFill, BsPencil,
  BsTrash3Fill, BsPlusCircleFill,
} from "react-icons/bs";

import * as client from "./client";
import { Quiz } from "./client";
import { Link, useLocation, useParams } from "react-router-dom";
export default function DetailsTable() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quiz, setQuiz] = useState<Quiz>({
    _id: "", published: false, name: "", course: "", title: "",
    description: "", quizType: "", points: 0, assignmentGroup: "Quizzes", shuffleAnswers: true,
    timeLimit: 20, multipleAttempts: false, showCorrectAnswers: false, accessCode: "", oneQuestionAtATime: true,
    webcamRequired: false, lockQuestionsAfterAnswering: false, dueDate: new Date("2024-06-20"), availableDate: new Date(), untilDate: new Date("2024-06-20")
  });


  const { CourseName } = useParams();
  const { pathname } = useLocation();
  const [timeLimitChecked, setTimeLimitChecked] = useState(false);

  const handleTimeLimitChange = () => {

    setTimeLimitChecked(!timeLimitChecked);

  };

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

  const { quizId } = useParams();


  useEffect(() => {
    fetchQuizzes();

    setTimeLimitChecked(true);
  }, []);
    
  return (
    <div>
      <div style={{ marginTop: "15px" }} />

      <p className="points">Points 0</p>

      <nav className="nav nav-tabs mt-2">
        <div className={`nav-link ${pathname.includes("Details/Editor") ? "active" : ""}`}>
          Details
        </div>
        <Link to={`../Quizzes/${quizId}/Questions`} className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`}>
  Questions
</Link>

      </nav>

      <div style={{ marginTop: "25px" }} />

      <input
        value={quiz.name}
        className="form-control small-width-input"
        placeholder="Unnamed Quiz"

        onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}

      />


      <div style={{ marginTop: "30px" }} />
      <p>Quiz Instructions:</p>
      <textarea
        value={quiz.description}
        className="form-control textarea-width"
        onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
        rows={3}></textarea>


      <div style={{ marginTop: "90px" }} />

      <p>Options</p>
      <div className="row">
        <div className="col-auto">
          <p className="mb-0 quiz-type" style={{ marginTop: "15px" }}>Quiz Type</p>
        </div>
        <div className="col-auto">


          <select value={quiz.quizType} className="form-select" aria-label="Quiz Type" style={{ width: '200px', marginTop: "10px" }} onChange={(e) =>
            setQuiz({ ...quiz, quizType: e.target.value })}>
            <option value="GRADED-QUIZ" selected>Graded Quiz</option>
            <option value="PRACTICE-QUIZ">Practice Quiz</option>
            <option value="GRADED-SURVEY">Graded Survey</option>
            <option value="PRACTICE-SURVEY">Practice Survey</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: "20px" }} />

      <div className="row">
        <div className="col-auto">
          <p className="mb-0 assignment-group" style={{ marginTop: "15px" }}>Assignment Group</p>
        </div>
        <div className="col-auto">
          <select value={quiz.assignmentGroup} className="form-select" style={{ width: '200px', marginTop: "10px" }} onChange={(e) =>
            setQuiz({ ...quiz, assignmentGroup: e.target.value })}>
            <option value="QUIZZES">Quizzes</option>
            <option value="EXAMS">Exams</option>
            <option value="ASSIGNMENTS">Assignments</option>
            <option value="PROJECT">Project</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: "20px" }} />

      <div className="row options">
        <div className="col-auto">
          <label className="checkbox-container">
            <input
              value={quiz.timeLimit}
              type="checkbox"
              checked={timeLimitChecked}
              onChange={(e) => setQuiz({ ...quiz, timeLimit: parseFloat(e.target.value) })} />
            Time Limit
          </label>
        </div>
        {timeLimitChecked && (
          <div className="col-auto">
            <div className="row">
              <div className="col-auto">
                <input
                  value={quiz.timeLimit}
                  type="number"
                  className="form-control width-minutes"
                  defaultValue={20}
                  onChange={(e) =>
                    setQuiz({ ...quiz, timeLimit: parseFloat(e.target.value) })} />
              </div>
              <div className="col-auto">
                <p className="mb-0">Minutes</p>
              </div>
            </div>
          </div>
        )}
        <label>
          <input
            type="checkbox"
            checked={quiz.multipleAttempts}
            onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
          />
          Allow multiple attempts
        </label>

        <div style={{ marginTop: "10px" }} />


        <div className="row">
          <div className="col-auto">
            <p
              className="mb-0 quiz-type"
              style={{ marginTop: "7px" }}>Access code: </p>



          </div>
          <div className="col-auto">
            <input
              value={quiz.accessCode}
              className="form-control small-width-input"

              onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}

            />
          </div>

        </div>

        <div style={{ marginTop: "10px" }} />


        <label className="checkbox-container">

          {/* value={quiz.accessCode}
              className="form-control small-width-input"

              onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })} */}

          <input
            type="checkbox"
            checked={quiz.oneQuestionAtATime}
            onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
          /> One Question at a Time

        </label>


        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={quiz.webcamRequired}
            onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
          />
          Webcam Required
        </label>
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={quiz.lockQuestionsAfterAnswering}
            onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
          />
          Lock Questions After Answering
        </label>

        <div style={{ marginTop: "40px" }} />

        <p>Due</p>
        <input 
         value={quiz.dueDate instanceof Date ? quiz.dueDate.toISOString().split('T')[0] : quiz.dueDate} 
         className="form-control small-width-input"
         type="date"
          style={{ width: '200px' }} onChange={(e) =>
          setQuiz({ ...quiz, dueDate: new Date(e.target.value) })} />

        <div style={{ marginTop: "20px" }} />

        <div className="row">
          <div className="col-auto">
            <p>Available from</p>
            <input 
         value={quiz.availableDate instanceof Date ? quiz.availableDate.toISOString().split('T')[0] : quiz.availableDate} 
         className="form-control small-width-input"
         type="date"
          style={{ width: '200px' }} onChange={(e) =>
          setQuiz({ ...quiz, availableDate: new Date(e.target.value) })} />          </div>
          <div className="col-auto">
            <p>Until</p>
            <input 
         value={quiz.untilDate instanceof Date ? quiz.untilDate.toISOString().split('T')[0] : quiz.untilDate} 
         className="form-control small-width-input"
         type="date"
          style={{ width: '200px' }} onChange={(e) =>
          setQuiz({ ...quiz, untilDate: new Date(e.target.value) })} />            </div>
        </div>

      </div>

      <div style={{ marginBottom: "40px" }} />

      <div className="buttons-saving-quiz-details">
      <Link to="../Quizzes">
        <button type="button" className="btn btn-light individual-buttons-saving" style={{ width: "auto" }}>Cancel</button>
        </Link>
    <button  onClick={createQuiz} type="button" className="btn btn-light individual-buttons-saving" style={{ width: "auto" }}>Save & Publish</button>
        <button type="button" onClick={updateQuiz} className="btn btn-primary individual-buttons-saving" style={{ width: "auto" }}>Save</button>
      </div>
      <div style={{ marginBottom: "40px" }} />


      <table>

      <tbody>


          {quizzes.map((quiz: any) => (
            <tr key={quiz._id}>
              <td>{quiz.name}</td>
              <td>{quiz.description}</td>
              <td>{quiz.type}</td>
              <td>{quiz.assignmentGroup}</td>
              <td>{quiz.timeLimit}</td>
              <td>{quiz.multipleAttempts}</td>
              <td>{quiz.oneQuestionAtATime}</td>
              <td>{quiz.webcamRequired}</td>
              <td>{quiz.lockQuestionsAfterAnswering}</td>
              <td>{quiz.dueDate}</td>
              <td>{quiz.availableDate}</td>
              <td>{quiz.untilDate}</td>

              <td>
                <button onClick={() => deleteQuiz(quiz)} className="btn btn-danger">
                  <BsTrash3Fill />
                </button>
                <button className="btn btn-warning me-2" style={{ marginLeft: "10px" }}>
                  <BsPencil onClick={() => selectQuiz(quiz)} />
                </button>

              </td>

            </tr>))}
        </tbody>
      </table>


    </div>


  );
}

