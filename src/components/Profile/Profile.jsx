import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';

const Profile = () => {
    return (
        <div>
            <div>
                <img src='https://psj.ru/images/Zhanna/11042020/flag-vojsk13.jpg' />
            </div>
            <div>
                ava + descr
            </div>
            <MyPosts />
        </div> 
    )
}

export default Profile;