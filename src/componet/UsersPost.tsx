import { useState, FormEvent, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_POST, UPDATE_POST, CREATE_POST, GET_USER_POSTS } from "../query/Mutation";
import { Form, Button } from "react-bootstrap";
import NavBar from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

interface PostFormProps {
    postId?: string;
}

const PostForm: React.FC<PostFormProps> = ({ postId }) => {
    const { data: postsData, loading: postsLoading } = useQuery(GET_USER_POSTS);
    const [createPost, { data: createData, loading: createLoading }] = useMutation(CREATE_POST);
    const [deletePost] = useMutation(DELETE_POST);
    const [updatePost] = useMutation(UPDATE_POST);

    const inputTitle = useRef<HTMLInputElement>(null);
    const inputBody = useRef<HTMLInputElement>(null);
    const inputUserId = useRef<HTMLInputElement>(null);

    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [visiblePosts, setVisiblePosts] = useState<number>(10); // State to track visible posts

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (inputTitle.current && inputBody.current) {
            try {
                await createPost({
                    variables: {
                        input: {
                            title: inputTitle.current.value,
                            body: inputBody.current.value,
                        },
                    },
                    refetchQueries: [{ query: GET_USER_POSTS }],
                });

                inputTitle.current.value = "";
                inputBody.current.value = "";
            } catch (err) {
                console.error("Mutation error:", err);
            }
        }
    };

    const handleUpdate = async (id: string, title: string, body: string) => {
        try {
            await updatePost({
                variables: {
                    id,
                    input: {
                        title,
                        body,
                    },
                },
                refetchQueries: [{ query: GET_USER_POSTS }],
            });
            setEditingPostId(null);
        } catch (err) {
            console.error("Mutation error:", err);
        }
    };

    const handleDelete = (id: string) => {
        deletePost({
            variables: { id },
            update: (cache) => {
                const existingPosts = cache.readQuery({ query: GET_USER_POSTS });
                const newPosts = existingPosts.posts.data.filter((post: any) => post.id !== id);

                cache.writeQuery({
                    query: GET_USER_POSTS,
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

    const handleShowMore = () => {
        setVisiblePosts(prev => prev + 10);
    };

    if (postsLoading || createLoading) return <p>Loading...</p>;

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
                    type="submit"
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

            {createData && createData.createPost && (
                <div>
                    <h2>Newly Created Post:</h2>
                    <p>ID: {createData.createPost.id}</p>
                    <p>Title: {createData.createPost.title}</p>
                    <p>Body: {createData.createPost.body}</p>
                </div>
            )}

            <h2>All Posts</h2>
            {postsData?.posts?.data.slice(0, visiblePosts).map((post: any) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <p>User ID: {post.user.id}</p>
                    <Button onClick={() => handleDelete(post.id)}>
                        Delete
                    </Button>
                    <Button onClick={() => handleEditClick(post)}>
                        Edit
                    </Button>
                </div>
            ))}
            {visiblePosts < (postsData?.posts?.data.length || 0) && (
                <Button onClick={handleShowMore}>
                    Show More
                </Button>
            )}
        </div>
    );
};

export default PostForm;
