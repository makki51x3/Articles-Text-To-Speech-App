import {  StatusBar, SafeAreaView, ActivityIndicator, StyleSheet,ImageBackground, Platform, View, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import background from '../../assets/dashBoardBG.png' // relative path to image 
import { Appbar } from 'react-native-paper';
import {Cards} from './Components/ArticleCard';
import {updateFilteredArticles} from "../../redux/slices/articlesSlice"
import {handleLogOut} from "./handlers/handleLogOut"
import {handleSearch} from "./handlers/handleSearch"
import {fetchNextPage} from "./handlers/fetchNextPage"
import {SearchInput} from "./Components/SearchInput"
import { updateRefresh } from '../../redux/slices/dashBoardPageSlice';
import {RefreshBtn} from "./Components/RefreshBtn"

export default function DashboardScreen({navigation}) {

  // useSelector hook to get data from the redux store
  const loading = useSelector((state) => state.dashBoardPageReducer.loading);
  const searchBarVisible = useSelector((state) => state.dashBoardPageReducer.searchBarVisible);
  const refresh = useSelector((state) => state.dashBoardPageReducer.refresh);
  const accessToken = useSelector((state) => state.authenticationReducer.accessToken);
  const pageNumber = useSelector((state) => state.articlesReducer.currentPageNumber);
  const filteredArticles = useSelector((state) => state.articlesReducer.filteredArticles);
  const articles = useSelector((state) => state.articlesReducer.articles);

  const dispatch = useDispatch();

  useEffect(() => { // load data on mount 
      fetchNextPage(dispatch,pageNumber,articles,accessToken); 
  }, []);

  useEffect(() => { // load data on refresh
    if(refresh){
      fetchNextPage(dispatch,pageNumber,articles,accessToken); 
      dispatch(updateRefresh(false));
    }
  }, [refresh]);

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar hidden={false} /> 
      <ImageBackground source= {background}  resizeMode="cover" style={styles.container}>
        <View style={styles.AppContainer}> 
          <Appbar.Header style={styles.AppBarHeader}>
            <Appbar.BackAction onPress={()=>{handleLogOut(navigation,dispatch)}} />
              <SearchInput/>
              <RefreshBtn/>
              <Appbar.Action icon="magnify" onPress={()=>{handleSearch(dispatch,searchBarVisible)}} />
          </Appbar.Header>
          <View style={styles.containerOpacity}>
            <Cards></Cards>   
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
