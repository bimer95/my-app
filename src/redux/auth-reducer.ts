import { ThunkAction } from 'redux-thunk';
import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import { Dispatch } from 'react';

const SET_USER_DATA = 'rosg-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'rosg-network/auth/GET_CAPTCHA_URL_SUCCESS';



let initialState = {
    userId: null as number|null,
    email: null as string|null,
    login: null as string|null,
    isAuth: false as boolean,
    captchaUrl:null as string|null // if null, then captcha is not required
    
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:

            return {
                ...state,
                ...action.payload
            }
      
        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType = {
    userId:number|null
    email:string|null
    login:string|null
    isAuth:boolean
    

}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId:number|null, email:string|null, login:string|null, isAuth:boolean):SetAuthUserDataActionType => ({ //Action Creators (функции которые создают экшен)
    type: SET_USER_DATA, payload:
        { userId, email, login, isAuth }
});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}

}
type ActionsTypes = SetAuthUserDataActionPayloadType | SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType | InitialStateType

export const getCaptchaUrlSuccess = (captchaUrl: string):GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
});


export const getAuthUserData = () => async (dispatch: Dispatch<ActionsTypes>)=> {
    let response = await authAPI.me ();

            if (response.data.resultCode === 0) {
                let { id, login, email } = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        }
export const login = (email: string, password:string, rememberMe:boolean, captcha:string) => async (dispatch:any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }

        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const getCaptchaUrl = () => async (dispatch:Dispatch<ActionsTypes>) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}



export const logout = () => async (dispatch:Dispatch<ActionsTypes>) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;