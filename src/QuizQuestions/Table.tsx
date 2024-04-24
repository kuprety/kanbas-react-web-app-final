import React, { useState, useEffect, useRef } from "react";
import {
  BsFillCheckCircleFill, BsPencil,
  BsTrash3Fill, BsPlusCircleFill,
} from "react-icons/bs";
import * as client from "./questionsclient";
import { QuizQuestions } from "./questionsclient";
import { Link, useLocation, useParams } from "react-router-dom";
 
 
export default function QuizQuestionsTable() {
  const [quizzesQuestions, setQuizzesQuestions] = useState<QuizQuestions[]>([]);
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestions>({
        _id: "",
        quizId: "",
        type: "multipleChoice",
        questionTitle: "",
        question: "",
        choices: [],
        correctAnswer: "",
        possibleAnswers: [],
        points: 0,
    });
 
 
    const { pathname } = useLocation();
    const { quizId } = useParams<{ quizId:any }>();

  
  const createQuizQuestions = async () => {
    try {
      const newQuizQuestions = await client.createQuizQuestions(quizQuestions);
      setQuizzesQuestions([newQuizQuestions, ...quizzesQuestions]);
 
    } catch (err) {
      console.log(err);
    }
  };
  
 
  const handleSaveQuizQuestions = async () => {
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
 
 
  const [selectedType, setSelectedType] = useState("");
 
 
    //Changes the type from t/f to MC to FillInTheBlank:
    const handleTypeChange = (event:any) => {
        const selectedType = event.target.value;
        setSelectedType(selectedType);
        setQuizQuestions({ ...quizQuestions, type: selectedType });
      }
 
 
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
    );
 
 
 
 
 
 
 
 
 
//Mutiple Choice Screen:
function MultipleChoice() {
    // State for choices
    const [choices, setChoices] = useState(quizQuestions.choices || [""]);
    const [questionTitle, setQuestionTitle] = useState('');
 
 
    // Handler for updating the question text
    const handleQuestionChange = (event:any) => {
        setQuizQuestions({ ...quizQuestions, question: event.target.value });
 
    };
 
    // Handler for updating a specific choice
    const handleChoiceChange = (index:any, event:any) => {
        const newChoices = [...choices];
        newChoices[index] = event.target.value;
        setChoices(newChoices);
        setQuizQuestions((prev) => ({
            ...prev,
            choices: newChoices,
        }));
    };
 
    // Handler for updating the correct answer
    const handleCorrectAnswerChange = (event:any) => {
        setQuizQuestions({ ...quizQuestions, correctAnswer: event.target.value });
    };
 
    // Handler for adding a new choice
    const addChoice = () => {
        setChoices([...choices, ""]);
    };
 
    const { quizId } = useParams<{ quizId:any }>();

        // Cancel button that reset question and choices:
    const handleCancel = () => {
      const newChoices = [...choices];
      setQuestionText("");
      setChoices(newChoices);
      setSelectedType("");
    };
 
 
    // Handler for removing a choice
    const removeChoice = (index:any) => {
        const newChoices = [...choices];
        newChoices.splice(index, 1);
        setChoices(newChoices);
        setQuizQuestions((prev) => ({
            ...prev,
            choices: newChoices,
        }));
    };
 
    const [questionText, setQuestionText] = useState('');
 
 
    return (
        <div>
            <br />
            <br />
            <h6>Enter multiple answers, then select one answer to be correct.</h6>
 
            <div>
 

 </div>
            {/* Question input */}
            {/* <h5>Question:</h5>
            <textarea
                className="form-control"
                placeholder="Enter Question Here"
                rows={5}
                value={quizQuestions.question}
                onChange={(e) => setQuizQuestions({ ...quizQuestions, question: e.target.value })}
            ></textarea>
  */}
 
 
            <br></br>
 
            {/* Choices */}
            <h5>Choices:</h5>
            {choices.map((choice, index) => (
                <div key={index} className="form-group">
                    {/* Radio button */}
                    <input
                        className="form-check-input"
                        type="radio"
                        id={`choice-${index}`}
                        name="choicesGroup"
                        value={choice}
                        checked={quizQuestions.correctAnswer === choice}
                        onChange={handleCorrectAnswerChange}
                    />
 
                    {/* Choice input */}
                    <textarea
                        className="form-control"
                        placeholder={`Enter Choice ${index + 1}`}
                        rows={2}
                        value={choice}
                        onChange={(event) => handleChoiceChange(index, event)}
                    ></textarea>
 
                    {/* Remove button */}
                    <button className="btn btn-primary" type="button" onClick={() => removeChoice(index)}>
                        Remove
                    </button>
                </div>
            ))}
 
            {/* Add choice button */}
            <button className="btn btn-primary" type="button" onClick={addChoice}>
                Add Choice
            </button>
 
            <br></br>
            <br></br>
 
            {/* Save/Update Question button */}
            <div>
 
 
                   <button type="button" onClick={handleCancel} className="btn btn-light individual-buttons-saving" style={{ width: "auto" }}>
          Cancel
          </button>
          <Link to={`../Quizzes/${quizId}/Questions`}>

                <button className="btn" style={{ backgroundColor: 'red', color: 'white' }} type="button"
                    onClick={createQuizQuestions}>
                      
                    Update Question
                </button>
                </Link>
            </div>
        </div>
    );
}
 
 
 
 
// function MultipleChoice() {
//     // State for choices
//     const [choices, setChoices] = useState(quizQuestions.choices || [""]);
//     const [questionTitle, setQuestionTitle] = useState('');
 
//     // Change the type of questionInputRef to be a reference to HTMLTextAreaElement
//     const questionInputRef = useRef<HTMLTextAreaElement>(null);
 
 
 
//     // // Handler for updating the question text
//     // const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     //     setQuizQuestions({ ...quizQuestions, question: event.target.value });
//     // };
 
//     const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//         const { value } = event.target;
//         setQuizQuestions((prevQuestions) => ({
//           ...prevQuestions,
//           question: value,
//         }));
      
//         // Set the cursor position after state update
//         event.target.selectionStart = event.target.selectionEnd = value.length;
//       };
      
 
 
//     // Handler for updating a specific choice
//     const handleChoiceChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
//         const newChoices = [...choices];
//         newChoices[index] = event.target.value;
//         setChoices(newChoices);
//         setQuizQuestions((prev) => ({
//             ...prev,
//             choices: newChoices,
//         }));
//     };
 
//     // Handler for updating the correct answer
//     const handleCorrectAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setQuizQuestions({ ...quizQuestions, correctAnswer: event.target.value });
//     };
 
//     // Handler for adding a new choice
//     const addChoice = () => {
//         setChoices([...choices, ""]);
//     };
 
 
    
 
//     // Handler for removing a choice
//     const removeChoice = (index: number) => {
//         const newChoices = [...choices];
//         newChoices.splice(index, 1);
//         setChoices(newChoices);
//         setQuizQuestions((prev) => ({
//             ...prev,
//             choices: newChoices,
//         }));
//     };
 
    
 
 
//     useEffect(() => {
//         if (questionInputRef.current) {
//             questionInputRef.current.focus();
//         }
//     }, [quizQuestions.question]);
 
 
 
//     return (
//         <div>
//             <br />
//             <h6>Enter your question text and multiple answers, then select one answer to be correct.</h6>
//             <br />
 
//             {/* Question input */}
//             <h5>Question:</h5>
//             <textarea
//                 ref={questionInputRef}
//                 className="form-control"
//                 placeholder="Enter Question Here"
//                 rows={5}
//                 value={quizQuestions.question}
//                 onChange={handleQuestionChange}
//             ></textarea>
 
 
//             <br></br>
 
//             {/* Choices */}
//             <h5>Choices:</h5>
//             {choices.map((choice, index) => (
//                 <div key={index} className="form-group">
//                     {/* Radio button */}
//                     <input
//                         className="form-check-input"
//                         type="radio"
//                         id={`choice-${index}`}
//                         name="choicesGroup"
//                         value={choice}
//                         checked={quizQuestions.correctAnswer === choice}
//                         onChange={handleCorrectAnswerChange}
//                     />
 
//                     {/* Choice input */}
//                     <textarea
//                         className="form-control"
//                         placeholder={`Enter Choice ${index + 1}`}
//                         rows={2}
//                         value={choice}
//                         onChange={(event) => handleChoiceChange(index, event)}
//                     ></textarea>
 
//                     {/* Remove button */}
//                     <button className="btn btn-primary" type="button" onClick={() => removeChoice(index)}>
//                         Remove
//                     </button>
//                 </div>
//             ))}
 
//             {/* Add choice button */}
//             <button className="btn btn-primary" type="button" onClick={addChoice}>
//                 Add Choice
//             </button>
 
//             <br></br>
//             <br></br>
 
//             {/* Save/Update Question button */}
//             <div>
//                 {/* <button type="button" onClick={handleCancel} className="btn btn-light individual-buttons-saving" style={{ width: "auto" }}>
//                     Cancel
//                 </button> */}
//                 <button className="btn" style={{ backgroundColor: 'red', color: 'white' }} type="button"
//                     onClick={createQuizQuestions}>
//                     Save/Update Question
//                 </button>
//             </div>
//         </div>
//     );
// }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
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
          setSelectedType("");
 
        };
      
  
    return (
      <div>
        <br />

        <h6>Select if True or False is the correct answer.</h6>
        {/* <h5>Question:</h5>
        <textarea
          value={quizQuestions.question}
          className="form-control"
          placeholder="Enter Question Here"
          rows={5}
          onChange={(e) => setQuizQuestions({ ...quizQuestions, question: e.target.value })}
        ></textarea> */}
  
  
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
 
      <button type="button" onClick={handleCancel} className="btn btn-light individual-buttons-saving" style={{ width: "auto" }}>
        Cancel
        </button>
 
       
          <span style={{ marginRight: '10px' }}></span>
  
          <Link to={`../Quizzes/${quizId}/Questions`}>
        <button className="btn" style={{ backgroundColor: 'red', color: 'white' }} type="button"
        onClick={createQuizQuestions}>
          Update Question
        </button>
  </Link>
        </div>
      </div>
  
    );
  }
 
 
 
 
 
 
 
 
