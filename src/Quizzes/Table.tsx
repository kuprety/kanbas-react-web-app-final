import React, { useState, useEffect } from "react";


import {
  BsFillCheckCircleFill, BsPencil,
  BsTrash3Fill, BsPlusCircleFill,
  BsCheckCircleFill,
  BsXCircleFill,
} from "react-icons/bs";

import * as client from "./client";
import { Quiz } from "./client";


//---
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";

import { Link, useParams } from "react-router-dom";
//--


export default function QuizTable() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quiz, setQuiz] = useState<Quiz>({
    _id: "", published: false, name:"", course: "", title: "",
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

    // const createQuiz = async () => {
    //     try {
    //       const newQuiz = await client.createQuiz(quiz);
    //       setQuizzes([newQuiz, ...quizzes]);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };

    const createQuiz = async () => {
      try {
        const newQuiz = await client.createQuiz(quiz);
        setQuizzes([newQuiz, ...quizzes]);

        //try this?
        setCurrentQuiz(newQuiz._id);
  
      } catch (err) {
        console.log(err);
      }
    };



    
    
  //   const fetchQuiz = async (quiz:any) => {
  //   const quizzes = await client.findQuizById(quiz._id);
  //   setQuiz(quiz);
  // };

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

//new
const { courseId } = useParams();

  //dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
      setAnchorEl(null);
  };

  const handleClick = (event: any, clickedQuiz: Quiz) => {
    setAnchorEl(event.currentTarget);
    setCurrentQuiz(clickedQuiz._id);
    setCurrentQuizQ(clickedQuiz);
};

// const handlePublishToggle = async (quiz:any) => {
//   try {
//       const updatedQuiz = { ...quiz, published: !quiz.published };
//       const status = await client.updateQuiz(updatedQuiz);
//       setQuiz(updatedQuiz);
//   } catch (error) {
//       console.error("Error toggling publish status:", error);
//   }
// };

const handlePublishToggle = async (quiz: any) => {
  try {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updatedQuiz);
    setQuizzes(prevQuizzes =>
      prevQuizzes.map(q => (q._id === quiz._id ? updatedQuiz : q))
    );
  } catch (error) {
    console.error("Error toggling publish status:", error);
  }
};

const [currentQuiz, setCurrentQuiz] = useState<String>(String || null);
const [currentQuizQ, setCurrentQuizQ] = useState<Quiz>(quiz || null);
//added obvi
  //dr

  useEffect(() => { fetchQuizzes()}, []);

  return (
    <div>
          <div style={{ marginTop: "30px" }}></div>

      <table className="table">



            <td>


<button className="btn btn-danger" onClick={createQuiz }>
<Link to={`/Kanbas/Courses/${courseId}/Quizzes/${currentQuiz}Details/Editor`}>

    <BsPlusCircleFill className="" /> Add Quiz
    </Link>

</button>
<div style={{ marginTop: "20px" }}></div>


                </td>
            <th>&nbsp;</th>


        {'  '}
        <tbody>
          
          {quizzes.map((quiz: any) => (
            <tr key={quiz._id}>


              <td> <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}>{quiz.name}</Link>
              <br />
              <br />
            
              {quiz.availableDate && (
                <>
                  {new Date() > new Date(quiz.untilDate) && (
                    <p>Availability: Closed</p>
                  )}
                  {new Date() >= new Date(quiz.availableDate) &&
                    new Date() <= new Date(quiz.untilDate) && (
                      <p>Availability: Available</p>
                    )}
                  {new Date() < new Date(quiz.availableDate) && (
                    <p>Availability: Not available until {new Date(quiz.availableDate).toLocaleDateString()}</p>
                  )}
                </>
              )}
              
              {quiz.dueDate && <p>Due: {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : "N/A"}</p>}
              {quiz.points && <p>Points: {quiz.points}</p>}
              
              
              </td>
              
              <td>
                

              <button onClick= {() => handlePublishToggle(quiz)}>{quiz.published ? <BsCheckCircleFill/> : <BsXCircleFill/>}</button>

              {' '}
                <button onClick={() => deleteQuiz(quiz)} className="btn btn-danger">
                  <BsTrash3Fill />
                </button>
                <button className="btn btn-warning me-2" style={{marginLeft: "10px"}}>
                <BsPencil onClick={() => selectQuiz(quiz)} />

                
                </button>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleClick(event, quiz)
                      }>
                      Open Menu List
                    </Button>

                    <Menu
                        keepMounted
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        open={Boolean(anchorEl)}>

                          {currentQuizQ &&
                        <MenuItem  onClick={() => 
                        {selectQuiz(currentQuizQ)
                        handlePublishToggle(currentQuizQ)}}>
                        <button >{currentQuizQ.published ? "Unpublish" : "Publish"}</button>
                      </MenuItem>}
                          
                        
                        {currentQuizQ &&
                        <MenuItem
                        onClick={() => {
                          setCurrentQuizQ(currentQuizQ);
                          deleteQuiz(currentQuizQ);}
                          }>
                          Delete
                        </MenuItem>
                        }

                        {currentQuiz && 
                        <MenuItem 
                        onClick={() => {
                          setCurrentQuiz(currentQuiz);}}>
                          <Link
                            to={`/Kanbas/Courses/${courseId}/Quizzes/${currentQuiz}`}>Edit Screen</Link>
                        </MenuItem>}
                    </Menu>
                    
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}