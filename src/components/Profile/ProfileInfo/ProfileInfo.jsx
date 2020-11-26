import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/userman.png';
import ProfileDataForm from './ProfileDataForm';
import { Typography, Space } from 'antd';


const { Text, Link } = Typography;

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
                <div>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
               </div>

                { editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {setEditMode(true)} } profile={profile} isOwner={isOwner}/> }

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </div>
            </div>

    )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div className={s.info}>
        {isOwner && <div><button className={s.button2} onClick={goToEditMode}>Edit</button></div>}
        <div>
            <Text strong>Full name </Text>: {profile.fullName}
        </div>
        <div>
            <Text strong>Looking for a job</Text>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
        <div>
            <Text strong>My professional skills</Text>: {profile.lookingForAJobDescription}
        </div>
        }

        <div>
            <Text strong>About me</Text>: {profile.aboutMe}
        </div>
        <div>
            <Text strong>Contacts</Text>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
}


const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;