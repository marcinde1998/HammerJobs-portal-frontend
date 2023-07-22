import axios from "axios";

export const setUserRights = (rights) => ({
  type: "SET_USER_RIGHTS",
  payload: rights
});

export const fetchUserRights = (token) => (dispatch) => {
  axios
    .post("http://localhost:8080/decodingAuthorization", {}, {
      headers: {
        Authorization: token
      }
    })
    .then((response) => {
      dispatch(setUserRights(response.data.user.rights));
    })
    .catch((error) => {
      alert("Nie udana autoryzacja dostępu.");
    });
};