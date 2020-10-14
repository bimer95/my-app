import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Dialogs from "./components/Dialogs/Dialogs";
import Header from './components/Header/Header';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';

const App = () => {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div class='app-wrapper-content'>
          <Route path='/dialogs' component={Dialogs} />
          <Route path='/profile' component={Profile} /> 
          <Route path='/new' component={News} />
          <Route path='/music' component={Music} />
          <Route path='/setting' component={Settings} />
        </div>
      </div>
    </BrowserRouter>
  )
}




export default App;
