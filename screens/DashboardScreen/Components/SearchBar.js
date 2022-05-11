import { View, TextInput, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from "react-redux";
import { Appbar } from 'react-native-paper';
import {updateFilteredArticles} from "../../../redux/slices/searchSlice"

const ScreenHeight = Dimensions.get("window").height;

export const SearchBar = ()=>{

    const dispatch = useDispatch();

    // Get data from the redux store
    const searchBarVisible = useSelector((state) => state.searchReducer.searchBarVisible);
    const advancedSearchIcon = useSelector((state) => state.searchReducer.advancedSearchIcon);
    const articles = useSelector((state) => state.articlesReducer.articles);

    if(searchBarVisible){ 
        return (
            <View style={{flexDirection:"row", justifyContent:"space-around",width:"77%"}}>
                <TextInput 
                onChangeText={(filter) => {     
                    dispatch(updateFilteredArticles({filter:filter,currentList:articles}));
                }} 
                placeholder="Search articles"
                style={styles.searchInput} 
                />
                <TouchableOpacity 
                style={styles.btn} 
                onPress={()=>{alert("do something.. .")}}
                >
                    <Ionicons name={advancedSearchIcon} size={24} color="white" />
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
  