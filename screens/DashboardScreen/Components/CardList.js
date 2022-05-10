import React from 'react';
import { SafeAreaView, RefreshControl, FlatList, } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import {handleRefreshPressed} from "../handlers/handleRefreshPressed"
import {fetchNextPage} from "../handlers/fetchNextPage"
import {renderBlogCard} from './BlogCard';

export const  CardList = () => {
    
    const dispatch = useDispatch();
    const searchBarVisible = useSelector((state) => state.dashBoardPageReducer.searchBarVisible);
    const loading = useSelector((state) => state.dashBoardPageReducer.loading);
    const filteredArticles = useSelector((state) => state.articlesReducer.filteredArticles);
    const articles = useSelector((state) => state.articlesReducer.articles);
    const articlesList = searchBarVisible ? filteredArticles : articles;
    const stopFetching = useSelector((state) => state.dashBoardPageReducer.stopFetching);
    const accessToken = useSelector((state) => state.authenticationReducer.accessToken);
    const pageNumber = useSelector((state) => state.articlesReducer.currentPageNumber);
    const refresh = useSelector((state) => state.dashBoardPageReducer.refresh);

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
                onEndReachedThreshold={0.1}
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