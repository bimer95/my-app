import { type } from 'os';
import { AppStateType, InferActionsTypes } from './redux-store';
import { PhotosType, UserType } from './../types/types';
import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';





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
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray (state.users, action.userId, "id", {followed: true})

            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray (state.users, action.userId, "id", {followed: false})
            }
        case 'SET_USERS': {
            return { ...state, users: action.users }
        }
        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return { ...state, totalUsersCount: action.count }
        }
        case 'TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }

        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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

type ActionsTypes = InferActionsTypes <typeof actions>
function inferLiteralFromStrng <T extends string>(arg:T): T{
    return arg
}
export const actions = {
    followSuccess: (userId:number) => ({ type: inferLiteralFromStrng ('FOLLOW'), userId} as const),
    unfollowSuccess: (userId:number) => ({ type: inferLiteralFromStrng ('UNFOLLOW'), userId } as const),
    setUsers: (users:Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage:number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setUsersTotalCount: (totalUsersCount:number) => ({ type:'SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    toggleIsFetching: (isFetching:boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching:boolean, userId:number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
    
}
type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType =  ThunkAction <Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page:number, 
    pageSize:number): ThunkType => { //санки
    return async (dispatch, getState) => {
        dispatch(actions.setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items)); //массив наших пользователей
        dispatch(actions.setUsersTotalCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch:DispatchType, userId:number, apiMethod:any, actionCreator:(userId: number) => ActionsTypes) =>{
    dispatch(actions.toggleFollowingProgress (true, userId));
    let response = await apiMethod (userId);
    
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId:number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow (dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);

       
    }
}
export const unfollow = (userId:number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow (dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);

    }
}


export default userReducer;