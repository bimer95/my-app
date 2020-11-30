import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormsControls/FormsControls';
import { login } from "../../redux/auth-reducer";
import { Redirect } from 'react-router-dom';
import style from "./../common/FormsControls/FormsControls.module.css";
import { AppStateType } from '../../redux/redux-store';

type LoginFormOwnProps {
    captchaUrl: string
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>& LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, { type: 'password' })}
            {createField(null, 'remember me', [], Input, { type: 'checkbox' }, "remember me")}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField('Symbols from image', 'captcha', [required], Input, {} )}

            { error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button> Login </button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm<number. number>({
    //a unique name for the form
    form: 'login'
})(LoginForm)

type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string

}

const Login: React.FC<MapStateToPropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return <div>
        <h1>LOGIN </h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div >
}
const mapStateToProps = (state: AppStateType):MapStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, { login })(Login);