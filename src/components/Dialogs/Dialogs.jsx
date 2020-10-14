import React from 'react';
import s from './Dialogs.module.css';

const Dialogs = (props) => {
    return (
        <div className={s.dialog}>
            <div className="dialog">
                Veniamin
            </div>
            <div className="dialog">
                Anton
            </div>
            <div className="dialog">
                Serge
            </div>
            <div className="dialog">
                Volod
            </div>
            <div className="messages">
                <div className="message">Hi</div>
                <div className="message">How are you?</div>
                <div className="message">Ok?</div>
            </div>
            </div>
    )
}

export default Dialogs;