import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TODO } from "../query/Query";
import NavBar from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

interface ToDoProps {
    todoId: string;
}

const ToDosList: React.FC<ToDoProps> = ({ todoId }) => {
    const {data, loading, error } = useQuery(GET_TODO, {
        variables: { todoId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <NavBar />
            {data && data.todo && (
                <div className="details">
                    <h2>To Do Details:</h2>
                    <p>ID: {data.todo.id}</p>
                    <p>Title: {data.todo.title}</p>
                    <p>Completed: {data.todo.completed ? "yes" : "no"}</p>
                </div>
            )}
        </div>
    );
};

export default ToDosList