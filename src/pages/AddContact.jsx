import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {contactsService} from "../services/contactsServices.js";
import useStore from "../hooks/useGlobalReducer.jsx";
import {ACTIONS} from "../storeReducer.js";

export default function AddContact() {
    const {dispatch} = useStore();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newContact = await contactsService.createContact(formData);
            dispatch({
                type: ACTIONS.ADD_CONTACT,
                payload: newContact
            })
            navigate("/");
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    return (
        <div className="container px-4 px-lg-3">
            <header className="d-flex justify-content-between align-items-center mt-4 mb-3">
                <h1 className="h3 mb-0">Add Contact</h1>
                <Link to="/" className="btn btn-success">Return to Contact List</Link>
            </header>

            <form onSubmit={handleSubmit} className="w-75 mx-auto mt-3">

                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" name="name"
                           placeholder="Full Name" value={formData.name} onChange={handleChange} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email"
                           placeholder="Email" value={formData.email} onChange={handleChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="tel" className="form-control" id="phone" name="phone"
                           placeholder="Phone" value={formData.phone} onChange={handleChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name="address"
                           placeholder="Address" value={formData.address} onChange={handleChange}/>
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">Add Contact</button>
                <Link to="/" className="icon-link">
                    <i className="fa-solid fa-arrow-left"></i>
                    Go Back to Contacts
                </Link>
            </form>
        </div>
    );
}