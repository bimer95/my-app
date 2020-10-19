import React from 'react';
import s from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Flag_of_National_Guard_Forces_Command.svg/1200px-Flag_of_National_Guard_Forces_Command.svg.png'/>
            </div>
            <div className={s.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;