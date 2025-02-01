import axios from "axios";

export const getAllMessage = () => async (dispatch) => {
  dispatch({ type: "GET_COMMUNITY_REQUEST" });

  try {
    const response = await axios.get("/api/community/getallmessage");
    console.log("API Response Data:", response.data);  // Log the response to ensure we get the correct data
    dispatch({ type: "GET_COMMUNITY_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "GET_COMMUNITY_FAILED",
      payload: error.response?.data?.message || error.message,
    });
  }
};
