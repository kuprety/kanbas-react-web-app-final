import React, { useState, useEffect } from "react";
// import { QuizQuestions } from "../../../../QuizQuestions/client";
import { QuizQuestions } from "./questionsclient";

import * as client from "./client";
import { Link, useLocation, useParams } from "react-router-dom";
import { Quiz } from "./client";
import {
    BsExclamationCircle, BsPencil
  } from "react-icons/bs";
import QuizQuestionsTable from "./Table";
import MultipleChoice from "./Table"
import TrueFalse from "./Table"
import FillInTheBlank from "./Table"
import { FaPlus, FaSearch } from "react-icons/fa";
  


  export default function QuestionsTable() {

    const [selectedType, setSelectedType] = useState("");

     
    //Changes the type from t/f to MC to FillInTheBlank:
    const handleTypeChange = (event:any) => {
      const selectedType = event.target.value;
      setSelectedType(selectedType);
      setQuizQuestions({ ...quizQuestions, type: selectedType });
    }


    
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


        const [showComponent, setShowComponent] = useState(false);

  
        const [quizzes, setQuizzes] = useState<Quiz[]>([]);

        
 const createQuiz = async () => {
  try {
    const newQuiz = await client.createQuiz(quiz);
    setQuizzes([newQuiz, ...quizzes]);
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


    const { pathname } = useLocation();



    const handleClick = () => {     setShowComponent(true);   };

    return (
        <div>


<div style={{ marginTop: "15px" }} />


<p className="points">Points 0</p>


<nav className="nav nav-tabs mt-2">
<Link to={`../Quizzes/${quizId}/Details/Editor`} className={`nav-link ${pathname.includes("Details/Editor") ? "active" : ""}`}>
         Details
</Link>




<div className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`}>
         Questions
       </div>


</nav>

<div style={{ marginTop: "25px" }} />

<div style={{ marginTop: "20px" }} />

<h1>Questions</h1>

                    <table>
                      
<tbody>
<div style={{ marginTop: "20px" }} />


    {quizzesQuestions.map((quizQuestions: any) => (
      
      <tr key={quizQuestions._id}>
        <div className="entireQuestionEditor">



<div className="container" style={{width: "1000px"}}>
 
 
  
 <div>
  
 <label>Name:</label>
 <textarea value={quizQuestions.questionTitle}
 className="form-control" placeholder="Question Title" rows={1}
 onChange={(e) => setQuizQuestions({ ...quizQuestions, questionTitle: e.target.value })}
 ></textarea>
 </div>
  
  
   <br></br>
  
  
   <div>
   <label>Points:</label>
  
  
 <input value={quizQuestions.points}
 type="number" className="form-control" placeholder="Point Amount" min="0"
 onChange={(e) => {
     const value = parseFloat(e.target.value);
     setQuizQuestions({
         ...quizQuestions,
         points: isNaN(value) ? 0 : value,
     });
 }}>
  
 </input>
 </div>
 <div style={{ marginTop: "30px" }} />
 
  <p>Enter your question text below</p>
            <h5>Question:</h5>
             <textarea
                 className="form-control"
                 placeholder="Enter Question Here"
                 rows={5}
                 value={quizQuestions.question}
                 onChange={(e) => setQuizQuestions({ ...quizQuestions, question: e.target.value })}
             ></textarea>
  
 <br></br>
  
 <div className="form-group">
   <select id="questionType" name="questionType" className="form-control" value={selectedType} onChange={handleTypeChange}>
     <option value="">Select...</option>
     <option value="multipleChoice">Multiple Choice</option>
     <option value="trueFalse">True/False</option>
     <option value="fillInTheBlank">Fill in the Blank</option>
   </select>
 </div>
  
 {/* Display different screen based on the select of question type: */}
 {selectedType === "multipleChoice" && <MultipleChoice/>}
 {selectedType === "trueFalse" && <TrueFalse />}
 {selectedType === "fillInTheBlank" && <FillInTheBlank />}
 {selectedType === ""}
  
  
  
  
 
  
  
 </div>


        {/* <td>{quizQuestions.possibleAnswers}</td> */}
        </div>
      </tr>))}

   
  </tbody>
</table>



 




            <div style={{ marginTop: "30px" }} />


            <div className="buttons-questions">


   




 


{/* <button onClick={handleClick} type="button" className="btn btn-light individual-button-question" style={{ width: "auto" }}><FaPlus /> New Question</button> */}


<Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions/QuestionEditor`}>
<button className="btn btn-light individual-button-question" type="button" onClick={handleClick} style={{ width: "auto" }}><FaPlus /> New Question</button>    


</Link>




{showComponent && <QuizQuestionsTable />}
<button type="button" className="btn btn-light individual-button-question" style={{ width: "auto" }}><FaPlus /> New Question Group</button>
<button type="button" className="btn btn-light individual-button-question" style={{ width: "auto" }}><FaSearch /> Find Questions</button>
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








        </div>

        
    )

    
}
