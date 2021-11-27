import React,{useEffect,useState} from 'react';

import {View,Text,FlatList,StyleSheet,SafeAreaView , ActivityIndicator, TouchableOpacity} from 'react-native';
import { getPosts, getUsers } from '../api/posts';
import { PostCard } from '../views/PostCard';



const Home  = (props) => {

    const [posts,setPosts] = useState([]);

    const [loading,setLoader] = useState(true)


    useEffect(() => {
        callGetPost()
    },[])




    const callGetPost = () => {
        Promise.all([getPosts(),getUsers()]).then((values) => {
            setLoader(false)
            combineData(values[0],values[1])
            // console.log(values[1],'val arr');
          });
    }

    const combineData = (postArray:Array<any>,userArray:Array<any>) => {
 

     const newPosts =    postArray.map((post) => {
            let newObj = {...post};
            let userId = post.userId;
            const userArrObj =  userArray.filter((data) => data.id === userId);
            newObj.user  =userArrObj[0];
            return newObj
        })

        setPosts(newPosts)

    }

    const onCardPress = (post) => {

        const params = {
            post:post
        }
        props.navigation.navigate("Post",params)
    }

   const onUserNamePress = (user) => {
    const params = {
        user:user
    }
    props.navigation.navigate("User",params)
    }

    const renderEachRow = ({item}) => {
        if(!item){
            return null
        }

        return(
            <PostCard 
                item={item}
                onCardPress={() => onCardPress(item)} 
                onUserNamePress={() => onUserNamePress(item?.user)}
            />
        )
    }

    const renderLoader = () => {
        if(!loading){
            return null
        }

        return (
            <ActivityIndicator 
            size="large"
            />
        )
    }

    const renderHeader = () => {
        return(
            <Text style={styles.postST} >Posts</Text>
        )
    }

    const renderFlat = () => {
        if(loading){
            return null
        }

        return(
            <FlatList 
            data={posts}
            renderItem={renderEachRow}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={renderHeader()}
            />
        )
    }

    return(
        <SafeAreaView style={styles.container} >
            {renderLoader()}
           
            
            {renderFlat()}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    eachCard:{
        marginHorizontal:20,
        borderRadius:10,
        marginVertical:10,
        padding:10,
        backgroundColor:'rgba(0,0,0,0.1)'
    },
    eachSize:{
        fontSize:14,
        color:'rgba(222,22,220,1)'
    },
    secondText:{
        fontSize:18,
        color:'blue',
        marginVertical:8
    },
    postST:{
        fontSize:18,
        color:'blue',
        marginVertical:8 ,
        marginLeft:20 
    }
})

export default Home;