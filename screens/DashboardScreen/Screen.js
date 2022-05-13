import { StatusBar, TouchableOpacity,SafeAreaView, ActivityIndicator, StyleSheet,ImageBackground, Platform, View, Text } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import background from '../../assets/dashBoardBG.png' // relative path to image 
import { Appbar } from 'react-native-paper';
import {CardList} from './Components/CardList';
import {handleLogOut} from "./handlers/handleLogOut"
import {handleSearchBtn} from "./handlers/handleSearchBtn"
import {fetchNextPage} from "./handlers/fetchNextPage"
import {SearchBar} from "./Components/SearchBar"
import { updateRefresh } from '../../redux/slices/dashBoardPageSlice';
import {RefreshBtn} from "./Components/RefreshBtn"
import {handleUpdateVoices} from "./handlers/handleUpdateVoices"
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { updateSortOrder,updateSearchInAbstract,updateSearchInAuthor,updateSearchInBody,updateSearchInHeadline,updateTimeToRead, } from '../../redux/slices/searchSlice';
import {updateFilteredArticles} from "../../redux/slices/searchSlice"


export default function DashboardScreen({navigation}) {

  // Get data from the redux store
  const dispatch = useDispatch();

  // Dash Board Page Reducer
  const loading = useSelector((state) => state.dashBoardPageReducer.loading);
  const refresh = useSelector((state) => state.dashBoardPageReducer.refresh);

  // Authentication Reducer
  const accessToken = useSelector((state) => state.authenticationReducer.accessToken);

  // Articles Reducer
  const pageNumber = useSelector((state) => state.articlesReducer.currentPageNumber);
  const articles = useSelector((state) => state.articlesReducer.articles);

  // Search Reducer
  const advancedSearchVisible = useSelector((state) => state.searchReducer.advancedSearchVisible);
  const searchBarVisible = useSelector((state) => state.searchReducer.searchBarVisible);
  const sortOrder = useSelector((state) => state.searchReducer.advancedOptions.sortOrder);
  const searchInHeadline = useSelector((state) => state.searchReducer.advancedOptions.searchIn.headline);  
  const searchInAuthor = useSelector((state) => state.searchReducer.advancedOptions.searchIn.author);  
  const searchInAbstract = useSelector((state) => state.searchReducer.advancedOptions.searchIn.abstract);  
  const searchInBody = useSelector((state) => state.searchReducer.advancedOptions.searchIn.body);  
  const timeToRead = useSelector((state) => state.searchReducer.advancedOptions.timeToRead);

  useEffect(() => { // load data on mount 
    if(Platform.OS!="ios"&&Platform.OS!="android"){
      handleUpdateVoices(dispatch)
    }
    fetchNextPage(dispatch,pageNumber,articles,accessToken); 
  }, []);

  useEffect(() => { // load data on refresh
    if(refresh){
      if(searchBarVisible){
        handleSearchBtn(dispatch,searchBarVisible)
      }
      fetchNextPage(dispatch,pageNumber,articles,accessToken); 
      dispatch(updateRefresh(false));
    }
  }, [refresh]);

  // update upon changing advanced settings
  useEffect(() => {  
    return () => {
      dispatch(updateFilteredArticles(articles));
    }
  }, [sortOrder,searchInHeadline,searchInAuthor,searchInAbstract,searchInBody,timeToRead,articles])
  

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar hidden={false} /> 
      <ImageBackground source= {background}  resizeMode="cover" style={styles.container}>
        <View style={styles.AppContainer}> 
          <Appbar.Header style={styles.AppBarHeader}>
          { searchBarVisible?<View style={{width:"10%"}}></View>:<Appbar.BackAction onPress={()=>{handleLogOut(navigation,dispatch)}} />}
            <SearchBar />
            <RefreshBtn />
            <Appbar.Action icon="magnify" onPress={()=>{handleSearchBtn(dispatch,searchBarVisible)}} />
          </Appbar.Header>
          { advancedSearchVisible &&
            <View style={{ 
              backgroundColor:"#B0B0B0", 
              height:90,
              width:"auto", 
              borderColor:"#1E1464", 
              borderWidth:4,
              borderTopWidth:7,
              borderBottomLeftRadius:30,
              borderBottomRightRadius:30,
              flexDirection:"row",
              justifyContent:"center",
              }}>
              <View style={{flexDirection:"row",margin:3, width:"90%", justifyContent:"space-evenly"}}>
                <View style={{margin:3, width:"30%"}}>
                  <TouchableOpacity 
                    style={styles.btn} 
                    onPress={()=>{dispatch(updateSearchInBody(!searchInBody))}}
                    >
                    <MaterialIcons name={searchInBody?"check-box":"check-box-outline-blank"} size={20} color="black" />
                    <Text style={{fontWeight:"bold"}}> In Body</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.btn} 
                    onPress={()=>{dispatch(updateSearchInHeadline(!searchInHeadline))}}
                    >
                    <MaterialIcons name={searchInHeadline?"check-box":"check-box-outline-blank"} size={20} color="black" />
                    <Text style={{fontWeight:"bold"}}> In Headline</Text>
                  </TouchableOpacity>
                </View>
                <View style={{margin:3, width:"30%"}}>
                  <TouchableOpacity 
                    style={styles.btn} 
                    onPress={()=>{dispatch(updateSearchInAuthor(!searchInAuthor))}}
                    >
                    <MaterialIcons name={searchInAuthor?"check-box":"check-box-outline-blank"} size={20} color="black" />
                    <Text style={{fontWeight:"bold"}}> In Author</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.btn} 
                    onPress={()=>{dispatch(updateSearchInAbstract(!searchInAbstract))}}
                    >
                    <MaterialIcons name={searchInAbstract?"check-box":"check-box-outline-blank"} size={20} color="black" />
                    <Text style={{fontWeight:"bold"}}> In Abstract</Text>
                  </TouchableOpacity>
                </View>
                <View style={{margin:3, width:"30%"}}>
                  <TouchableOpacity 
                    style={styles.btn} 
                    onPress={()=>{dispatch(updateSortOrder(!sortOrder))}}
                    >
                    <FontAwesome5 name={sortOrder?"sort-alpha-up":"sort-alpha-down"} size={17} color="black" />
                    <Text style={{fontWeight:"bold"}}>{sortOrder?" Ascending":" Descending"}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.btn} 
                    onPress={()=>{dispatch(updateTimeToRead(timeToRead))}}
                    >
                    <Text style={{fontWeight:"bold"}}>Time to read:  {["all","<3 min ","<3-10> min",">10 min"][timeToRead]}</Text>
                  </TouchableOpacity>
                </View>
              </View>   
            </View>
          }
          <View style={styles.containerOpacity}>
            <CardList/>
            {loading  &&
            <View style={{height:45}}>
              <ActivityIndicator size="large" color="white" />
            </View>}
          </View>
        </View>
      </ImageBackground>    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerOpacity:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"rgba(0, 0, 0,0.77)"
    },
  AppBarHeader:{
    backgroundColor:"rgb(31, 20, 99)", 
    flexDirection:"row", 
    justifyContent:"space-between"
  },
  AppContainer:{
    width: (Platform.OS == "ios"||Platform.OS =="android")?"100%":"60%", 
    flex:1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    margin:"3%",
    flexDirection:"row",
  }
});
