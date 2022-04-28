import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { useSelector } from "react-redux";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useState, useEffect } from 'react';

const Item = ({ title, subtitle, content, id }) => (
<Card onPress={()=>{alert(id)}} style={{marginVertical:10,marginHorizontal:15,borderRadius:15}}>
    <Card.Title title={title} subtitle={subtitle} ></Card.Title>
    <Card.Content><Paragraph>{content}</Paragraph></Card.Content>
</Card>
);

const timeToRead = (wordCount)=>{return Math.floor(wordCount/130).toString()}; // every 130 words takes about 1 minute of speech depending on what I googled
const Cards = ({fetchNextPage}) => {
    // load data only once on mount
    useEffect(() => {
        fetchNextPage(); 
    }, []);

    const articlesList = useSelector((state) => state.articlesReducer.articles);
    
    const renderItem = ({ item,index }) => (
        <Item 
        id = {item["_id"]}
        title={articlesList[index]["headline"]["main"]}
        subtitle={
            (timeToRead(articlesList[index]["word_count"])==0?"1":timeToRead(articlesList[index]["word_count"]))
            + 
            " minute read\t"
            +
            (articlesList[index]["byline"]["original"]==null?"":articlesList[index]["byline"]["original"])
        } 
        content={articlesList[index]["abstract"]} 
        />
    );    
    if (articlesList.length==0){
        return (<></>);
      }
    else{      
        return (
            <SafeAreaView style={styles.container}>
            <FlatList
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