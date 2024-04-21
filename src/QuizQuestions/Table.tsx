import React, { useState, useEffect } from "react";
import {
  BsFillCheckCircleFill, BsPencil,
  BsTrash3Fill, BsPlusCircleFill,
} from "react-icons/bs";
import * as client from "./client";
import { QuizQuestions } from "./client";


export default function QuizQuestionsTable() {
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




  const createQuizQuestions = async () => {
    try {
      const newQuizQuestions = await client.createQuizQuestions(quizQuestions);
      setQuizzesQuestions([newQuizQuestions, ...quizzesQuestions]);
    } catch (err) {
      console.log(err);
    }
  };

    const selectQuizQuestions = async (quizQuestions: QuizQuestions) => {
      try {
        const q = await client.findQuizQuestionsById(quizQuestions._id);
        setQuizQuestions(q);
      } catch (err) {
        console.log(err);
      }
    };
    const updateQuizQuestions = async () => {
      try {
        const status = await client.updateQuizQuestions(quizQuestions);
        setQuizzesQuestions(quizzesQuestions.map((q) =>
          (q._id === quizQuestions._id ? quizQuestions : q)));
      } catch (err) {
        console.log(err);
      }
    };
  
    
    
    const fetchQuizzesQuestions = async () => {
    const quizzesQuestions = await client.findAllQuizzesQuestions();
    setQuizzesQuestions(quizzesQuestions);
  };

  const deleteQuizQuestions = async (quizQuestions: QuizQuestions) => {
    try {
      await client.deleteQuizQuestions(quizQuestions);
      setQuizzesQuestions(quizzesQuestions.filter((q) => q._id !== quizQuestions._id));
    } catch (err) {
      console.log(err);
    }
  };

  

  useEffect(() => { fetchQuizzesQuestions(); }, []);


  //Added From Origional:
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (event:any) => {
    setSelectedType(event.target.value);
  };


  return (


<div className="container">


<h1>Quizzes</h1>

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
{selectedType === "multipleChoice" && <h1>mc</h1>}
{selectedType === "trueFalse" && <TrueFalse />}
{selectedType === "fillInTheBlank" && <h1>fi</h1>}




{/* Testing!!!!! */}
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


</div>
    );







//True and False Screen:
function TrueFalse() {
  
    //Const:
    const [questionText, setQuestionText] = useState("");
  
    //Manages T/F values:
    const [isTrue, setIsTrue] = useState(false);
  
    // Handler for question text change:
    const handleQuestionChange = (event:any) => {
      setQuestionText(event.target.value);
    };
  
    // Handler for true/false change in value:
    const handleTrueFalseChange = (event:any) => {
       // I think it convert string value to boolean:
      setIsTrue(event.target.value === 'true');
    };
  
    // Count Word Function:
    const countWords = (text:any) => {
      return text.trim().split(/\s+/).length;
    };
  
    // Cancel button that reset question and sets to auto false:
        const handleCancel = () => {
          setQuestionText("");
          setIsTrue(false);
        };
      
  
    return (
      <div>
        <br />
        <h6>Enter your question text and select if True or False is the correct answer.</h6>
        <br />
        <h5>Question:</h5>
        <textarea
          value={quizQuestions.question}
          className="form-control"
          placeholder="Enter Question Here"
          rows={5}
          onChange={(e) => setQuizQuestions({ ...quizQuestions, question: e.target.value })}
        ></textarea>
  
  
        <div>
          <input 
            className="form-check-input"
            type="radio"
            id="true"
            name="trueFalse"
            value="true"
            checked={quizQuestions.correctAnswer === true}
            onChange={(e) => setQuizQuestions({ ...quizQuestions, correctAnswer: true })}

          />
          <label htmlFor="true">True</label>
        </div>
  
        <div>
          <input 
            className="form-check-input"
            type="radio"
            id="false"
            name="trueFalse"
            value="false"
            checked={quizQuestions.correctAnswer === false}
            onChange={(e) => setQuizQuestions({ ...quizQuestions, correctAnswer: false })}
          />
          <label htmlFor="false">False</label>
        </div>
  
        <br></br>
  
  
      {/* Cancel and Save/Update Question buttons */}
      <div>
          <button className="btn btn-primary" type="button" onClick={handleCancel}>
            Cancel
          </button>
  
          <span style={{ marginRight: '10px' }}></span>
  
  
        <button className="btn" style={{ backgroundColor: 'red', color: 'white' }} type="button"
        onClick={createQuizQuestions}>
          Save/Update Question
        </button>
  
        </div>
      </div>
  
    );
  }




// //Mutiple Choice Screen:
// function MultipleChoice() {


//     //Consts:
//     const [questionText, setQuestionText] = useState("");
//     const [choices, setChoices] = useState([""]);

//     // Handlers for question and choices:
//     const handleQuestionChange = (event:any) => {
//       setQuestionText(event.target.value);
//     };

//     // Handlers for change in a choice:
//     const handleChoiceChange = (index:any, event:any) => {
//       const newChoices = [...choices];
//       newChoices[index] = event.target.value;
//       setChoices(newChoices);
//     };
  
//     //Adds a Choice:
//     const addChoice = () => {
//       setChoices([...choices, ""]);
//     };
  
//     //Removes choice:
//     const removeChoice = (index:any) => {
//       const newChoices = [...choices];
//       newChoices.splice(index, 1);
//       setChoices(newChoices);
//     };
  
//     // Count Word Function:
//     const countWords = (text:any) => {
//       return text.trim().split(/\s+/).length;
//     };

//     // Cancel button that reset question and choices:
//   const handleCancel = () => {
//     setQuestionText("");
//     setChoices([""]);
//   };

//   // Save/Update Question button:
//   const handleSave = () => {
//     // Perform save/update action here????
//   };
  



//     return (
//       <div>
//         <br />
//         <h6>Enter your question text and multiple answers, then select one answer to be correct.</h6>
//         <br />

//         {/* Enter Question: */}
//         <h5>Question:</h5>
//         <textarea
//           className="form-control"
//           placeholder="Enter Question Here"
//           rows={5}
//           value={quizQuestions.questionTitle}
//           onChange={(e) => setQuizQuestions({ ...quizQuestions, questionTitle: e.target.value})}
//         ></textarea>


//         <br></br>

//         {/* Choices Section: */}
//         <h5>Choices:</h5>
//         {choices.map((choice, index) => (
//           <div key={index} className="form-group">
            
//             {/* Radio list: */}
//             <input
//               className="form-check-input"
//               type="radio"
//               id={`choice-${index}`}
//               name="choices"
//               value={choice}
//               onChange={(event) => handleChoiceChange(index, event)}
//             />

//             {/* Answer textbox: */}
//             <textarea
//               className="form-control"
//               placeholder={`Enter Choice ${index + 1}`}
//               rows={2}
//               value={choice}
//               onChange={(event) => handleChoiceChange(index, event)}
//             ></textarea>

//             {/* Remove Button per added choice: */}
//             <button className="btn btn-primary" type="button" onClick={() => removeChoice(index)}>
//               Remove
//             </button>

//             {/* closes radio buttons: */}
//           </div> 
//         ))}

//         <div style={{ marginBottom: '10px' }}></div>

//         {/* Add Choice */}
//         <button className="btn btn-primary" type="button" onClick={addChoice}>
//           Add Choice
//         </button>

//         <br></br><br></br><br></br>


//     {/* Cancel and Save/Update Question buttons */}
//       <div>
//         <button className="btn btn-primary" type="button" onClick={handleCancel}>
//           Cancel
//         </button>

//         <span style={{ marginRight: '10px' }}></span>

//         <button className="btn" style={{ backgroundColor: 'red', color: 'white' }} type="button" onClick={createQuizQuestions}>
//           Save/Update Question
//         </button>



//       </div>
//     </div>
//     );
//   }
  





//Fill In Blank Screen:








}








{/* <input
        value={quiz.name}
        className="form-control small-width-input"
        placeholder="Unnamed Quiz"

        onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}

      /> */}