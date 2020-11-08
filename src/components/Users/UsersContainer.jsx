import React from 'react';
import { connect } from "react-redux";
import { follow, setCurrentPage, unfollow, toggleFollowingProgress, getUsers } from "../../redux/users-reducer";
import * as axios from 'axios';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { usersAPI } from '../../api/api';



class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);

    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

        render() {
            return <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    toggleFollowingProgress={this.props.toggleFollowingProgress}
                    followingInProgress={this.props.followingInProgress}



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
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress

    }
}

export default connect(mapStateToProps, {
    follow, // follow: (userId) => {dispatch(follow(userId));},
    unfollow, //unfollow: (userId) => {dispatch(unfollow(userId));
    setCurrentPage,
    toggleFollowingProgress,
    getUsers
})(UsersContainer);
