import React from 'react';
import s from './Post.module.css';

const Post = () => {
  return (
    <div className={s.item}>
      <img src='https://abali.ru/wp-content/uploads/2019/10/NationalGuardRussia.png'/>
      post 1
      <div>
        <span>like</span>
      </div>
    </div>
  )

}

export default Post;