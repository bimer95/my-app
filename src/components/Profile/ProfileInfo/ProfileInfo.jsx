import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStaus from './ProfileStatus';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/userman.png';
const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {




    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            {/* <div>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Flag_of_National_Guard_Forces_Command.svg/1200px-Flag_of_National_Guard_Forces_Command.svg.png'/>
            </div> */}
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                <ProfileStatusWithHooks status= {status} updateStatus ={updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;