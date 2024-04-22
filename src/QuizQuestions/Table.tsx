import React, { useState, useEffect } from "react";
import {
  BsFillCheckCircleFill, BsPencil,
  BsTrash3Fill, BsPlusCircleFill,
} from "react-icons/bs";
import * as client from "./client";
import { QuizQuestions } from "./client";

//Hey!
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

//on chagne for the drop drown
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
{selectedType === "multipleChoice" && <MultipleChoice />}
{selectedType === "trueFalse" && <TrueFalse />}
{selectedType === "fillInTheBlank" && <h1>Falalala</h1>}
{/* {selectedType === "fillInTheBlank" && <FillInTheBlank />} */}




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









//Mutiple Choice Screen:
function MultipleChoice() {
    // State for choices
    const [choices, setChoices] = useState(quizQuestions.choices || [""]);

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

    // Handler for adding a new choice
    const addChoice = () => {
        setChoices([...choices, ""]);
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
                        onChange={() => setQuizQuestions({ ...quizQuestions, correctAnswer: choice })}
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
  
  
  
    // // Cancel button that reset question and sets to auto false:
    //     const handleCancel = () => {
    //       setQuestionText("");
    //       setIsTrue(false);
    //     };
      
  
    return (
      <div>
        <br />
        <h6>Enter your question text and select if True or False is the correct answer.</h6>
        <br />
        <h5>Question:</h5>


            <textarea
            //This is the problem!!!vvv
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
          {/* <button className="btn btn-primary" type="button" onClick={handleCancel}>
            Cancel
          </button> */}
  
          <span style={{ marginRight: '10px' }}></span>
  
  
        <button className="btn" style={{ backgroundColor: 'red', color: 'white' }} type="button"
        onClick={createQuizQuestions}>
          Save/Update Question
        </button>
  
        </div>
      </div>
    );
  }







// //Fill In Blank Screen:
// interface Answer {
//     answer: string;
//   }
  
//   function FillInTheBlank() {
//     const [questionText, setQuestionText] = useState("");
//     const [blanks, setBlanks] = useState<Answer[]>([{ answer: "" }]);
  
//     // Handler for question text change
//     const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//       setQuestionText(event.target.value);
//     };
  
//     // Handler for change in a blank
//     const handleBlankChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
//       const newBlanks = [...blanks];
//       newBlanks[index].answer = event.target.value;
//       setBlanks(newBlanks);
//     };
  
//     // Adds a new blank
//     const addBlank = () => {
//       setBlanks([...blanks, { answer: "" }]);
//     };
  
//     // Removes a blank
//     const removeBlank = (index: number) => {
//       const newBlanks = [...blanks];
//       newBlanks.splice(index, 1);
//       setBlanks(newBlanks);
//     };
  
//     // Handler for cancel button:
//     const handleCancel = () => {
//       setQuestionText("");
//       setBlanks([{ answer: "" }]);
//     };
  
//     // Handler for save/update question button
//     const handleSave = () => {
//       // Perform save/update action here????
//     };
  
//     // Count Word Function:
//     const countWords = (text: string) => {
//       return text.trim().split(/\s+/).length;
//     };
  
//     return (
//       <div>
//         <br />
//         <h6>Enter your question text and provide all possible answers.</h6>
//         <br />
  
//         {/* Question */}
//         <h5>Question:</h5>
//         <textarea
//           className="form-control"
//           placeholder="Enter Question Here"
//           rows={5}
//           onChange={handleQuestionChange}
//           value={questionText}
//         ></textarea>
  
//         {/* Word Counter */}
//         <div style={{ color: "red", textAlign: "right", fontWeight: "bold" }}>
//           Word Count: {countWords(questionText)}
//         </div>
  
//         <br />
  
//         {/* Answer Section */}
//         <h5>Answers:</h5>
//         {blanks.map((answer, index) => (
//           <div key={index} className="form-group">
//             <input
//               className="form-control"
//               type="text"
//               placeholder={`Possible Answer ${index + 1}`}
//               value={answer.answer}
//               onChange={(event) => handleBlankChange(index, event)}
//             />
  
//             <button className="btn btn-primary" type="button" onClick={() => removeBlank(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
  
//         <div style={{ marginTop: "10px" }}></div>

  
//         {/* Add Blank Button */}
//         <button className="btn btn-primary" type="button" onClick={addBlank}>
//           Add Blank
//         </button>
  
//         <br></br><br></br>
  
//         {/* Cancel and Save/Update Question buttons */}
//         <div>
//           <button className="btn btn-primary" type="button" onClick={handleCancel}>
//             Cancel
//           </button>
  
//           <span style={{ marginRight: "10px" }}></span>
  
//           <button className="btn" style={{ backgroundColor: 'red', color: 'white' }} type="button"
//         onClick={createQuizQuestions}>
//           Save/Update Question
//         </button>
//         </div>
//       </div>
//     );
//   }

















//End Bracket
}

{/* <input
        value={quiz.name}
        className="form-control small-width-input"
        placeholder="Unnamed Quiz"

        onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}

      /> */}