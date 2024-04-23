import React, { useState, useEffect } from "react";
import {
  BsFillCheckCircleFill, BsPencil,
  BsTrash3Fill, BsPlusCircleFill,
} from "react-icons/bs";
import * as client from "./client";
import { QuizQuestions } from "./client";
import { Link, useLocation } from "react-router-dom";


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









// //Mutiple Choice Screen:
function MultipleChoice() {
    // State for choices
    const [choices, setChoices] = useState(quizQuestions.choices || [""]);
    const [questionText, setQuestionText] = useState("");


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

    return (
        <div>
            <br />
            <h6>Enter your question text and multiple answers, then select one answer to be correct.</h6>
            <br />

            {/* Question input */}
            <h5>Question:</h5>
            <textarea
                className="form-control"
                placeholder="Enter Question Here"
                rows={5}
                onChange={handleQuestionChange}
                value={quizQuestions.question}
            ></textarea>

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

                <button className="btn" style={{ backgroundColor: 'red', color: 'white' }} type="button"
                    onClick={createQuizQuestions}>
                    Save/Update Question
                </button>
            </div>
        </div>
    );
}




















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

      <button type="button" onClick={handleCancel} className="btn btn-light individual-buttons-saving" style={{ width: "auto" }}>
        Cancel
        </button>

       
          <span style={{ marginRight: '10px' }}></span>
  
  
        <button className="btn" style={{ backgroundColor: 'red', color: 'white' }} type="button"
        onClick={createQuizQuestions}>
          Update Question
        </button>
  
        </div>
      </div>
  
    );
  }









//Fill In Blank Screen:

  
  function FillInTheBlank() {
    // const [questionText, setQuestionText] = useState("");
    // const [blanks, setBlanks] = useState<Answer[]>([{ answer: "" }]);

    const [blanks, setBlanks] = useState(quizQuestions.choices || [""]);
    const [questionText, setQuestionText] = useState("");
  
//     // Handler for question text change
//     const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//       setQuestionText(event.target.value);
//     };


//       // Handler for change in a blank
// const handleBlankChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
//     const newBlanks = [...blanks];
//     newBlanks[index].answer = event.target.value;
//     setBlanks(newBlanks);
  
//     // Update quizQuestions.possibleAnswers
//     const newPossibleAnswers = [...quizQuestions.possibleAnswers];
//     newPossibleAnswers[index] = event.target.value;
//     setQuizQuestions({ ...quizQuestions, possibleAnswers: newPossibleAnswers });
//   };
  
// // Adds a new blank
// const addBlank = () => {
//     console.log("Adding new blank");
//     const newBlanks = [...blanks, { answer: "" }];
//     console.log("New blanks:", newBlanks);
//     setBlanks(newBlanks);
//     const newPossibleAnswers = [...quizQuestions.possibleAnswers, ""];
//     console.log("New possibleAnswers:", newPossibleAnswers);
//     setQuizQuestions({ ...quizQuestions, possibleAnswers: newPossibleAnswers });
// };



//     // Removes a blank
// const removeBlank = (index: number) => {
//     console.log(`Removing blank at index ${index}`);
//     const newBlanks = [...blanks];
//     newBlanks.splice(index, 1);
//     console.log("Updated blanks:", newBlanks);
//     setBlanks(newBlanks);
    
//     const newPossibleAnswers = [...quizQuestions.possibleAnswers];
//     newPossibleAnswers.splice(index, 1);
//     console.log("Updated possibleAnswers:", newPossibleAnswers);
//     setQuizQuestions({ ...quizQuestions, possibleAnswers: newPossibleAnswers });
// };



    // Handler for updating the question text
    const handleQuestionChange = (event:any) => {
        setQuizQuestions({ ...quizQuestions, question: event.target.value });
    };

    //Handler for updating a specific choice
    const handleBlankChange = (index:any, event:any) => {
        const newChoices = [...blanks];
        newChoices[index] = event.target.value;
        setBlanks(newChoices);
        setQuizQuestions((prev) => ({
            ...prev,
            possibleAnswers: blanks,
        }));
    };


    




    // Handler for updating the correct answer
    const handleCorrectAnswerChange = (event:any) => {
        setQuizQuestions({ ...quizQuestions, correctAnswer: event.target.value });
    };

    // Handler for adding a new choice
    const addBlank = () => {
        setBlanks([...blanks, ""]);
    };


        // Cancel button that reset question and choices:
    const handleCancel = () => {
      const newChoices = [...blanks];
      setQuestionText("");
      setBlanks(newChoices);
      setSelectedType("");
    };


    // Handler for removing a choice
    const removeBlank = (index:any) => {
        const newBlanks = [...blanks];
        newBlanks.splice(index, 1);
        setBlanks(newBlanks);
        setQuizQuestions((prev) => ({
            ...prev,
            blanks: newBlanks,
        }));
    };




  
    return (
      <div>
        <br />
        <h6>Enter your question text and provide all possible answers.</h6>
        <br />
  
        {/* Question */}
        <h5>Question:</h5>
        <textarea
          value={quizQuestions.question}
          className="form-control"
          placeholder="Enter Question Here"
          rows={5}
          onChange={(e) => setQuizQuestions({ ...quizQuestions, question: e.target.value })}
        ></textarea>
  
  
        <br />
  
        {/* Answer Section */}
        <h5>Answers:</h5>
        {blanks.map((answer, index) => (
          <div key={index} className="form-group">

                    <textarea
                        className="form-control"
                        placeholder={`Enter Choice ${index + 1}`}
                        rows={2}
                        value={answer}
                        onChange={(event) => handleBlankChange(index, event)}
                    ></textarea>

            {/* <input
              className="form-control"
              type="text"
              placeholder={`Possible Answer ${index + 1}`}
              value={answer}
              onChange={(event) => handleBlankChange(index, event)}
            /> */}


                    {/* Choice input
                    <textarea
                        className="form-control"
                        placeholder={`Enter Choice ${index + 1}`}
                        rows={2}
                        value={choice}
                        onChange={(event) => handleChoiceChange(index, event)}
                    ></textarea> */}





  
            <button className="btn btn-primary" type="button" onClick={() => removeBlank(index)}>
              Remove
            </button>
          </div>
        ))}
  
        <div style={{ marginTop: "10px" }}></div>

  
        {/* Add Blank Button */}
        <button className="btn btn-primary" type="button" onClick={addBlank}>
          Add Blank
        </button>
  
        <br></br><br></br>
  
        {/* Cancel and Save/Update Question buttons */}
        <div>
          {/* <button className="btn btn-primary" type="button" onClick={handleCancel}>
            Cancel
          </button> */}
  
          <span style={{ marginRight: "10px" }}></span>
  
          <button className="btn" style={{ backgroundColor: 'red', color: 'white' }} type="button"
        onClick={createQuizQuestions}>
          Save/Update Question
        </button>
        </div>
      </div>
    );
  }







}








{/* <input
        value={quiz.name}
        className="form-control small-width-input"
        placeholder="Unnamed Quiz"

        onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}

      /> */}