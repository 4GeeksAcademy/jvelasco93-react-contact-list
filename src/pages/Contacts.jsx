import {useStore} from "../hooks/useGlobalReducer.jsx";
import {ACTIONS} from "../storeReducer.js";
import {ContactCard} from "../components/ContactCard.jsx";
import {Link} from "react-router-dom";
import {contactsService} from "../services/contactsServices.js";


export function Home() {
    const {state, dispatch} = useStore();

    async function handleDeleteContact(contactId) {
        try {
            await contactsService.deleteContact(contactId);

            dispatch({
                type: ACTIONS.DELETE_CONTACT,
                payload: contactId
            });
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    }

    async function handleRefresh() {
        try {
            const contacts = await contactsService.getContacts();
            dispatch({
                type: ACTIONS.SET_CONTACTS,
                payload: contacts
            });
        } catch (error) {
            console.error("Error refreshing contacts:", error);
        }
    }

    if (state.contacts.length === 0) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning">
                    No contacts found. They may not exist or could have been added from another device.
                </div>

                <div className="d-flex justify-content-end gap-3">
                    <Link to="/new-contact" className="btn btn-primary">
                        Add Contact
                    </Link>

                    <button
                        className="btn btn-outline-secondary"
                        onClick={handleRefresh}
                    >
                        Refresh
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container px-4 px-lg-3">
            <header className="d-flex justify-content-between align-items-center mt-4 mb-3">
                <h1 className="h3 mb-0">Contact List</h1>
                <Link to="/new-contact" className="btn btn-success">Add Contact</Link>
            </header>

            <div className="d-flex justify-content-end mb-3">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleRefresh}
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


