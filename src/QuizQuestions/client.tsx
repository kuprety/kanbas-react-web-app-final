import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const QUIZZES_API = `${BASE_API}/api/quizzes`;
export const QUIZQUESTIONS_API = `${BASE_API}/api/quizQuestions`;

export interface Quiz { _id: string; published:boolean, name: string; course: string; title: string;
description: string, quizType: string, points: number, assignmentGroup: string, shuffleAnswers: boolean,
timeLimit: number, multipleAttempts: boolean, showCorrectAnswers: boolean, accessCode: string, oneQuestionAtATime: boolean,
webcamRequired: boolean, lockQuestionsAfterAnswering: boolean, dueDate: Date, availableDate: Date, untilDate: Date};
const request = axios.create({
  withCredentials: true,
})


export const findQuizById = async (id: string) => {
    const response = await request.get(`${QUIZZES_API}/${id}`);
    return response.data;
  };

  export const updateQuiz = async (quiz: any) => {
    const response = await request.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
  };

  export const findAllQuizzesQuestions = async () => {
    const response = await request.get(`${QUIZQUESTIONS_API}`);
    return response.data;
  };

  export const createQuiz = async (quiz: any) => {
    const response = await request.post(`${QUIZZES_API}`, quiz);
    return response.data;
  };  