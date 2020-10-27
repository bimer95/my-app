const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
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
    ],
    newMessageBody: ""
};

const dialogsReducer = (state = initialState, action) => {

    let stateCopy = {
        ...state,
        /* messages: [...state.messages] */
    };
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: //изменение текста
            stateCopy.newMessageBody = action.body;
            return stateCopy;
        case SEND_MESSAGE:{ //добавление поста с текстом
            let body = state.newMessageBody;
            
            stateCopy.messages.push({id: 6, message: body});
            stateCopy.newMessageBody = '';
            return stateCopy;
        }
        default:
            return state;
    }
}

export const sendMessageCreator = () => ({ type: SEND_MESSAGE })
export const updateNewMessageBodyCreator = (body) =>
    ({ type: UPDATE_NEW_MESSAGE_BODY, body: body })

export default dialogsReducer;