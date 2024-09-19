import { Nav, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const NavBar: React.FC = () => {
    return (
        <Navbar expand="lg" className="navbar">
            <Nav className="me-auto">
                <Nav.Link className="NavLink" href="/">Home</Nav.Link>
                <Nav.Link className="NavLink" href="/profile">Profile</Nav.Link>
                <Nav.Link className="NavLink" href="/post">Posts</Nav.Link>
                <Nav.Link className="NavLink" href="/todos">To-Do's</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default NavBar;