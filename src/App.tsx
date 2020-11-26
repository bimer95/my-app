import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Navbar from './components/Navbar/Navbar';
import { Redirect, Route, withRouter, Switch, NavLink, Link } from "react-router-dom";
import UsersContainer from './components/Users/UsersContainer';
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import LoginPage from './components/Login/Login';
import { connect } from "react-redux";
import { getAuthUserData } from "./redux/auth-reducer";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import { withSuspens } from './components/hoc/withSuspens';
import { Button } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import store, {AppStateType} from "./redux/redux-store";
import { Alert } from 'antd';





//import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));//ленивая загрузка
//import ProfileContainer from './components/Profile/ProfileContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));//ленивая загрузка

const { SubMenu } = Menu;
const {Content, Footer, Sider } = Layout;

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}


class App extends Component<MapPropsType & DispatchPropsType> {

       catchAllUnhandledErrors = (e: PromiseRejectionEvent) => { //обработчик ошибок
              alert("Some error occured")

       }

       componentDidMount() {//срабатывает один раз когда компонента в монтируется
              this.props.initializeApp();
              window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
       }
       componentWillUnmount() {
              window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
       }


       render() {
              if (!this.props.initialized) {
                     return <Preloader />
              }


              return (
                    /*  <div className='app-wrapper'>
                            <HeaderContainer />
                            <Navbar />
                            <div className='app-wrapper-content'>
                            <Switch>
                                   <Route exact path='/'
                                          render={() => <Redirect to={"/profile"} />} />
                                   <Route path='/dialogs' /* Route следит за url в браузере если
                                               он совпадает то рендерит его 
                                          render={withSuspens(DialogsContainer)} />

                                   <Route path='/profile/:userId?'
                                          render={withSuspens(ProfileContainer)} />
                                   <Route path='/users'
                                          render={() => <UsersContainer pageTitle={"Самураи"} />} />
                                   <Route path='/login'
                                          render={() => <LoginPage />} />
                                   <Route path='*'
                               render={() => <div>404 NOT FOUND
                               </div>}/>
                               </Switch>
                            </div>
                     </div>   */
                     <Layout>
                            {/* <Header /> */}
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            /* defaultOpenKeys={['sub1']} */
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
              <Menu.Item key="1"><Link to="/profile" >Profile</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/dialogs" >Messages</Link></Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
              <Menu.Item key="5"><Link to="/developers">Developers</Link></Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Switch>
                                   <Route exact path='/'
                                          render={() => <Redirect to={"/profile"} />} />
                                   <Route path='/dialogs' /* Route следит за url в браузере если
                                               он совпадает то рендерит его */
                                          render={withSuspens(DialogsContainer)} />

                                   <Route path='/profile/:userId?'
                                          render={withSuspens(ProfileContainer)} />
                                   {/* <Route path='/developers'
                                          render={() => <UsersContainer />} /> */}
                                   <Route path='/login'
                                          render={() => <LoginPage />} />
                                   <Route path='*'
                               render={() =>  <Alert message="Error" type="error" showIcon />}/>
                               </Switch>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
              )
                               }
}

const mapStateToProps = (state: AppStateType) => ({
       initialized: state.app.initialized
})



export default compose(
       withRouter,
       connect(mapStateToProps, { initializeApp }))(App);