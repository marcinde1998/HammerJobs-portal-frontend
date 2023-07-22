const initialState = {
    userRights: []
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_USER_RIGHTS":
        return {
          ...state,
          userRights: action.payload
        };
      default:
        return state;
    }
  };
  
  export default authReducer;