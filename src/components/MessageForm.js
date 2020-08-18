import React, { useState } from 'react';
import {useMutation} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';


const CREATE_MESSAGE = gql`
    mutation CreateMessage($title: String!, $content: String!, $author: String!) {
        createMessage(title: $title, content: $content, author: $author) {
            author
        }
    }
`;

const MessageForm = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [createMessage] = useMutation(CREATE_MESSAGE)

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={async e => {
                            e.preventDefault();
                            console.log(title, content, author);
                            await createMessage({variables: {title, content, author}});
                            window.location.href="/";
                        }}>
                            <div className="form-group">
                                <input type="text" placeholder="author" className="form-control" onChange={e => setAuthor(e.target.value)} value={author} />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="write a title" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="content..." className="form-control" onChange={e => setContent(e.target.value)} value={content} />
                            </div>
                            <button className="btn btn-primary btn-block">save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageForm