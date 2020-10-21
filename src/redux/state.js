const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

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
            ]
        },
        sidebar: {}


    },
    callSubscriber() {
        console.log('State changed');
    },
    getState() {
        debugger;
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }
    }

}

export const addPostActionCreator = () => ({ type: ADD_POST})


export const updateNewPostTextActionCreator = (text) => 
({type: UPDATE_NEW_POST_TEXT, newText: text})



window.store = store;
export default store;