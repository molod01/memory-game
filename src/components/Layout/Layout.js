import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";


const Layout = () => {
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    return (
        <>
            <header>
                <nav className="navbar navbar-expand navbar-light bg-light">
                    <div className="container-fluid">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Main</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <main className="d-flex justify-content-center align-items-center">
                <Outlet />
            </main>
        </>
    );
}

export default Layout;