import {Link} from "react-router-dom";

export default function AddContact() {
    return (
        <div className="container px-4 px-lg-3">
            <header className="d-flex justify-content-between align-items-center mt-4 mb-3">
                <h1 className="h3 mb-0">Add Contact</h1>
                <Link to="/" className="btn btn-success">Return to Contact List</Link>
            </header>
        </div>
    );
}