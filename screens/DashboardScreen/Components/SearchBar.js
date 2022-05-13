import { View, TextInput, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from "react-redux";
import { Appbar } from 'react-native-paper';
import {updateFilteredArticles,updateFilter} from "../../../redux/slices/searchSlice"
import { handleAdvancedSearchPressed } from "../handlers/handleAdvancedSearchPressed";

const ScreenHeight = Dimensions.get("window").height;

export const SearchBar = ()=>{

    // Get data from the redux store
    const dispatch = useDispatch();

    // Search Reducer
    const searchBarVisible = useSelector((state) => state.searchReducer.searchBarVisible);
    const advancedSearchVisible = useSelector((state) => state.searchReducer.advancedSearchVisible);

    // Articles Reducer
    const articles = useSelector((state) => state.articlesReducer.articles);

    if(searchBarVisible){ 
        return (
            <View style={{flexDirection:"row", justifyContent:"space-around",width:"77%"}}>
                <TextInput 
                onChangeText={(filter) => {  
                    dispatch(updateFilter(filter)) ;
                    dispatch(updateFilteredArticles(articles));
                }} 
                placeholder="Search articles"
                style={styles.searchInput} 
                />
                <TouchableOpacity 
                style={styles.btn} 
                onPress={()=>{handleAdvancedSearchPressed(dispatch,advancedSearchVisible)}}
                >
                    <Ionicons name={advancedSearchVisible?"caret-up-circle-outline":"caret-down-circle-outline"} size={24} color="white" />
                </TouchableOpacity>
            </View>
        );
    }
    else{
        return( <Appbar.Content></Appbar.Content> );
    }
}

export default SearchBar;


const styles = StyleSheet.create({
    searchInput: {
      flex:1,
      textAlign: 'center',
      padding:(Platform.OS=="ios"||Platform.OS=="android")?1:4,
      margin:10,
      marginRight:0,
      borderWidth: 1,
      borderColor: 'black',
      fontSize: 14,
      backgroundColor: 'white',
      borderRadius:5,
    },
    btn: {
        margin:ScreenHeight*0.01,
        justifyContent:"space-around"
    }
  });
  