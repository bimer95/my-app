import { PostType, ProfileType, PhotosType } from './../types/types';
import { setUserProfile } from './profile-reducer';
import { InitialStateType } from './app-reducer';
import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SEVE_PHOTO_SUCCESS = 'SEVE_PHOTO_SUCCESS';



let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }
    ]as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case ADD_POST: { //добавление поста с текстом
            let newPost = {
                id: 12384,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }

        case SET_STATUS: {  //изменение текста
            return {
                ...state,
                status: action.status

            };

        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SEVE_PHOTO_SUCCESS: {
            return { ...state, profile: {...state.profile, photos:action.photos} as ProfileType }
        }
        default:
            return state;
    }
}
type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string):AddPostActionCreatorActionType => ({ type: ADD_POST, newPostText })
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType):SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status:string):SetStatusActionType => ({ type: SET_STATUS, status })
type SavePhotoSuccessActionType = {
    type: typeof SEVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessActionType => ({ type: SEVE_PHOTO_SUCCESS, photos })

export const getUserProfile = (userId:number) => async (dispatch:any) => { //санки
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data)); //массив наших пользователей
}

export const getStatus = (userId:number) => async (dispatch:any) => { //санки
    let response = await profileAPI.getStatus(userId);
    debugger;
    dispatch(setStatus(response.data)); //массив наших пользователей
}

export const updateStatus = (status:string) => async (dispatch:any) => { //санки
    try {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status)); //массив наших пользователей
    }
} catch (error){
    //можно доделать ошибку
}
}
export const savePhoto = (file:any) => async (dispatch:any) => { //санки
        let response = await profileAPI.savePhoto(file);

        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos)); //массив наших пользователей
        }
}

export const saveProfile = (profile:ProfileType) => async (dispatch:any, getState:any) => { //санки
    const userId = getState() .auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile (userId)); //массив наших пользователей
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages [0]}));//("edit-profile", {'contacts': {facebook': response.data.messages [0]}}));(для каждого эллемента)
        return Promise.reject(response.data.messages[0]);
    }

}


export default profileReducer;