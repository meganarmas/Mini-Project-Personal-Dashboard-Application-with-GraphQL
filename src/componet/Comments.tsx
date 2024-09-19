import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from '../query/Query';
import NavBar from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Comment {
    id: string;
    body: string;
    name: string;
}

interface CommentsProps {
    userId: string;
}

const Comments: React.FC<CommentsProps> = ({ userId }) => {
    const { data, loading, error } = useQuery(GET_COMMENTS, {
        variables: { userId },
    });

    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error fetching comments: {error.message}</p>;

    const comments: Comment[] = data.user.comments;

    return (
        <div>
            <NavBar />
            <h2>User Comments</h2>
            {comments.length === 0 ? (
                <p>No comments found.</p>
            ) : (
                comments.map(comment => (
                    <div key={comment.id}>
                        <strong>{comment.name}</strong>
                        <p>{comment.body}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Comments;
