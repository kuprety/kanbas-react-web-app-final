import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const QUIZZES_API = `${BASE_API}/api/quizzes`;
// export interface User { _id: string; username: string; password: string; role: string;
// firstName: string, lastName: string };
const request = axios.create({
  withCredentials: true,
})

export function updateQuiz(profile: () => Promise<any>) {
  throw new Error("Function not implemented.");
}
// export const deleteQuiz = async (moduleId : any) => {
//   const response = await axios
//     .delete(`${QUIZZES_API}/${moduleId}`);
//   return response.data;
// };

// export const updateModule = async (module : any) => {
//   const response = await axios.
//     put(`${QUIZZES_API}/${module._id}`, module);
//   return response.data;
// };

// export const updateQuiz = async (quiz: any) => {
//   const response = await request.put(`${QUIZZES_API}/${quiz._id}`, quiz);
//   return response.data;
// };

// export const createModule = async (courseId : any, module : any) => {
//   const response = await axios.post(
//     `${QUIZZES_API}/${courseId}/modules`,
//     module
//   );
//   return response.data;
// };

// export const findModulesForCourse = async (courseId : any) => {
//   const response = await axios
//     .get(`${QUIZZES_API}/${courseId}/modules`);
//   return response.data;
// };

