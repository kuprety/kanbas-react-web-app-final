import React, { useState, useEffect } from "react";
import './index.css';
// import { QuizQuestions } from "../../../../QuizQuestions/client";
import { QuizQuestions } from "./questionsclient";

import * as client from "./client";
import { Link, useParams } from "react-router-dom";
import { Quiz } from "./client";
import {
    BsExclamationCircle, BsPencil
  } from "react-icons/bs";
  


function QuizPreview() {


    const handlePublishToggle = async () => {
        try {
            const updatedQuiz = { ...quiz, published: !quiz.published };
            const status = await client.updateQuiz(updatedQuiz);
            setQuiz(updatedQuiz);
        } catch (error) {
            console.error("Error toggling publish status:", error);
        }
    };

    const { quizId } = useParams<{ quizId:any }>();
    const { courseId } = useParams<{ courseId:any }>();

  
    const [quiz, setQuiz] = useState<Quiz>({
        _id: "", published: false, name:"", course: "", title: "",
        description: "", quizType: "", points: 0, assignmentGroup: "Quizzes", shuffleAnswers: true,
        timeLimit: 20, multipleAttempts: false, showCorrectAnswers: false, accessCode: "", oneQuestionAtATime: true,
        webcamRequired: false, lockQuestionsAfterAnswering: false, dueDate: new Date("2024-06-20"), availableDate: new Date(), untilDate: new Date("2024-06-20") });

        const fetchQuiz = async () => {
            console.log("hello " + quizId);
                //const id = quizId ?? ""; // Use an empty string if quizId is undefined
                const fetchedQuiz = await client.findQuizById(quizId);
                setQuiz(fetchedQuiz);
        };



  
    const [quizzesQuestions, setQuizzesQuestions] = useState<QuizQuestions[]>([]);
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestions>({
        _id: "",
        quizId: "",
        type: "multipleChoice",
        questionTitle: "",
        question: "", // Initialize as a string literal
        choices: [],
        correctAnswer: "",
        possibleAnswers: [],
        points: 0,
    });


    const fetchQuizzesQuestions = async () => {
      const quizzessQuestions = await client.findAllQuizzesQuestions();
      setQuizzesQuestions(quizzessQuestions);
    };
        
        
    useEffect(() => { fetchQuiz(); }, [quizId]);

    useEffect(() => { fetchQuizzesQuestions(); }, []);


        


    return (
        <div>

<div style={{ marginTop: "20px" }} />

            <h1>{quiz.name}</h1>
          <div className="previewWarning">
          <p> <BsExclamationCircle/> This is a preview of the published version</p>
            </div>  
            <h1 style={{fontSize: "36pt", marginTop: "20px"}}>Quiz Instructions</h1>
                    <table>
                      
<tbody>
<div style={{ marginTop: "20px" }} />

    {quizzesQuestions.map((quizQuestions: any) => (
      <tr key={quizQuestions._id}>
        <div className="entireQuestion">
        <div  className="quizTitlePoints">
        <td className="questionTitle"> <p>{quizQuestions.questionTitle}</p></td>
        <td className="points"><p>{quizQuestions.points} pts</p></td>

        </div>
   
        <td className="actualQuestion"><p>{quizQuestions.question}</p></td>
        {quizQuestions.type === "trueFalse" && (
  <div className="questionButtons">
    <div>
      <input
        className="form-check-input"
        type="radio"
        id="true"
        name="trueFalse"
        value="true"
      />
      <label htmlFor="true" className="questionLabel">True</label>
    </div>

    <div>
      <input
        className="form-check-input"
        type="radio"
        id="false"
        name="trueFalse"
        value="false"
      />
      <label htmlFor="false" className="questionLabel">False</label>
    </div>
  </div>
)}

{quizQuestions.type === "fillInTheBlank" && (
          <div className="form-group fillBlankTextArea">
          <textarea
            className="form-control"
            rows={2}>

            </textarea>
            </div>
)}


{quizQuestions.type === "multipleChoice" && (
  <div>
    {quizQuestions.choices.map((choice : any, index : any) => (
      <div key={index} className="form-group questionButtons">
        <input
          className="form-check-input"
          type="radio"
          id={`choice-${index}`}
          name="choicesGroup"
          value={choice}
        />
        <label className="questionLabel">{choice}</label>
      </div>
    ))}
  </div>
)}




        {/* <td>{quizQuestions.possibleAnswers}</td> */}
        </div>
      </tr>))}

   
  </tbody>
</table>



 


            <div style={{ marginTop: "10px" }} />


            <div className="submitQuiz">
          <button className="btn btn-danger individual-button-question"> Submit Quiz</button>
            </div>  
            <div style={{ marginTop: "60px" }} />


            <div className="keepEditing">
            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`}>
          <p> <BsPencil/> Keep Editing This Quiz</p>
          </Link>
            </div>  

            <div style={{ marginTop: "30px" }} />

        </div>
    )
}
export default QuizPreview;