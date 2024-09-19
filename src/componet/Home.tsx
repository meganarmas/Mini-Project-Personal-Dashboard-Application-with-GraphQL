import React from "react";
import NavBar from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage: React.FC = () => {
    return (
        <div>
            <NavBar />
            <h1>Welcome to the Personal Dashboard Application with GraphQL project!</h1>
            <p>Use one of the links above to navigate where to go!</p>
        </div>
    );
};

export default HomePage;