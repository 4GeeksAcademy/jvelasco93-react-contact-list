import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { ACTIONS, initialStore } from "../storeReducer.js";
import { contactsService } from "../services/contactsServices.js";
const StoreContext = createContext(null);

export function StateProvider({ children }) {
    const [state, dispatch] = useReducer(storeReducer, initialStore);

    useEffect(() => {
        const loadContacts = async () => {
            const contacts = await contactsService.initializeContacts();

            dispatch({
                type: ACTIONS.SET_CONTACTS,
                payload: contacts
            });
        };

        void loadContacts();
    }, []);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useStore must be used inside StateProvider");
    }
    return context;
}

export default useStore;
