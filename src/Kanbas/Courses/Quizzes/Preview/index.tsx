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


            <h1>{quiz.name}</h1>
          <div className="previewWarning">
          <p> <BsExclamationCircle/> This is a preview of the published version</p>
            </div>  
            <h1 style={{fontSize: "36pt", marginTop: "20px"}}>Quiz Instructions</h1>
            <div className="container">
                <h4>{quizQuestions.questionTitle}</h4>
                    <p>{quizQuestions.question}</p>
                    <p>Quiz question goes here</p>
                    </div>
                    <table>
<tbody>
    {quizzesQuestions.map((quizQuestions: any) => (
      <tr key={quizQuestions._id}>
        <td>{quizQuestions.quizId}</td>
        <td>{quizQuestions.type}</td>
        <td>{quizQuestions.questionTitle}</td>
        <td>{quizQuestions.question}</td>
        <td>{quizQuestions.choices}</td>
        <td>{quizQuestions.correctAnswer}</td>
        <td>{quizQuestions.possibleAnswers}</td>
        <td>{quizQuestions.points}</td>
      </tr>))}
  </tbody>
</table>

                    <div style={{ marginTop: "100px" }} />


 


            <div style={{ marginTop: "50px" }} />


            <div className="submitQuiz">
          <button className="btn btn-danger individual-button-question"> Submit Quiz</button>
            </div>  
            <div style={{ marginTop: "100px" }} />


            <div className="keepEditing">
            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions/QuestionEditor`}>
          <p> <BsPencil/> Keep Editing This Quiz</p>
          </Link>
            </div>  


        </div>
    )
}
export default QuizPreview;