import axios from "axios";
import {updateLoading,updateStopFetching} from "../../../redux/slices/dashBoardPageSlice"
import {handleUpdateArticles} from "../handlers/handleUpdateArticles"

export const fetchNextPage = (dispatch,pageNumber,articles,accessToken) => {
    
    // display loading spinner
    dispatch(updateLoading(true)); 

    // Setup required http headers
    const config = { 
        headers: {
        'accept': 'application/json', 
        "Authorization": "Bearer " + accessToken
        }
    };

    // Initiate a post request, with username and password, to Login API
    axios.get("http://34.245.213.76:3000" + "/articles?page="+pageNumber, config)
    .then((response) => { 
        if (response.status >= 200 && response.status <= 299){ //check for successful status code
            if(response.data.response.docs.length){ // check that docs is not empty in response
                console.log(response.data.response.docs);
                handleUpdateArticles(response.data.response.docs,articles,dispatch); // save articles response in redux store
            }
            else{
                dispatch(updateStopFetching(true)); // if docs is empty stop fetching more data unless refreshed
            }
        }
    },
    (error) => { // on error, stop loading indicator and stop fetching more data unless refreshed
        dispatch(updateLoading(false));
        dispatch(updateStopFetching(true));
    });
};

export default fetchNextPage;