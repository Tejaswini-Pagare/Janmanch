export const getAllMessageReducers = (state = {}, action) => {
  switch (action.type) {
    case "GET_COMMUNITY_REQUEST":
      return { ...state, loading: true };
    case "GET_COMMUNITY_SUCCESS":
      return { ...state, msgs: action.payload, loading: false };
    case "GET_COMMUNITY_FAILED":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
