import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import {useEffect} from "react";
import {ACTIONS} from "../reducer.js";
import {ContactCard} from "../components/ContactCard.jsx";
import {Link} from "react-router-dom";
import {contactsService} from "../services/contactsServices.js";


export function Home() {
    const {state, dispatch} = useGlobalReducer();

    useEffect(() => {
             void loadContacts();
    }, []);

    async function loadContacts() {
        try {
            const contacts = await contactsService.getContacts();

            dispatch({
                type: ACTIONS.SET_CONTACTS,
                payload: contacts
            });
        } catch (error) {
            console.error("Error loading contacts:", error);
        }
    }

    async function handleDeleteContact(contactId) {
        try {
            await contactsService.deleteContact(contactId);
        } catch (error) {
            console.error("Error deleting contact:", error);
        } finally {
            await loadContacts();
        }
    }

    return (
        <div className="container px-4 px-lg-3">
            <header className="d-flex justify-content-between align-items-center mt-4 mb-3">
                <h1 className="h3 mb-0">Add Contact</h1>
                <Link to="/new-contact" className="btn btn-success">Add Contact</Link>
            </header>

            <div className="d-flex justify-content-end mb-3">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => void loadContacts()}
                >
                    Refresh
                </button>
            </div>

            <ul className="list-group gap-3">
                {state.contacts.map(contact => (
                    <ContactCard
                        key={contact.id}
                        contact={contact}
                        onDelete={handleDeleteContact}
                    />
                ))}
            </ul>

        </div>
    );
}


