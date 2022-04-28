import React from 'react';
import { SafeAreaView, View, RefreshControl, Image, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Subheading, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useState, useEffect } from 'react';
import handleUpdateArticles from "../../DashboardScreen/handlers/articles"

export const  Cards = ({fetchNextPage}) => {
    
    useEffect(() => { // load data only once on mount
        fetchNextPage(); 
    }, []);

    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);
    const [viewContent, setViewContent] = useState("");
    const callRefreshControl = () => {
        console.log(articlesList);
        setRefresh(true);
        handleUpdateArticles("",dispatch); // reset list of articles in redux store
        fetchNextPage();
        setRefresh(false);
        }
    
    const Item = ({ title, subtitle, abstract, id, content, media }) => (
            <Card onPress={()=>{viewContent==id?setViewContent(""):setViewContent(id)}} style={styles.card}>
                <Card.Title title={title} subtitle={subtitle} ></Card.Title>
                <Card.Content>
                    <Paragraph >{abstract}</Paragraph> 
                    {media==""?<></>:<Image source={{ uri: "https://static01.nyt.com/"+media }} style = {styles.image} />}  
                    {viewContent==id?
                    <View style={styles.subheading}>
                        <Subheading>{content}</Subheading>
                    </View>:<></>}
                </Card.Content>
            </Card>
        );

    // every 130 words is about 1 minute of speech depending on what I googled. ..
    const timeToRead = (wordCount)=>{return Math.floor(wordCount/130).toString()}; 
    const articlesList = useSelector((state) => state.articlesReducer.articles);
    
    const renderItem = ({ item,index }) => (
        <Item 
        id = {item["_id"]}
        title={articlesList[index]["headline"]["main"]}
        subtitle={
            (timeToRead(articlesList[index]["word_count"])==0?"1":timeToRead(articlesList[index]["word_count"]))
            + 
            " minute read\t\t"
            +
            (articlesList[index]["byline"]["original"]==null?"":articlesList[index]["byline"]["original"])
        } 
        abstract={articlesList[index]["abstract"]} 
        content={articlesList[index]["lead_paragraph"]}
        media={(articlesList[index]["multimedia"]).length!=0?articlesList[index]["multimedia"][0]["url"]:""}
        />
    );    
    if (articlesList.length==0){
        return (<></>);
      }
    else{      
        return (
            <SafeAreaView style={styles.container}>
            <FlatList
                refreshControl={
                    <RefreshControl
                    refreshing={refresh}
                    onRefresh={()=>{callRefreshControl()}}
                    />
                }
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={articlesList}
                renderItem={renderItem}
                keyExtractor={(article,index) => index}
                onEndReachedThreshold={0}
                onEndReached={()=>{fetchNextPage()}}
            />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        maxHeight: "300px", 
        maxWidth: "300px",
        margin: 5, 
        resizeMode:"cover",
        borderRadius:5 
      },
    subheading:{
        backgroundColor:"rgb(240,240,240)",
        borderRadius:10, 
        padding:10
    },
    card:{
        marginVertical:10,
        marginHorizontal:15,
        borderRadius:15,
        backgroundColor:"rgb(200,200,200)"
    },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    margin: 15,
  },
  title: {
    fontSize: 32,
  },
});

export default Cards;