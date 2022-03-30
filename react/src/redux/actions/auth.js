//This is creator for actions related to authentication
import authService from "../services/auth.service"; //to make asynchronous HTTP requests with trigger one or more dispatch in the result
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";


export const register = (name,email,password) => (dispatch) => {
    return authService.register(name,email,password).then(  //call the authService.register(..)
        (response) => {
            dispatch({    //dispatch  REGISTER_SUCCESS and SET_MESSAGE if successful
                type: SET_MESSAGE,
                payload: response.data.message, 
            })
            return Promise.resolve();
        },
        (error) =>{
            const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            dispatch({    //dispatch REGISTER_FAIL and SET_MESSAGE if failed
                type: REGISTER_FAIL,
            })
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
            return Promise.reject();
        }
    )
} 


export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then( //calls the AuthService.login(email, password)
      (data) => {
        dispatch({      //dispatch LOGIN_SUCCESS and SET_MESSAGE if successful
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({    //dispatch LOGIN_FAIL and SET_MESSAGE if failed
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };


export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};



//Both action creators return a Promise for Components using them