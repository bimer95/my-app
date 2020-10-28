import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hi, how are you?', likesCount: 12 },
                { id: 2, message: 'It\'s my first post', likesCount: 11 },
                { id: 3, message: 'Blabla', likesCount: 11 },
                { id: 4, message: 'Dada', likesCount: 11 }
            ],
            newPostText: 'rosgvarDd'
        },
        dialogsPage: {
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
        },
        sidebar: {}


    },
    _callSubscriber() {
        console.log('State changed');
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer (this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer (this._state.dialogsPage, action);
        this._state.sidebarPage = sidebarReducer (this._state.sidebarPage, action);
        
        this._callSubscriber(this._state);
    }
}






        window.store = store;
        export default store;