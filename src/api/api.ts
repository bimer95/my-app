
import axios, { AxiosResponse } from 'axios';
import { ProfileType, UserType } from '../types/types';


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'cdfcfab0-ced9-4712-bc59-a987f8ed1b29'
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCapcthaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D= {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}






