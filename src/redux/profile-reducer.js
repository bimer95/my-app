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
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: { //добавление поста с текстом
            let newPost = {
                id: 5,
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
            return { ...state, profile: {...state.profile, photos:action.photos} }
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const savePhotoSuccess = (photos) => ({ type: SEVE_PHOTO_SUCCESS, photos })


export const getUserProfile = (userId) => async (dispatch) => { //санки
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data)); //массив наших пользователей
}

export const getStatus = (userId) => async (dispatch) => { //санки
    let response = await profileAPI.getStatus(userId);
    debugger;
    dispatch(setStatus(response.data)); //массив наших пользователей
}

export const updateStatus = (status) => async (dispatch) => { //санки
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status)); //массив наших пользователей
    }
}

export const savePhoto = (file) => async (dispatch) => { //санки
        let response = await profileAPI.savePhoto(file);

        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos)); //массив наших пользователей
        }
}

export default profileReducer;