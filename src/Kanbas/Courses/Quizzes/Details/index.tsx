import React, { useState, useEffect } from "react";

import * as client from "./client";
import { Quiz } from "./client";
//import { useParams, Link } from "react-router-dom";

import { Link, useParams } from "react-router-dom";

import './index.css';

function QuizDetails() {

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

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
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

        
    useEffect(() => { fetchQuiz(); }, [quizId]);



    // const handlePublishQuiz = async (quizId:number) => {
    //     const quizToUpdate = quizList.find(quiz => quiz._id === quizId);
    //     const updatedQuiz = { ...quizToUpdate };
    //     updatedQuiz.showCorrectAnswer = !updatedQuiz.showCorrectAnswer;
    //     const status = await client.updateQuiz(updatedQuiz);
    //     dispatch(updateQuiz(updatedQuiz)); //this is wrong
    //   };

    return (
        <div>

            <button onClick= {() => handlePublishToggle()}>{quiz.published ? "Unpublish" : "Publish"}</button>
            <button > <Link
                            to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Details/Editor`}>Quiz Editor</Link></button>
            <button > <Link
                            to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Preview`}>Preview</Link></button>


            
            <h1>Quiz Details:</h1>
        
        <div className="container details-container">
                    <p>Name: {quiz.name}</p>
                    <p>ID: {quiz._id}</p>
                    
                    <p>Quiz Type: {quiz.quizType}</p>
                    <p>Points: {quiz.points}</p>
                    <p>Assignment Group: {quiz.assignmentGroup}</p>
                    <p>Shuffle Answers: {quiz.shuffleAnswers ? "Yes" : "No"}</p>
                    <p>Time Limit: {quiz.timeLimit} minutes</p>
                    <p>Multiple Attempts Allowed: {quiz.multipleAttempts ? "Yes" : "No"}</p>
                    <p>Show Correct Answers: {quiz.showCorrectAnswers ? "Yes" : "No"}</p>
                    <p>Access Code: {quiz.accessCode}</p>
                    <p>One Question at a Time: {quiz.oneQuestionAtATime ? "Yes" : "No"}</p>
                    <p>Webcam Required: {quiz.webcamRequired ? "Yes" : "No"}</p>
                    <p>Lock Questions After Answering: {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</p>
                    <p>Due Date: {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : "N/A"}</p>
                    <p>Available Date: {quiz.availableDate ? new Date(quiz.availableDate).toLocaleDateString() : "N/A"}</p>
                    <p>Until Date: {quiz.untilDate ? new Date(quiz.untilDate).toLocaleDateString() : "N/A"}</p>
                    </div>
        
            
        </div>
    )
}
export default QuizDetails;