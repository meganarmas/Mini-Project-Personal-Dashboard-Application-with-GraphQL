import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../query/Query";
import NavBar from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage: React.FC = () => {
    const { data, loading, error } = useQuery(GET_USER);

    if (loading) return <p>Loading...</p>;
    if (error) return <p> Error! {error.message}</p>;

    return (
        <div>
            <NavBar />
            {data && data.user && (
            <div className="userDetails">
            <h2>User Details:</h2>
                <p>Name: {data.user.name}</p>
                <p>User ID: {data.user.id}</p>
                <p>Email: {data.user.Email}</p>
                <p>Phone: {data.user.phone}</p>
                <p>Website: {data.user.website}</p>
                <p>Company: {data.user.company}</p>
                </div>
        )}
        </div>
    );
};

export default ProfilePage;