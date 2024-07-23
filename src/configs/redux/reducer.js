const initialState = {
  userCredential: { noLogin: true }
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_AUTH_CREDENTIAL":
      const data = {
        ...initialState,
        userCredential: action.newValue
      };
      return data;
    case "DELETE_AUTH_CREDENTIAL":
      const cData = {
        ...initialState,
        userCredential: { noLogin: true }
      };
      return cData;
    default:
      return state;
  }
};

export default appReducer;
