import React,{useEffect,useState} from 'react';

import {View,Text,FlatList,StyleSheet,SafeAreaView , ActivityIndicator, TouchableOpacity} from 'react-native';
import { getCommentForPost, getPosts, getUsers } from '../api/posts';
import { PostCard } from '../views/PostCard';



const PostView  = (props) => {

    const [comments,setComments] = useState([]);

    const [loading,setLoader] = useState(true)

    const post = props.route.params.post ?? {};
    const postId = post?.id;

    useEffect(() => {
        fetchComments()
    },[])

    const fetchComments = async() => {
        try{
            const result = await getCommentForPost(postId);
            if(!result){
                return null
            }

            setLoader(false)

            setComments(result)

        } catch(err){
            
        }
        

    }

    const postOverView = () => {
        return(
            <PostCard 
            item={post}
            />
        )
    }

    const renderEachComment = ({item}) => {
       const subject = item?.name 

       const body = item?.body ??'';

       const email = item?.email ?? '';


       
        return(
            <View style={styles.eachCard} >
                <Text style={styles.secondText} >Subject: {subject}</Text>
                <Text style={styles.bodyText} >{body}</Text>
                <Text style={styles.eachSize} >Email: {email}</Text>
            </View>
        )
    }

    const renderComments = () =>{
        if(loading){
            return null
        }
        return(
            <FlatList 
            data={comments}
            renderItem={renderEachComment}
            ListHeaderComponent={renderFlatlistHeader()}
            keyExtractor={(item) => item.id}
            />
        )
    }

    const renderFlatlistHeader = () => {
        return(
            <Text style={styles.commentST} >Comments for the post</Text>
        )
    }
   
    const renderLoader = () => {
        if(!loading){
            return null
        }
        return(
            <View>
                <ActivityIndicator  size="large" />
                <Text>Loading Comments ...</Text>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.container} >
           {postOverView()}
           {renderComments()}
           {renderLoader()}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20
    },
    eachCard:{
        marginHorizontal:20,
        borderRadius:10,
        marginVertical:10,
        padding:10,
        backgroundColor:'rgba(0,0,0,0.1)'
    },
    eachSize:{
        fontSize:16,
        color:'rgba(222,22,220,1)',
        marginVertical:5
    },
    secondText:{
        fontSize:16,
        color:'green',
        marginVertical:5
    },
    bodyText:{
        fontSize:10,
    },
    commentST:{
        marginLeft:20,
        marginTop:30,
        fontSize:18
    }

})

export default PostView;