//Fill In Blank Screen:
 
function FillInTheBlank() {
    const [textAreaValues, setTextAreaValues] = useState(quizQuestions.possibleAnswers || [""]);
  
    // Handler for updating the question text
    const handleQuestionChange = (event:any) => {
      setQuizQuestions({ ...quizQuestions, question: event.target.value });
    };
  
    // Handler for updating a specific textarea value
    const handleTextAreaChange = (index:any, event:any) => {
      const newValues = [...textAreaValues];
      newValues[index] = event;
      setTextAreaValues(newValues);
      setQuizQuestions({ ...quizQuestions, possibleAnswers: newValues });
    };
  
    // Handler for adding a new textarea
    const addTextArea = () => {
      setTextAreaValues([...textAreaValues, ""]);
      setQuizQuestions({
        ...quizQuestions,
        possibleAnswers: [...quizQuestions.possibleAnswers, ""],
      });
    };
  
    // Handler for removing a textarea
    const removeTextArea = (index:any) => {
      const newValues = [...textAreaValues];
      newValues.splice(index, 1);
      setTextAreaValues(newValues);
      const newPossibleAnswers = [...quizQuestions.possibleAnswers];
      newPossibleAnswers.splice(index, 1);
      setQuizQuestions({ ...quizQuestions, possibleAnswers: newPossibleAnswers });
    };
  
    return (
      <div>
        <br />
        <br />

        <h6>Provide all possible answers.</h6>
        <br />
  
        {/* Question */}

  
        {/* Answer Section */}
        <h5>Answers:</h5>
        {textAreaValues.map((value, index) => (
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder={`Enter Choice ${index + 1}`}
              rows={2}
              value={value}
              onChange={(event) => handleTextAreaChange(index, event.target.value)}
            ></textarea>
  
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => removeTextArea(index)}
            >
              Remove
            </button>
          </div>
        ))}
  
        <div style={{ marginTop: "10px" }}></div>
  
        {/* Add Textarea Button */}
        <button className="btn btn-primary" type="button" onClick={addTextArea}>
          Add Blank
        </button>
  
        <br></br>
        <br></br>
  
        {/* Save/Update Question button */}
        <div>
        <Link to={`../Quizzes/${quizId}/Questions`}>

          <button
            className="btn"
            style={{ backgroundColor: "red", color: "white" }}
            type="button"
            onClick={createQuizQuestions}
          >
            Update Question
          </button>
          </Link>
        </div>
      </div>
    );
  }
 
 
 
 
 
 
}
 