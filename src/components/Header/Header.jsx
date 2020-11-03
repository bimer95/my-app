import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = (props) => {
    return <header className={s.header}>
        <img src='https://nedelya40.ru/wp-content/uploads/2019/05/6394e7b4035b9bc93cd0.png' />
    
        <div className={s.loginBlock}>
            { props.isAuth ? props.login
                : <NavLink to={'/login'}>Login</NavLink> }
    </div>
    </header>
}

export default Header;
