import React, { useState, useEffect } from "react";


import {
  BsFillCheckCircleFill, BsPencil,
  BsTrash3Fill, BsPlusCircleFill,
  BsCheckCircleFill,
  BsXCircleFill,
} from "react-icons/bs";

import * as client from "./client";
import { Quiz } from "./client";


// //---
// import MenuItem from "@material-ui/core/MenuItem";
// import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";

// import { Link, useParams } from "react-router-dom";
// //--


export default function QuizTable() {
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [quiz, setQuiz] = useState<Quiz>({
//     _id: "", published: false, name:"", course: "", title: "",
//     description: "", quizType: "", points: 0, assignmentGroup: "Quizzes", shuffleAnswers: true,
//     timeLimit: 20, multipleAttempts: false, showCorrectAnswers: false, accessCode: "", oneQuestionAtATime: true,
//     webcamRequired: false, lockQuestionsAfterAnswering: false, dueDate: new Date("2024-06-20"), availableDate: new Date(), untilDate: new Date("2024-06-20") });

//     const selectQuiz = async (quiz: Quiz) => {
//       try {
//         const q = await client.findQuizById(quiz._id);
//         setQuiz(q);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     const updateQuiz = async () => {
//       try {
//         const status = await client.updateQuiz(quiz);
//         setQuizzes(quizzes.map((q) =>
//           (q._id === quiz._id ? quiz : q)));
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     // const createQuiz = async () => {
//     //     try {
//     //       const newQuiz = await client.createQuiz(quiz);
//     //       setQuizzes([newQuiz, ...quizzes]);
//     //     } catch (err) {
//     //       console.log(err);
//     //     }
//     //   };

//     const createQuiz = async () => {
//       try {
//         const newQuiz = await client.createQuiz(quiz);
//         setQuizzes([newQuiz, ...quizzes]);

//         //try this?
//         setCurrentQuiz(newQuiz._id);
  
//       } catch (err) {
//         console.log(err);
//       }
//     };



    
    
//   //   const fetchQuiz = async (quiz:any) => {
//   //   const quizzes = await client.findQuizById(quiz._id);
//   //   setQuiz(quiz);
//   // };

//   const fetchQuizzes = async () => {
//     const quizzes = await client.findAllQuizzes();
//     setQuizzes(quizzes);
//   };

//   const deleteQuiz = async (quiz: Quiz) => {
//     try {
//       await client.deleteQuiz(quiz);
//       setQuizzes(quizzes.filter((q) => q._id !== quiz._id));
//     } catch (err) {
//       console.log(err);
//     }
//   };

// //new
// const { courseId } = useParams();

//   //dropdown
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const handleClose = () => {
//       setAnchorEl(null);
//   };

//   const handleClick = (event: any, clickedQuiz: Quiz) => {
//     setAnchorEl(event.currentTarget);
//     setCurrentQuiz(clickedQuiz._id);
//     setCurrentQuizQ(clickedQuiz);
// };

// // const handlePublishToggle = async (quiz:any) => {
// //   try {
// //       const updatedQuiz = { ...quiz, published: !quiz.published };
// //       const status = await client.updateQuiz(updatedQuiz);
// //       setQuiz(updatedQuiz);
// //   } catch (error) {
// //       console.error("Error toggling publish status:", error);
// //   }
// // };

// const handlePublishToggle = async (quiz: any) => {
//   try {
//     const updatedQuiz = { ...quiz, published: !quiz.published };
//     await client.updateQuiz(updatedQuiz);
//     setQuizzes(prevQuizzes =>
//       prevQuizzes.map(q => (q._id === quiz._id ? updatedQuiz : q))
//     );
//   } catch (error) {
//     console.error("Error toggling publish status:", error);
//   }
// };

// const [currentQuiz, setCurrentQuiz] = useState<String>(String || null);
// const [currentQuizQ, setCurrentQuizQ] = useState<Quiz>(quiz || null);
// //added obvi
//   //dr

//   useEffect(() => { fetchQuizzes()}, []);

//   return (
//     <div>
//       <h1>Quiz Table</h1>
//       <table className="table">
//         <thead>
//           <tr>
//             <td>
//             <tr> Quiz Name </tr>
//             <div className="row">
//   <div className="col">
//     <input 
//       value={quiz.name} 
//       className="form-control mx-100" 
//       style={{ width: '200px' }} 
//       onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
//     />
//   </div>
//   <td>
//   <tr> Description </tr>

//   <div className="col">
//     <input 
//       value={quiz.description} 
//       className="form-control mx-100" 
//       style={{ width: '200px' }} 
//       onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
//     />
    
//   </div>
//   </td>
// </div>

//             </td>
//             <td>
//             <tr> Points </tr>
//               <input value={quiz.points} className="form-control" style={{ width: '200px'}} onChange={(e) =>
//                 setQuiz({ ...quiz, points: parseFloat(e.target.value) })}/>
//             </td>
//             <td>
//             <tr> Due Date </tr>
//               <input value={quiz.dueDate instanceof Date ? quiz.dueDate.toISOString().split('T')[0] : quiz.dueDate} className="form-control" style={{ width: '200px'}} onChange={(e) =>
//                 setQuiz({ ...quiz, dueDate: new Date(e.target.value) })}/>
//             </td>
//             <td>
//             <tr> Assignment Group </tr>

//               <select value={quiz.assignmentGroup} className="form-select" style={{ width: '200px', marginTop: "10px" }} onChange={(e) =>
//                 setQuiz({ ...quiz, assignmentGroup: e.target.value })}>
//                 <option value="QUIZZES">Quizzes</option>
//                 <option value="EXAMS">Exams</option>
//                 <option value="ASSIGNMENTS">Assignments</option>
//                 <option value="PROJECT">Project</option>
//               </select>
//             </td>
//             <td>
//             <BsFillCheckCircleFill
//       onClick={updateQuiz}
//       className="me-2 text-success fs-1 text"
//     />

// <button onClick={createQuiz}>
//   <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${currentQuiz}Quiz/Editor`}>
//     <BsPlusCircleFill className="text-success fs-1 text" /></Link>
// </button>


//                 </td>
//             <th>&nbsp;</th>
//           </tr>
//         </thead>
//         <h1> TABLE:</h1>
//         {'  '}
//         <tbody>
          
//           {quizzes.map((quiz: any) => (
//             <tr key={quiz._id}>


//               <td> <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}>{quiz.name}</Link>
//               <br />
//               <br />
            
//               {quiz.availableDate && (
//                 <>
//                   {new Date() > new Date(quiz.untilDate) && (
//                     <p>Availability: Closed</p>
//                   )}
//                   {new Date() >= new Date(quiz.availableDate) &&
//                     new Date() <= new Date(quiz.untilDate) && (
//                       <p>Availability: Available</p>
//                     )}
//                   {new Date() < new Date(quiz.availableDate) && (
//                     <p>Availability: Not available until {new Date(quiz.availableDate).toLocaleDateString()}</p>
//                   )}
//                 </>
//               )}
              
//               {quiz.dueDate && <p>Due: {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : "N/A"}</p>}
//               {quiz.points && <p>Points: {quiz.points}</p>}
              
              
//               </td>
              
//               <td>
                

//               <button onClick= {() => handlePublishToggle(quiz)}>{quiz.published ? <BsCheckCircleFill/> : <BsXCircleFill/>}</button>

//               {' '}
//                 <button onClick={() => deleteQuiz(quiz)} className="btn btn-danger">
//                   <BsTrash3Fill />
//                 </button>
//                 <button className="btn btn-warning me-2" style={{marginLeft: "10px"}}>
//                 <BsPencil onClick={() => selectQuiz(quiz)} />

                
//                 </button>
//                     <Button
//                       aria-controls="simple-menu"
//                       aria-haspopup="true"
//                       onClick={(event:any) => handleClick(event, quiz)
//                       }>
//                       Open Menu List
//                     </Button>

//                     <Menu
//                         keepMounted
//                         anchorEl={anchorEl}
//                         onClose={handleClose}
//                         open={Boolean(anchorEl)}>

//                           {currentQuizQ &&
//                         <MenuItem  onClick={() => 
//                         {selectQuiz(currentQuizQ)
//                         handlePublishToggle(currentQuizQ)}}>
//                         <button >{currentQuizQ.published ? "Unpublish" : "Publish"}</button>
//                       </MenuItem>}
                          
                        
//                         {currentQuizQ &&
//                         <MenuItem
//                         onClick={() => {
//                           setCurrentQuizQ(currentQuizQ);
//                           deleteQuiz(currentQuizQ);}
//                           }>
//                           Delete
//                         </MenuItem>
//                         }

//                         {currentQuiz && 
//                         <MenuItem 
//                         onClick={() => {
//                           setCurrentQuiz(currentQuiz);}}>
//                           <Link
//                             to={`/Kanbas/Courses/${courseId}/Quizzes/${currentQuiz}`}>Edit Screen</Link>
//                         </MenuItem>}
//                     </Menu>
                    
//               </td>
//             </tr>))}
//         </tbody>
//       </table>
//     </div>
// );
}