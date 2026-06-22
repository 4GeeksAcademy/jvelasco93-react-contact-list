export const initialStore = () => {
    return {
        contacts: [],
    };
}

export default function storeReducer(state, action = {}) {
    switch (action.type) {
        case ACTIONS.SET_CONTACTS: {
            return {
                ...state,
                contacts: action.payload
            }
        }

        case ACTIONS.DELETE_CONTACT: {
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }
        }

        case ACTIONS.ADD_CONTACT: {
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        }

        case ACTIONS.UPDATE_CONTACT: {
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
            }
        }

        default:
            throw Error('Unknown action.');
    }
}
export const ACTIONS = {
    SET_CONTACTS: "SET_CONTACTS",
    ADD_CONTACT: "ADD_CONTACT",
    DELETE_CONTACT: "DELETE_CONTACT",
    UPDATE_CONTACT: "UPDATE_CONTACT",
}