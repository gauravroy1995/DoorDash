import axios from "axios";


export const getPhotos = async(searchText,pageNum) => {
    console.log(pageNum,'page here')
    const stringPageNum = pageNum.toString()
    // https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=703c311722dd3d138bfd7b6c51f9b728&text=dog&per_page=20&page=2&format=json&nojsoncallback=1&api_sig=7c4261307b771b012f3e3827ee660c53
    const BASE_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9b2a0dc20b78a34504849e40aeffaf40&text=${searchText}&per_page=20&page=${stringPageNum}&format=json&nojsoncallback=1`

    try{

        const result =await axios.get(BASE_URL);
        const data =result.data;

        return data;

    }catch(err){
        throw err;
    }
}