import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator (10);

const MyPosts = React.memo (props => {
    let postsElements =
        props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

    let newPostElement = React.createRef();



    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
            
        </div>
    )
});

const AddNewPostForm = (props) => {
   return ( 
    <form onSubmit = {props.handleSubmit}> 
    <Field component = {Textarea} name = 'newPostText' placeholder = {'Enter your message'} 
    validate={[required, maxLength10]}/>
                <div>
                    <button>Add post</button>
                </div>
           
    </form>
   )
}

const AddNewPostFormRedux = reduxForm({
    //a unique name for the form
    form: 'ProfileAddNewPostForm'
})(AddNewPostForm)

export default MyPosts;