import React from 'react';
import { SafeAreaView, RefreshControl, FlatList, } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import {handleRefreshPressed} from "../handlers/handleRefreshPressed"
import {fetchNextPage} from "../handlers/fetchNextPage"
import {renderBlogCard} from './BlogCard';

export const  CardList = () => {
    
    // Get data from the redux store
    const dispatch = useDispatch();

    // Dash Board Page Reducer
    const loading = useSelector((state) => state.dashBoardPageReducer.loading);
    const stopFetching = useSelector((state) => state.dashBoardPageReducer.stopFetching);
    const refresh = useSelector((state) => state.dashBoardPageReducer.refresh);

    // Search Bar Reducer
    const searchBarVisible = useSelector((state) => state.searchReducer.searchBarVisible);
    const filteredArticles = useSelector((state) => state.searchReducer.filteredArticles);

    // Articles Reducer
    const articles = useSelector((state) => state.articlesReducer.articles);
    const articlesList = searchBarVisible ? filteredArticles : articles;
    const pageNumber = useSelector((state) => state.articlesReducer.currentPageNumber);

    // Authentication Reducer
    const accessToken = useSelector((state) => state.authenticationReducer.accessToken);

    if (articlesList.length){   
        return (
            <SafeAreaView style={{flex:1}}>
            <FlatList
                refreshControl={
                    <RefreshControl
                    onRefresh={()=>{handleRefreshPressed(dispatch,refresh)}}
                    />
                }
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={articlesList}
                renderItem={
                   ({item})=> renderBlogCard(item)
                }
                keyExtractor={(item) => item["_id"]}                
                onEndReachedThreshold={0}
                onEndReached={
                    ()=>{
                        if(!searchBarVisible && !stopFetching && !loading){
                            fetchNextPage(dispatch,pageNumber,articles,accessToken);  
                        }
                    }
                }
            />
            </SafeAreaView>
        );
    }
    else{
        return <></>;
    }
}

export default CardList;