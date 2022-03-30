import axios from "axios";
import { defaultButtonList } from "sweetalert/typings/modules/options/buttons";

const API_URL = "http://127.0.0.1:8000/test";

const getPublicContent = () => {
    return axios.get(API_URL = "all");
}

// const getUserBoard = () => {
//     return axios.get(API_URL + "user", { headers: authHeader() });
//   };
//   const getModeratorBoard = () => {
//     return axios.get(API_URL + "mod", { headers: authHeader() });
//   };
//   const getAdminBoard = () => {
//     return axios.get(API_URL + "admin", { headers: authHeader() });
//   };

export default {
    getPublicContent,
    // getUserBoard,
    // getModeratorBoard,
    // getAdminBoard,
}