import React from 'react';
import { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth //узнаем залогин или не залогин

});

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to= '/login'/>// блокируем переход в messagec без логина
            return <Component {...this.props}/>
        }
    }

    
    let ConnectedAuthRedirectComponent = connect (mapStateToPropsForRedirect) (RedirectComponent);
    
    return ConnectedAuthRedirectComponent;
}