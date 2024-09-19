import { useState, FormEvent, useRef, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POSTS, DELETE_POST, UPDATE_POST, CREATE_POST, GET_COMMENTS } from "../query/Mutation";
import { Form, Button } from "react-bootstrap";
import NavBar from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

const PostForm: React.FC = () => {
    const { data: postsData, loading: postsLoading } = useQuery(GET_POSTS);
    const [createPost] = useMutation(CREATE_POST);
    const [deletePost] = useMutation(DELETE_POST);
    const [updatePost] = useMutation(UPDATE_POST);
    const [showComments, setShowComments] = useState<string | null>(null);
    
    const inputTitle = useRef<HTMLInputElement>(null);
    const inputBody = useRef<HTMLInputElement>(null);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);

    const { data: commentsData, loading: commentsLoading } = useQuery(GET_COMMENTS, {
        variables: { postId: showComments || '' },
        skip: !showComments, // Skip fetching if no post is selected
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (inputTitle.current && inputBody.current) {
            createPost({
                variables: {
                    input: {
                        title: inputTitle.current.value,
                        body: inputBody.current.value,
                        userId: 1, // You might want to set a user ID dynamically
                    },
                },
                refetchQueries: [{ query: GET_POSTS }],
            }).catch((err) => console.error("Mutation error:", err));

            inputTitle.current.value = "";
            inputBody.current.value = "";
        }
    };

    const handleUpdate = (id: string, title: string, body: string) => {
        updatePost({
            variables: {
                id,
                input: {
                    title,
                    body,
                },
            },
        }).catch((err) => console.error("Mutation error:", err));
    };

    const handleDelete = (id: string) => {
        deletePost({
            variables: { id },
            update: (cache) => {
                const existingPosts = cache.readQuery({ query: GET_POSTS });
                const newPosts = existingPosts.posts.data.filter((post: any) => post.id !== id);

                cache.writeQuery({
                    query: GET_POSTS,
                    data: {
                        posts: {
                            ...existingPosts.posts,
                            data: newPosts,
                        },
                    },
                });
            },
        }).catch((err) => console.error("Mutation error", err));
    };

    const handleEditClick = (post: any) => {
        inputTitle.current!.value = post.title;
        inputBody.current!.value = post.body;
        setEditingPostId(post.id);
    };

    if (postsLoading) return <p>Loading...</p>;

    return (
        <div>
            <NavBar />
            <Form onSubmit={handleSubmit}>
                <h1>{editingPostId ? "Update Post" : "Create Post"}</h1>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Title Of Post"
                        ref={inputTitle}
                    />
                </Form.Group>

                <Form.Group controlId="formBody">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Body of Post"
                        ref={inputBody}
                    />
                </Form.Group>

                <Button
                    type="button"
                    onClick={(e: FormEvent) => {
                        if (editingPostId) {
                            handleUpdate(editingPostId, inputTitle.current!.value, inputBody.current!.value);
                        } else {
                            handleSubmit(e);
                        }
                    }}
                >
                    {editingPostId ? "Update Post" : "Create Post"}
                </Button>
            </Form>

            <h2>All Posts</h2>
            {postsData?.posts?.data.map((post: any) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <p>User ID: {post.userId}</p>
                    <Button onClick={() => handleDelete(post.id)}>
                        Delete
                    </Button>
                    <Button onClick={() => handleEditClick(post)}>
                        Edit
                    </Button>
                    <Button onClick={() => setShowComments(prev => prev === post.id ? null : post.id)}>
                        {showComments === post.id ? "Hide Comments" : "Show Comments"}
                    </Button>
                    {showComments === post.id && !commentsLoading && commentsData?.comments && (
                        <div>
                            <h4>Comments:</h4>
                            {commentsData.comments.map((comment: { id: Key | null | undefined; body: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; userId: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                                <div key={comment.id}>
                                    <p>{comment.body}</p>
                                    <p>User ID: {comment.userId}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PostForm;
