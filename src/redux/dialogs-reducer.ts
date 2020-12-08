import { InferActionsTypes } from './redux-store';


type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        { id: 1, name: 'Veniamin' },
        { id: 2, name: 'Volod' },
        { id: 3, name: 'Serge' },
        { id: 4, name: 'Dmitryy' },
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your?' },
        { id: 3, message: 'Ok' },
    ]as Array<MessageType>
    
};



const dialogsReducer = (state = initialState, action:ActionsType):InitialStateType => {

    
    let stateCopy;
    switch (action.type) {
        case 'SN/DIALOGS/SEND_MESSAGE': //добавление поста с текстом
        let body = action.newMessageBody;

           return {
                ...state,
            messages: [...state.messages, {id: 6, message: body}]
        };
        
        default:
            return state;
    }
}



export const actions = {
    sendMessage: (newMessageBody: string) => ({ type: 'SN/DIALOGS/SEND_MESSAGE', newMessageBody } as const)

}



export default dialogsReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>