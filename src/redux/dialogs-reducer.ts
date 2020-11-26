const SEND_MESSAGE = 'SEND_MESSAGE';

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

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action:any):InitialStateType => {

    
    let stateCopy;
    switch (action.type) {
        case SEND_MESSAGE: //добавление поста с текстом
        let body = action.newMessageBody;

           return {
                ...state,
            messages: [...state.messages, {id: 6, message: body}]
        };
        
        default:
            return state;
    }
}

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string):SendMessageCreatorActionType => ({ type: SEND_MESSAGE, newMessageBody })


export default dialogsReducer;