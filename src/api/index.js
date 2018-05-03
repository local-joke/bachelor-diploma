import axios from 'axios'

export function getMethod(endpoint, action) {
    return (dispatch) => {
        return axios.get("http://127.0.0.1:5000/GetNotesByCreatorId?creatorId=1")
            .then((response) => {
                    dispatch(() => {
                        return {
                            type: FETCH_NOTES,
                            payload: response.data
                        }
                    });
                }
            )
            .catch((error) => console.log(error))
    }
}