import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Appbar } from 'react-native-paper';
import {updateFilteredArticles} from "../../../redux/slices/articlesSlice"

export const SearchInput = ()=>{

    const dispatch = useDispatch();

    // Get data from the redux store
    const searchBarVisible = useSelector((state) => state.dashBoardPageReducer.searchBarVisible);
    const articles = useSelector((state) => state.articlesReducer.articles);

    if(searchBarVisible){ 
        return (
            <View style={{width:"70%"}}>
                <TextInput 
                onChangeText={(filter) => {     
                    dispatch(updateFilteredArticles({filter:filter,currentList:articles}));
                }} 
                placeholder="Search articles"
                style={styles.searchInput} 
                />
            </View>
        );
    }
    else{
        return( <Appbar.Content></Appbar.Content> );
    }
}

export default SearchInput;


const styles = StyleSheet.create({
    searchInput: {
      flex:1,
      textAlign: 'center',
      padding:(Platform.OS=="ios"||Platform.OS=="android")?1:4,
      margin:10,
      borderWidth: 1,
      borderColor: 'black',
      fontSize: 14,
      backgroundColor: 'white',
      borderRadius:5,
    },
  });
  