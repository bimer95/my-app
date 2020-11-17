import profileReducer, { addPostActionCreator } from "./profile-reducer";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('length of posts should be incremented', () => {
    let action = addPostActionCreator ("Rosg");
    let state = {
        posts: [
            { id: 1, message: 'Hi, how are you?', likesCount: 12 },
            { id: 2, message: 'It\'s my first post', likesCount: 11 },
            { id: 3, message: 'Blabla', likesCount: 11 },
            { id: 4, message: 'Dada', likesCount: 11 }
        ]
    };
    let newState = profileReducer(state, action);

    expect(newState.posts.length) .toBe(5);
  });

