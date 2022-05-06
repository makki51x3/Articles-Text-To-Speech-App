import {updateArticles, incrementPageNumber} from '../../../redux/slices/articlesSlice'

export const handleUpdateArticles = (batch,articleIDs,dispatch) => {        
    if (batch){ // check that batch is not an empty list
        batch.forEach(element => {      
            // check if element is already added
            if(!articleIDs.filter(obj => obj["_id"]==element["_id"]).length){ 
                dispatch(updateArticles(element));
            }
        });
        dispatch(incrementPageNumber());
    }
}; 

export default handleUpdateArticles;