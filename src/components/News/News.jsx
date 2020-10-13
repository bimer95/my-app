import React from 'react';
import s from './News.module.css';

const News = (props) => {
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

export default News;