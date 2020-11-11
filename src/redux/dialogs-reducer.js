const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, name: 'Veniamin' },
        { id: 2, name: 'Volod' },
        { id: 3, name: 'Serge' },
        { id: 4, name: 'Dmitryy' },
    ],
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your?' },
        { id: 3, message: 'Ok' },
    ]
    
};

const dialogsReducer = (state = initialState, action) => {

    
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

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })


export default dialogsReducer;