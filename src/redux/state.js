import {rerenderEntireTree} from "../render";

let state = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 11},
            {id: 3, message: 'Blabla', likesCount: 11},
            {id: 4, message: 'Dada', likesCount: 11}
        ],
        newPostText: 'rosgvard'
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Veniamin'},
            {id: 2, name: 'Volod'},
            {id: 3, name: 'Serge'},
            {id: 4, name: 'Dmitryy'},
        ],
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'How is your?'},
            {id: 3, message: 'Ok'},
        ]
    },
    sidebar: {}
}

export let addPost = (postMessage) => {
    let newPost = {
        id: 5,
        message: postMessage,
        likesCount: 0
    };
    
    state.profilePage.posts.push(newPost);
    rerenderEntireTree (state);
}

export let updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree (state);
}

export default state;