import { AppStateType } from './redux-store';
import { PhotosType, UserType } from './../types/types';
import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,// количество постов на странице
    totalUsersCount: 0,//количество постов
    currentPage: 1, //текушая страница
    isFetching: true,
    followingInProgress: [] as Array<number> //остановка кнопки
};

type InitialState = typeof initialState;

const userReducer = (state = initialState, action: ActionsTypes):InitialState => { /* Reducer функция с помощью которой идет модификация state */


    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray (state.users, action.userId, "id", {followed: true})

            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray (state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
}

type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType |
SetCurrentPageActionType | SetUsersTotalCountActionType | ToggleIsFetchingActionType | toggleFollowingProgressActionType

type FollowSuccessActionType = {
    type:typeof FOLLOW
    userId: number
}
type DispatchType = Dispatch<ActionsTypes>
type ThunkType =  ThunkAction <Promise<void>, AppStateType, unknown, ActionsTypes>

export const followSuccess = (userId:number):FollowSuccessActionType => ({ type: FOLLOW, userId })
type UnfollowSuccessActionType = {
    type:typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId:number):UnfollowSuccessActionType => ({ type: UNFOLLOW, userId })
type SetUsersActionType = {
    type:typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users:Array<UserType>):SetUsersActionType => ({ type: SET_USERS, users })
type SetCurrentPageActionType = {
    type:typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage:number):SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage })
type SetUsersTotalCountActionType = {
    type:typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setUsersTotalCount = (totalUsersCount:number):SetUsersTotalCountActionType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
type ToggleIsFetchingActionType = {
    type:typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching:boolean):ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })
type toggleFollowingProgressActionType = {
    type:typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

export const toggleFollowingProgress = (isFetching:boolean, userId:number):toggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })



export const requestUsers = (page:number, 
    pageSize:number): ThunkType => { //санки
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items)); //массив наших пользователей
        dispatch(setUsersTotalCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch:DispatchType, userId:number, apiMethod:any, actionCreator:(userId: number) => FollowSuccessActionType | UnfollowSuccessActionType) =>{
    dispatch(toggleFollowingProgress (true, userId));
    let response = await apiMethod (userId);
    
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId:number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow (dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);

       
    }
}
export const unfollow = (userId:number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow (dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);

    }
}


export default userReducer;