import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter } from "react-router-dom";
import UsersContainer from './components/Users/UsersContainer';

import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { connect } from "react-redux";
import { getAuthUserData } from "./redux/auth-reducer";
import { compose } from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import { withSuspens } from './components/hoc/withSuspens';


//import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));//ленивая загрузка
//import ProfileContainer from './components/Profile/ProfileContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));//ленивая загрузка



class App extends Component {
       componentDidMount() {
              this.props.initializeApp();
       }
       render() {
              if (!this.props.initialized) {
                     return <Preloader />
              }

              return (
                     <div className='app-wrapper'>
                            <HeaderContainer />
                            <Navbar />
                            <div className='app-wrapper-content'>
                                   <Route path='/dialogs' /* Route следит за url в браузере если
                                               он совпадает то рендерит его */
                                          render={withSuspens(DialogsContainer)} />

                                   <Route path='/profile/:userId?'
                                          render={withSuspens  (ProfileContainer)} />
                                   <Route path='/users'
                                          render={() => <UsersContainer />} />
                                   <Route path='/login'
                                          render={() => <LoginPage />} />
                            </div>
                     </div>
              )
       }
}

const mapStateToProps = (state) => ({
       initialized: state.app.initialized
})

export default compose(
       withRouter,
       connect(mapStateToProps, { initializeApp }))(App);