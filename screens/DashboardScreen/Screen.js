import {  StatusBar, SafeAreaView, ActivityIndicator, StyleSheet,ImageBackground, Platform, View, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import background from '../../assets/dashBoardBG.png' // relative path to image 
import axios from "axios";
import { Appbar } from 'react-native-paper';
import {Cards} from './Components/ArticleCard';
import { Ionicons } from '@expo/vector-icons';
import {updateFilteredArticles} from "../../redux/slices/articlesSlice"
import {updateLoading,updateStopFetching} from "../../redux/slices/dashBoardPageSlice"
import {handleLogOut} from "./handlers/handleLogOut"
import {handleRefreshPressed} from "./handlers/handleRefreshPressed"
import {handleUpdateArticles} from "./handlers/handleUpdateArticles"
import {handleSearch} from "./handlers/handleSearch"


export default function DashboardScreen({navigation}) {

  // useSelector hook to get data from the redux store
  const loading = useSelector((state) => state.dashBoardPageReducer.loading);
  const searchBarVisible = useSelector((state) => state.dashBoardPageReducer.searchBarVisible);
  const refresh = useSelector((state) => state.dashBoardPageReducer.refresh);
  const stopFetching = useSelector((state) => state.dashBoardPageReducer.stopFetching);
  const accessToken = useSelector((state) => state.authenticationReducer.accessToken);
  const pageNumber = useSelector((state) => state.articlesReducer.currentPageNumber);
  const filteredArticles = useSelector((state) => state.articlesReducer.filteredArticles);
  const articles = useSelector((state) => state.articlesReducer.articles);

  const dispatch = useDispatch();

  const fetchNextPage = () => {
    dispatch(updateLoading(true));
    // Setup required http headers
    const config = { 
      headers: {
      'accept': 'application/json', 
      "Authorization": "Bearer " + accessToken
      }
    };
    // Initiate a post request with username and password to Login API
    axios.get("http://34.245.213.76:3000" + "/articles?page="+pageNumber, config)
    .then((response) => { 
      // reset LoginFailed and Loading flags
      if (response.status >= 200 && response.status <= 299){ //check for successful status code
        if(response.data.response.docs.length){
          handleUpdateArticles(response.data.response.docs,articles,dispatch); // save articles response in redux store
        }
        else{
          dispatch(updateStopFetching(true));
        }
      }
    },
    (error) => { // catch error and stop loading indicator
      dispatch(updateLoading(false));
      dispatch(updateStopFetching(true));
    });
  };



  useEffect(() => { // load data on mount and refresh
    fetchNextPage(); 
  }, [refresh]);

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar hidden={false} /> 
      <ImageBackground source= {background}  resizeMode="cover" style={styles.container}>
        <View style={styles.AppContainer}> 
          <Appbar.Header style={styles.AppBarHeader}>
            <Appbar.BackAction onPress={()=>{handleLogOut({navigation,dispatch})}} />
              {
              searchBarVisible?
                <View style={{width:"70%"}}>
                  <TextInput 
                  onChangeText={(filter) => {     
                    dispatch(updateFilteredArticles({filter:filter,currentList:articles}));
                  }} 
                  placeholder="Search articles"
                  style={styles.searchInput} 
                  />
                </View>:<Appbar.Content></Appbar.Content>
              }
              {
              (Platform.OS!="android" && Platform.OS!="ios")?
              <TouchableOpacity onPress={()=>{handleRefreshPressed({dispatch,refresh})}}>
                <Ionicons name="reload" size={20} color="white"/>
              </TouchableOpacity>:null
              }
              <Appbar.Action icon="magnify" onPress={()=>{handleSearch({dispatch,searchBarVisible})}} />
          </Appbar.Header>
          <View style={styles.containerOpacity}>
            {/* <Cards 
              articlesList={searchBarVisible?filteredArticles:articles} 
              searchBarVisible={searchBarVisible} 
              loading={loading}
              stopLoading={stopLoading}
              setStopLoading={()=>{updateStopFetching()}}
              fetchNextPage={()=>{fetchNextPage()}}>
            </Cards> */}
            {loading?
            <View style={{height:45}}>
              <ActivityIndicator size="large" color="white" />
            </View>
            :<></>}
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
    justifyContent:"space-between"
  },
  AppContainer:{
    width: (Platform.OS == "ios"||Platform.OS =="android")?"100%":"60%", 
    flex:1
  },
  btn:{
    marginVertical:10,
    paddingVertical:5,
    paddingHorizontal:10,
    backgroundColor:'#112031',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'black'
  },
  text:{
    color:"white",
    fontSize: 14,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
