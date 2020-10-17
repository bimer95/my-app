let state = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 11},
            {id: 3, message: 'Blabla', likesCount: 11},
            {id: 4, message: 'Dada', likesCount: 11}
        ]
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Veniamin'},
            {id: 2, name: 'Volod'},
            {id: 3, name: 'Serge'},
            {id: 4, name: 'Dmitry'},
        ],
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'How is your?'},
            {id: 3, message: 'Ok'},
        ]
    },
    sidebar: {}
}

export default state;