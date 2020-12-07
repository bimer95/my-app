import { BaseThunkType, InferActionsTypes } from './redux-store';
import {ResultCodeForCapcthaEnum, ResultCodesEnum} from '../api/api';
import {stopSubmit} from "redux-form";
import {authAPI} from '../api/auth-api';
import {securityAPI} from '../api/security-api';
import {Action} from 'redux';
import {FormAction} from 'redux-form/lib/actions';

const SET_USER_DATA = 'RN/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'RN/auth/GET_CAPTCHA_URL_SUCCESS';



let initialState = {
    userId: null as number|null,
    email: null as string|null,
    login: null as string|null,
    isAuth: false as boolean,
    captchaUrl:null as string|null // if null, then captcha is not required
    
};



const authReducer = (state = initialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        case 'RN/auth/SET_USER_DATA':
        case 'RN/auth/GET_CAPTCHA_URL_SUCCESS':

            return {
                ...state,
                ...action.payload
            }
      
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId:number|null, email:string|null, login:string|null, isAuth:boolean) => ({ //Action Creators (функции которые создают экшен)
        type: 'RN/auth/SET_USER_DATA', payload: { userId, email, login, isAuth }
    }as const),
     getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'RN/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
    }as const)
    
    

} 


export const getAuthUserData = (): ThunkType => async (dispatch)=> {
    let meData = await authAPI.me ();

            if (meData.resultCode === ResultCodesEnum.Success) {
                let { id, login, email } = meData.data;
                dispatch(actions.setAuthUserData(id, email, login, true));
            }
        }
export const login = (email: string, password: string, rememberMe: boolean, captcha: string):ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodesEnum.Success) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeForCapcthaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }

        let message = data.messages.length > 0 ? data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}



export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>