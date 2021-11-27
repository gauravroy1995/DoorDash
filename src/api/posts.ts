import axios from "axios";

export const getPosts = async() => {
    try{
        const result = await axios.get('https://jsonplaceholder.typicode.com/posts');
        // console.log(result.data,'return es');
        if(!result){
            return []
        }
        return result.data;
    }catch(err){
        console.log(err,'errr')
    }
    }

    export const getUsers = async() => {
        try{
            const result = await axios.get('https://jsonplaceholder.typicode.com/users');
            // console.log(result.data,'return es');
            if(!result){
                return []
            }
            return result.data;
        }catch(err){
            console.log(err,'errr')
        }
        }

        export const getCommentForPost = async(postId) => {
            try{
                const result = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
                // console.log(result.data,'return es');
                if(!result){
                    return []
                }
                return result.data;
            }catch(err){
                console.log(err,'errr')
            }
            }
   