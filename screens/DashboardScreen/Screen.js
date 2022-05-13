import { StatusBar, SafeAreaView, ActivityIndicator, StyleSheet,ImageBackground, Platform, View } from 'react-native';
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
import {SearchControl} from "./Components/SearchControl"

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
  const searchBarVisible = useSelector((state) => state.searchReducer.searchBarVisible);
  
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

  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar hidden={false} /> 
      <ImageBackground source= {background}  resizeMode="cover" style={styles.container}>
        <View style={styles.AppContainer}> 
          <Appbar.Header style={styles.AppBarHeader}>
          { searchBarVisible?<View style={{width:"10%"}}></View>:<Appbar.BackAction onPress={()=>{handleLogOut(navigation,dispatch)}} />}
            <SearchBar />
            <RefreshBtn />
            <Appbar.Action icon="magnify" onPress={()=>{handleSearchBtn(dispatch,searchBarVisible)}} />
          </Appbar.Header>
          <SearchControl/>
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
  mainView:{
    flex: 1
  },
  containerOpacity:{
    flex:1,
    justifyContent: "center",
    alignItems: "center"
    },
  AppBarHeader:{
    backgroundColor:"rgb(31, 20, 99)", 
    flexDirection:"row", 
    justifyContent:"space-between"
  },
  AppContainer:{
    width: (Platform.OS == "ios"||Platform.OS =="android")?"100%":"60%", 
    flex:1,
    backgroundColor:"rgba(0, 0, 0,0.77)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    margin:"3%",
    flexDirection:"row",
  }
});
