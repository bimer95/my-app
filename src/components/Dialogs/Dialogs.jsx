import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogs-reducer';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';


const maxLength50 = maxLengthCreator (50);

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);
    let newMessageBody = state.newMessageBody;


    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    if (!props.isAuth) return <Redirect to={'/login'} />;// блокируем переход в messagec без логина 


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>   {messagesElements} </div>
            </div>
            <AddMessagesFormRedux onSubmit={addNewMessage} />

        </div>
    )
}
const AddMessagesForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea}
                validate={[required, maxLength50]}
                name='newMessageBody' placeholder='Enter your message' />

            <div>
                <button >Send </button>
            </div>
        </form>
    )
}

const AddMessagesFormRedux = reduxForm({
    //a unique name for the form
    form: 'dialogAddMessageForm'
})(AddMessagesForm)

export default Dialogs;