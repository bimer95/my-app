import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';


const ProfileInfo = (props) => {
    if (!props.profile) {
        return<Preloader />
    }
    return (
        <div>
            <div>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Flag_of_National_Guard_Forces_Command.svg/1200px-Flag_of_National_Guard_Forces_Command.svg.png'/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;