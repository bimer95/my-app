import React from 'react';
import s from './Music.module.css';

const Music = (props) => {
  return (
    <div className={s.item}>
      <img src='https://abali.ru/wp-content/uploads/2019/10/NationalGuardRussia.png' />
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  )

}

export default Music;