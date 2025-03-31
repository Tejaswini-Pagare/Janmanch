import axios from "axios";
// import API from "../utils/api";

export const getAllMessage = () => async (dispatch) => {
  dispatch({ type: "GET_COMMUNITY_REQUEST" });

  try {
    console.log(import.meta.env.VITE_API_BASE_URL);
    const response = await axios.get('https://janmanch-cep.onrender.com/api/community/getallmessage');
    console.log("API Response Data:", response.data);  // Log the response to ensure we get the correct data
    dispatch({ type: "GET_COMMUNITY_SUCCESS", payload: response.data });
    
    console.log(import.meta.env);
  } catch (error) {
    dispatch({
      type: "GET_COMMUNITY_FAILED",
      payload: error.response?.data?.message || error.message,
    });
  }
};
