export const getInitialState = () => {
  return {
    contacts: [],
  };
}

export default function reducer(state, action = {}) {
  switch (action.type) {
    case ACTIONS.SET_CONTACTS: {
      return {
        ...state,
        contacts: action.payload
      }
    }

    default:
      throw Error('Unknown action.');
  }
}
export const ACTIONS = {
  SET_CONTACTS: "SET_CONTACTS"
}