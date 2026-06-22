import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useStore} from "../hooks/useGlobalReducer.jsx";
import {ACTIONS} from "../storeReducer.js";
import {contactsService} from "../services/contactsServices.js";

export default function EditContact() {
    const {state, dispatch} = useStore();
    const {id} = useParams();
    const navigate = useNavigate();
    const contact = state.contacts.find(contact => contact.id === Number(id));
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (!contact) {
            return;
        }
        setFormData({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            address: contact.address,
        });
    }, [contact]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedContact =
                await contactsService.updateContact(
                    id,
                    formData
                );

            dispatch({
                type: ACTIONS.UPDATE_CONTACT,
                payload: updatedContact
            });

            navigate("/");
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    if (!contact) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">
                    Contacto no encontrado
                </div>
                <Link to="/" className="btn btn-primary">Volver</Link>
            </div>
        )
    }

    return (
        <div className="container px-4 px-lg-3">
            <header className="d-flex justify-content-between align-items-center mt-4 mb-3">
                <h1 className="h3 mb-0">Edit Contact</h1>

                <Link to="/" className="btn btn-success">
                    Return to Contact List
                </Link>
            </header>

            <form onSubmit={handleSubmit} className="w-75 mx-auto mt-3">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Full Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        Address
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Phone
                    </label>

                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                >
                    Edit Contact
                </button>

                <Link to="/" className="icon-link">
                    <i className="fa-solid fa-arrow-left"></i>
                    Go Back to Contacts
                </Link>
            </form>
        </div>
    );
}