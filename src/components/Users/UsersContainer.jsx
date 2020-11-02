import React from 'react';
import {connect} from "react-redux";
import {follow, setCurrentPage, setUsersTotalCount, setUsers, unfollow, toggleIsFetching} from "../../redux/users-reducer";
import * as axios from 'axios';
import Users from './Users'; 
import Preloader from '../common/Preloader/Preloader';

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching (true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items); //массив наших пользователей
                this.props.setUsersTotalCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items); //массив наших пользователей 
            });
    }

    render() {

        return <>
        {this.props.isFetching ? <Preloader/>: null}
        <Users totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.follow}
            unfollow={this.props.unfollow}

        />
        </>
    }
}

let mapStateToProps = (state) => { //функция возвращающая объект
    return {
        users: state.usersPage.users,//берем из state какие то части нужные нам
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching:state.usersPage.isFetching
    }
}

/* let mapDispatchToProps = (dispatch) => { //функция возвращающая объект
    return {
        follow: (userId) => {
            dispatch(follow(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollow(userId));
        },
        setUsers: (users) => {
            dispatch(setUsers(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPage ())
        },
        setUsersTotalCount: (totalCount) => {
            dispatch(setUsersTotalCount (totalCount))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetching (isFetching));
        } 
    }
    
} */



export default connect(mapStateToProps, {
    follow, // follow: (userId) => {dispatch(follow(userId));},
unfollow, //unfollow: (userId) => {dispatch(unfollow(userId));
setUsers,
setCurrentPage,
setUsersTotalCount,
toggleIsFetching
})(UsersContainer);
