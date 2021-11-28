/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {getPhotos} from './src/api/photos';
import {debounce} from 'lodash';

const DEVICE_WIDTH = Dimensions.get('window').width;

const App = () => {
  const [photos, setPhotos] = useState([]);

  const [numOfColum, setColum] = useState("4");

  const [pageNum, setPagenum] = useState(1);

  const [searchText, setText] = useState("");

  //did mount
  useEffect(() => {
    // getPhotosData(searchText, pageNum);
  }, []);

  const getPhotosData = async (searchData: string, pageVar: number) => {
    try {
      const result = await getPhotos(searchData, pageVar);

      if (!result) {
        return null;
      }

      const photosResult = result?.photos?.photo ?? [];
      const pagNumGet = result?.photos?.page ?? 1;
      const existingPhotos = [...photos, ...photosResult];

      setPhotos(existingPhotos);
      setPagenum(pagNumGet);
    } catch (err) {}
  };



  const searchThis = (text) => {
    setText(text);
    getPhotosData(text,1);

  }

  
  const handler = useCallback(debounce(searchThis, 500), []);

  const renderTextInputPhoto = () => {
    return (
      <View style={styles.textWrapper}>
        <TextInput placeholder="Search"
        onChangeText={handler}
        // value={searchText}
        />
      </View>
    );
  };

  const onNumberSelect = (text) => {
    if(text == ''){
     return setColum("")
     
    }

    if(text>10){
      return setColum("10")
    }

    if(text <1){
       setColum("1")
    }
    if(text>0 && text <=10){
      setColum(text)
    }



    // setColum(text)
  }

  const renderTextInputRows = () => {
    return (
      <View style={styles.textRowWrapper}>
        <Text>N :</Text>
        <TextInput 
        value={numOfColum}
        keyboardType="numeric"
        onChangeText={onNumberSelect}
        />
      </View>
    );
  };

  const computeHeightWidthImage = () => {
    const newNumColum = numOfColum? numOfColum:1
    const eachWidth = (DEVICE_WIDTH - (newNumColum - 1) * 10) / newNumColum;
    return eachWidth;
  };

  const renderEachPhoto = ({item}) => {
    // https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

    const serverId = item?.server;
    const id = item?.id;
    const secret = item?.secret;

    const url = `https://live.staticflickr.com/${serverId}/${id}_${secret}.jpg`;

    const width = computeHeightWidthImage();

    return (
      <Image
        source={{uri: url}}
        style={[styles.eachImage, {height: width, width: width}]}
        resizeMode="cover"
      />
    );
  };

  const onViewMore = () => {
    const newPageNum = pageNum + 1;
    getPhotosData(searchText, newPageNum);
  };

  const renderFooter = () => {
    
    if(!photos.length){
      return null
    }

    return (
      <TouchableOpacity style={styles.footerComp} onPress={onViewMore}>
        <Text style={styles.footerTex}>View More</Text>
      </TouchableOpacity>
    );
  };

  const renderBackfill = () => {
    return(
      <View style={styles.backFill} >
        <Text>No Photos! Time to start adding new</Text>
      </View>
    )
  }



  const renderFlatlist = () => {
    return (
      <FlatList
        data={photos}
        renderItem={renderEachPhoto}
        numColumns={numOfColum?numOfColum:1}
        key={numOfColum}
        style={styles.flatlistSty}
        keyExtractor={item => item.id}
        ListFooterComponent={renderFooter()}
        ListEmptyComponent={renderBackfill()}
      />
    );
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={styles.textInpyWrapper}>
        {renderTextInputPhoto()}
        {renderTextInputRows()}
      </View>
      {renderFlatlist()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 20,
  },
  flatlistSty: {
    marginHorizontal: -5,
  },
  textWrapper: {
    flex: 3,
    borderRadius: 20,
    // alignItems:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 3,
    paddingHorizontal: 10,
  },
  eachImage: {
    margin: 5,
  },
  columWrapper: {
    justifyContent: 'space-between',
  },
  footerComp: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    // padding:10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 3,
    // alignItems:'center',
    // justifyContent:'center'
  },
  footerTex: {
    fontSize: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    // textAlignVertical:'center'
  },
  textRowWrapper: {
    flex: 1,
    borderRadius: 40,
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 3,
  },
  backFill:{
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    backgroundColor:'red',
    flexGrow:1
  },
  textInpyWrapper: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
