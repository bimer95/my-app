import { FormAction } from 'redux-form/lib/actions';
import { InferActionsTypes, BaseThunkType } from './redux-store';
import { profileAPI } from './../api/profile-api';
import { PostType, ProfileType, PhotosType } from './../types/types';
import { stopSubmit } from "redux-form";


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



const profileReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST': { //добавление поста с текстом
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

        case 'SN/PROFILE/SET_STATUS': {  //изменение текста
            return {
                ...state,
                status: action.status

            };

        }
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return { ...state, profile: action.profile }
        }
        case 'SN/PROFILE/SEVE_PHOTO_SUCCESS': {
            return { ...state, profile: {...state.profile, photos:action.photos} as ProfileType }
        }
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({ type: 'SN/PROFILE/ADD-POST', newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SN/PROFILE/SET_USER_PROFILE', profile } as const),
    setStatus: (status:string) => ({ type: 'SN/PROFILE/SET_STATUS', status } as const),
    savePhotoSuccess: (photos:PhotosType) => ({ type: 'SN/PROFILE/SEVE_PHOTO_SUCCESS', photos } as const)
}



export const getUserProfile = (userId:number): ThunkType => async (dispatch) => { //санки
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data)); //массив наших пользователей
}

export const getStatus = (userId:number): ThunkType => async (dispatch) => { //санки
    let data = await profileAPI.getStatus(userId);
    debugger;
    dispatch(actions.setStatus(data)); //массив наших пользователей
}

export const updateStatus = (status:string): ThunkType => async (dispatch) => { //санки
    try {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status)); //массив наших пользователей
    }
} catch (error){
    //можно доделать ошибку
}
}
export const savePhoto = (file:File): ThunkType => async (dispatch) => { //санки
        let data = await profileAPI.savePhoto(file);

        if (data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(data.data.photos)); //массив наших пользователей
        }
}

export const saveProfile = (profile:ProfileType): ThunkType => async (dispatch, getState) => { //санки
    const userId = getState() .auth.userId;
    const data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
        if (userId != null){
        dispatch(getUserProfile (userId)); //массив наших пользователей
    } else {
        throw new Error("userId can't be null")
    }
}else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages [0]}));//("edit-profile", {'contacts': {facebook': response.data.messages [0]}}));(для каждого эллемента)
        return Promise.reject(data.messages[0]);
    }
}


export default profileReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>