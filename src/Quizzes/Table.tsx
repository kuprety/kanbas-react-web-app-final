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
import { QuizQuestions } from "../Kanbas/Courses/Quizzes/Preview/questionsclient";
//--


export default function QuizTable() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quiz, setQuiz] = useState<Quiz>({
    _id: "", published: false, name: "", course: "", title: "",
    description: "", quizType: "", points: 0, assignmentGroup: "Quizzes", shuffleAnswers: true,
    timeLimit: 20, multipleAttempts: false, showCorrectAnswers: false, accessCode: "", oneQuestionAtATime: true,
    webcamRequired: false, lockQuestionsAfterAnswering: false, dueDate: new Date("2024-06-20"), availableDate: new Date(), untilDate: new Date("2024-06-20")
  });

      //ADD THIS
      const defaultQuiz: Quiz = {
        _id: "Default Quiz", 
        published: false, 
        name: "Default Quiz", 
        course: "", 
        title: "Default Title", // Default title value
        description: "", 
        quizType: "Graded Quiz", 
        points: 0, 
        assignmentGroup: "Quizzes", 
        shuffleAnswers: true,
        timeLimit: 20, 
        multipleAttempts: false, 
        showCorrectAnswers: false, 
        accessCode: "", 
        oneQuestionAtATime: true,
        webcamRequired: false, 
        lockQuestionsAfterAnswering: false, 
        dueDate: new Date("2024-06-20"), 
        availableDate: new Date(), 
        untilDate: new Date("2024-06-20") 
    };
    

  //ADD THIS
  const createQuizDef = async () => {
    try {
      const newQuiz = await client.createQuiz(defaultQuiz);
      setQuizzes([newQuiz, ...quizzes]);
      const q = await client.findQuizById(newQuiz._id);
      setQuiz(q);
      selectQuiz(newQuiz);
      setCurrentQuiz(newQuiz._id);

    } catch (err) {
      console.log(err);
    }
  };

  //ADD THIS
const [clicked, setClicked] = useState(false);
const clickedTrue = () => {
  setClicked(true);
};

//ADD THIS
const handleDef = () => {
  setCurrentQuiz(currentQuiz);
  createQuizDef();
  clickedTrue();
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
  const { quizId } = useParams<{ quizId: any }>();

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
  const [quizzesQuestions, setQuizzesQuestions] = useState<QuizQuestions[]>([]);

  const [currentQuiz, setCurrentQuiz] = useState<String>(String || null);
  const [currentQuizQ, setCurrentQuizQ] = useState<Quiz>(quiz || null);
  //added obvi
  //dr

  const fetchQuiz = async () => {
    console.log("hello " + quizId);
    //const id = quizId ?? ""; // Use an empty string if quizId is undefined
    const fetchedQuiz = await client.findQuizById(quizId);
    setQuiz(fetchedQuiz);
  };


  const calculateTotalPoints = () => {
    let totalPoints = 0;
    quizzesQuestions.forEach((question: any) => {
      totalPoints += question.points;
    });
    console.log(totalPoints);
    return totalPoints;
  };

  const fetchQuizzesQuestions = async () => {
    const quizzessQuestions = await client.findAllQuizzesQuestions();
    setQuizzesQuestions(quizzessQuestions);
  };

  const [totalQuestions, setTotalQuestions] = useState(0);
 
  const calculateTotalQuestions = () => {
    let totalQuestions = 0;
    quizzesQuestions.forEach((question) => {
      totalQuestions += 1;
    });
    console.log(totalQuestions);
    return totalQuestions;
  };

  useEffect(() => { fetchQuizzes() }, []);
  // useEffect(() => { fetchQuiz(); }, [quizId]);

  useEffect(() => { fetchQuizzesQuestions(); }, []);


  return (
    <div>
      <div style={{ marginTop: "30px" }}></div>

      <table className="table">



        <td>

        {!clicked && (
        <button className="btn btn-danger" onClick={() => { handleDef();}}>
          Add Quiz
        </button>
      )}
      {clicked && (
        <Link className="btn btn-danger"
         to={`/Kanbas/Courses/${courseId}/Quizzes/${currentQuiz}/Details/Editor`}>
          Add Quiz
        </Link>
      )}


          <div style={{ marginTop: "20px" }}></div>


        </td>
        <th>&nbsp;</th>


        {'  '}
        <tbody>
          <h1>Assignment Quizzes</h1>
          <div style={{ marginTop: "15px" }}></div>

          {quizzes.map((quiz: any) => (
            <tr key={quiz._id}>


              <td> <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}> <p style={{fontSize: "16pt"}}>{quiz.name}</p></Link>

                {quiz.availableDate ? (
                  <>
                    {new Date() > new Date(quiz.untilDate) ? (
                      <p>Availability: Closed</p>
                    ) : new Date() >= new Date(quiz.availableDate) && new Date() <= new Date(quiz.untilDate) ? (
                      <p>Availability: Available</p>
                    ) : (
                      <p>Availability: Not available until {new Date(quiz.availableDate).toLocaleDateString()}</p>
                    )}
                  </>
                ) : (
                  <p>Availability: Available</p>
                )}

                <p>Due Date: {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : "6/20/2024"}</p>
                <p>{calculateTotalPoints()} pts</p>
<p>{calculateTotalQuestions()} Questions</p>
              </td>
              <td>


                <button className="btn btn-light individual-buttons-saving" onClick={() => handlePublishToggle(quiz)}>{quiz.published ? <BsCheckCircleFill /> : <BsXCircleFill />}</button>

                {' '}

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
                    <MenuItem onClick={() => {
                      selectQuiz(currentQuizQ);
                      handlePublishToggle(currentQuizQ);
                      handleClose(); 

                    }}>
                      <button >{currentQuizQ.published ? "Unpublish" : "Publish"}</button>
                    </MenuItem>}

                  {currentQuizQ &&
                    <MenuItem
                      onClick={() => {
                        setCurrentQuizQ(currentQuizQ);
                        deleteQuiz(currentQuizQ);
                        handleClose(); 
                      }
                      }>
                      Delete
                    </MenuItem>
                  }

                  {currentQuiz &&
                    <MenuItem
                      onClick={() => {
                        setCurrentQuiz(currentQuiz);
                        handleClose(); 
                      }}>
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