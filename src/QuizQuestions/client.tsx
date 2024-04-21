

import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const QUIZQUESTIONS_API = `${BASE_API}/api/quizQuestions`;
export interface QuizQuestions {
    _id: string;
    quizId: string;
    type: "multipleChoice" | "trueFalse" | "fillInTheBlank"; 
    questionTitle: string; 
    question: string;
    choices?: string[];
    correctAnswer: string | boolean;
    possibleAnswers?: string[]; 
    points: number; 
}


const request = axios.create({
  withCredentials: true,
})


export const updateQuizQuestions = async (quizQuestions: any) => {
  const response = await request.put(`${QUIZQUESTIONS_API}/${quizQuestions._id}`, quizQuestions);
  return response.data;
};


export const findAllQuizzesQuestions = async () => {
  const response = await request.get(`${QUIZQUESTIONS_API}`);
  return response.data;
};



  export const createQuizQuestions = async (quizQuestions: any) => {
    const response = await request.post(`${QUIZQUESTIONS_API}`, quizQuestions);
    return response.data;
  };  
    
  export const deleteQuizQuestions = async (quizQuestions: any) => {
    const response = await request.delete(
      `${QUIZQUESTIONS_API}/${quizQuestions._id}`);
    return response.data;
  };
  
  
  
  export const findQuizQuestionsById = async (id: string) => {
    const response = await request.get(`${QUIZQUESTIONS_API}/${id}`);
    return response.data;
  };
  
  
  