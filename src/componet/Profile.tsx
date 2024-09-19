import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../query/Query";
import NavBar from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage: React.FC = () => {
    const userId = "1"; 
    const { data, loading, error } = useQuery(GET_USER, {
        variables: { id: userId }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <NavBar/>
            {data && data.user && (
                <div className="div">
                    <h2>User Details:</h2>
                    <p>Name: {data.user.name}</p>
                    <p>ID: {data.user.id}</p>
                    <p>Username: {data.user.username}</p>
                    <p>Phone: {data.user.phone}</p>
                    <p>Email: {data.user.email}</p>
                    <p>Website: {data.user.website}</p>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;