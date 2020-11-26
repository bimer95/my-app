import { Button, Col, Menu, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Layout from 'antd/lib/layout/layout';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import s from './Header.module.css';
import { UserOutlined } from '@ant-design/icons';
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth-reducer';

/* export type MapPropsType = {
    isAuth: boolean
    login: string | null
}

export const AppHeader: React.FC <MapPropsType> = (props) => {
    
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()

    const logoutCallback =() => {
        dispatch(logout())

    }
    
    const {Header } = Layout;
    
    return  <Header className="header">
    <div className="logo" />
    <Row>
           <Col span={20}>  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      <Menu.Item key="1"><Link to="/developers">Developers</Link></Menu.Item>
    </Menu></Col>
    <Col span={4}>
    { isAuth ? 
            <div>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />}/>
                {login} - <Button onClick={logoutCallback}>Log out</Button></div>
                : <Link to={'/login'}>Login</Link> }</Col>
    </Row>
    
  </Header> */
    
    
  /*   <header className={s.header}>
        <img src='https://nedelya40.ru/wp-content/uploads/2019/05/6394e7b4035b9bc93cd0.png' />
    
        <div className={s.loginBlock}>
            { props.isAuth ? 
            <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                : <NavLink to={'/login'}>Login</NavLink> }
    </div>
    </header> */


