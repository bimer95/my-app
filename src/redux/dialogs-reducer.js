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

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:{ //изменение текста
            let stateCopy = {...state};
            stateCopy.newMessageBody = action.body;
            return stateCopy;
        }
        case SEND_MESSAGE:{ //добавление поста с текстом
            let messag = {
                id: 6,
                message: body
            };
            let body = state.newMessageBody;
            let stateCopy = {...state};
            stateCopy.messages = [...state.messages];
            stateCopy.messages.push(messag);
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