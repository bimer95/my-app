import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import store from './redux/store';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

const App = (props) => {
    
    return (
            <div className='app-wrapper'>
                <Header />
                <Navbar />
                <div class='app-wrapper-content'>
                    <Route path='/dialogs' /* Route следит за url в браузере если
                                               он совпадает то рендерит его */
                           render={ () => <DialogsContainer/> }/>

                    <Route path='/profile'
                           render={ () => <ProfileContainer /> }/>
                    <Route path='/users'
                           render={ () => <UsersContainer /> }/>
                </div>
            </div>)
}

export default App;