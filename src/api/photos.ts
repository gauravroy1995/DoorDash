import axios from "axios";


export const getPhotos = async(searchText,pageNum) => {
    const BASE_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9b2a0dc20b78a34504849e40aeffaf40&text=${searchText}&per_page=20&page=${pageNum}&format=json&nojsoncallback=1`

    try{

        const result =await axios.get(BASE_URL);
        const data =result.data;
        return data;

    }catch(err){
        throw err;
    }
}