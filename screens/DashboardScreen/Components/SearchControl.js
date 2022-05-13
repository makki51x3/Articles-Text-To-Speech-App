import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { updateSortOrder,updateSearchInAbstract,updateSearchInAuthor,updateSearchInBody,updateSearchInHeadline,updateTimeToRead, } from '../../../redux/slices/searchSlice';
import {updateFilteredArticles} from "../../../redux/slices/searchSlice"
import { useEffect } from 'react';


export const SearchControl = ()=> {

    // Get data from the redux store
    const dispatch = useDispatch();
    
    // Search Reducer
    const advancedSearchVisible = useSelector((state) => state.searchReducer.advancedSearchVisible);
    const sortOrder = useSelector((state) => state.searchReducer.advancedOptions.sortOrder);
    const searchInHeadline = useSelector((state) => state.searchReducer.advancedOptions.searchIn.headline);  
    const searchInAuthor = useSelector((state) => state.searchReducer.advancedOptions.searchIn.author);  
    const searchInAbstract = useSelector((state) => state.searchReducer.advancedOptions.searchIn.abstract);  
    const searchInBody = useSelector((state) => state.searchReducer.advancedOptions.searchIn.body);  
    const timeToRead = useSelector((state) => state.searchReducer.advancedOptions.timeToRead);
    
    // Articles Reducer
    const articles = useSelector((state) => state.articlesReducer.articles);

    useEffect( // Update upon change in advanced setting's options
        () => {  
            return () => {
                dispatch(updateFilteredArticles(articles));
            }
        }, 
        [
            sortOrder,
            searchInHeadline,
            searchInAuthor,
            searchInAbstract,
            searchInBody,
            timeToRead,
            articles
        ]
    );
    
    if(advancedSearchVisible){  // check if toggled on 
        return(
            <View style={styles.containerBG}>
                <View style={styles.container}>
                    <View style={styles.elementPair}>

                        <TouchableOpacity 
                            style={styles.btn} 
                            onPress={()=>{dispatch(updateSearchInBody(!searchInBody))}}
                            >
                            <MaterialIcons name={searchInBody?"check-box":"check-box-outline-blank"} size={20} color="black" />
                            <Text style={styles.text}> In Body</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.btn} 
                            onPress={()=>{dispatch(updateSearchInHeadline(!searchInHeadline))}}
                            >
                            <MaterialIcons name={searchInHeadline?"check-box":"check-box-outline-blank"} size={20} color="black" />
                            <Text style={styles.text}> In Headline</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.elementPair}>

                        <TouchableOpacity 
                            style={styles.btn} 
                            onPress={()=>{dispatch(updateSearchInAuthor(!searchInAuthor))}}
                            >
                            <MaterialIcons name={searchInAuthor?"check-box":"check-box-outline-blank"} size={20} color="black" />
                            <Text style={styles.text}> In Author</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.btn} 
                            onPress={()=>{dispatch(updateSearchInAbstract(!searchInAbstract))}}
                            >
                            <MaterialIcons name={searchInAbstract?"check-box":"check-box-outline-blank"} size={20} color="black" />
                            <Text style={styles.text}> In Abstract</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.elementPair}>

                        <TouchableOpacity 
                            style={styles.btn} 
                            onPress={()=>{dispatch(updateSortOrder(!sortOrder))}}
                            >
                            <FontAwesome5 name={sortOrder?"sort-alpha-up":"sort-alpha-down"} size={17} color="black" />
                            <Text style={styles.text}>{sortOrder?" Ascending":" Descending"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.btn} 
                            onPress={()=>{dispatch(updateTimeToRead(timeToRead))}}
                            >
                            <Text style={styles.text}>Time: {["All","<3","3->10",">10"][timeToRead]}</Text>
                        </TouchableOpacity>

                    </View>
                </View>   
            </View>
        );
    }
    else{
        return <></>; // return nothing
    }
}

    const styles = StyleSheet.create({
        text:{
            fontWeight:"bold"
        },
        containerBG: { 
            backgroundColor:"#B0B0B0", 
            height:"13%",
            width:"auto", 
            borderColor:"#1E1464", 
            borderWidth:4,
            borderTopWidth:7,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            flexDirection:"row",
            justifyContent:"center",
            },
        container:{
            flexDirection:"row",
            // marginTop:"3%",
            width:"90%", 
            justifyContent:"space-evenly"
        },
        elementPair:{
            width:"30%",
            flexDirection:"column",
            justifyContent:"space-evenly",
        },
        btn: {
            flexDirection:"row",
        }
    });
export default SearchControl;