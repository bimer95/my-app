import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state, {addPost, subscribe, updateNewPostText} from './redux/state';
import {BrowserRouter} from "react-router-dom";

let rerenderEntireTree = (state) => {
    ReactDOM.render(
    <BrowserRouter>
        <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/> 
        </BrowserRouter>, document.getElementById('root'));
    }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
rerenderEntireTree(state);

subscribe (rerenderEntireTree);