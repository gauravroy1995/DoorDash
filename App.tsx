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
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {getPhotos} from './src/api/photos';
import {debounce} from 'lodash';
import {BackFill} from './src/views/BackFill';

const DEVICE_WIDTH = Dimensions.get('window').width;

const App = () => {
  const [photos, setPhotos] = useState([]);

  const [numOfColum, setColum] = useState('4');

  const [pageNum, setPagenum] = useState(1);

  const [searchText, setText] = useState('');

  const [imagesNotFound, setImageNotFound] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const textInputRef = React.createRef();

  const addImageAsset = require('./src/assets/imageAdd.png');

  const noSearchAsset = require('./src/assets/searchOff.png');

  //did mount
  useEffect(() => {
    // getPhotosData(searchText, pageNum);
  }, []);

  const getPhotosData = async (searchData: string, pageVar: number) => {
    try {
      setLoading(true);
      const result = await getPhotos(searchData, pageVar);

      setLoading(false);
      if (!result) {
        return null;
      }

      const photosResult = result?.photos?.photo ?? [];
      const pagNumGet = result?.photos?.page ?? 1;
      const existingPhotos = [...photos, ...photosResult];

      if (!photosResult.length) {
        setImageNotFound(true);
      } else {
        setImageNotFound(false);
      }

      setPhotos(existingPhotos);
      setPagenum(pagNumGet);
    } catch (err) {
      setLoading(false);
    }
  };

  const searchThis = text => {
    setPhotos([]);
    setText(text);
    getPhotosData(text, 1);
  };

  const handler = useCallback(debounce(searchThis, 500), []);

  const onInputPress = () => {
    textInputRef.current.focus();
  };

  const renderTextInputPhoto = () => {
    return (
      <TouchableOpacity
        style={styles.textWrapper}
        activeOpacity={1}
        onPress={onInputPress}>
        <Image
          source={require('./src/assets/searchBar.png')}
          style={styles.seagcIcon}
        />
        <TextInput
          placeholder="Search"
          onChangeText={handler}
          ref={textInputRef}
          // value={searchText}
        />
      </TouchableOpacity>
    );
  };

  const onNumberSelect = text => {
    if (text == '') {
      return setColum('');
    }

    if (text > 10) {
      return setColum('10');
    }

    if (text < 1) {
      setColum('1');
    }
    if (text > 0 && text <= 10) {
      setColum(text);
    }

    // setColum(text)
  };

  const renderTextInputRows = () => {
    return (
      <View style={styles.textRowWrapper}>
        <Text style={styles.rowtTwzt}> N :</Text>
        <TextInput
          value={numOfColum}
          keyboardType="numeric"
          onChangeText={onNumberSelect}
          style={styles.rowtTwzt}
        />
      </View>
    );
  };

  const computeHeightWidthImage = () => {
    const newNumColum = numOfColum ? numOfColum : 1;
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
    if (!photos.length) {
      return null;
    }

    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <TouchableOpacity style={styles.footerComp} onPress={onViewMore}>
        <Text style={styles.footerTex}>View More</Text>
      </TouchableOpacity>
    );
  };

  const renderBackfill = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    const searchText = imagesNotFound
      ? 'Couldnt find what youre searching'
      : 'No photos! Time to add new';

    return (
      <BackFill
        text={searchText}
        image={imagesNotFound ? noSearchAsset : addImageAsset}
      />
    );
  };

  const renderFlatlist = () => {
    return (
      <FlatList
        data={photos}
        renderItem={renderEachPhoto}
        numColumns={numOfColum ? numOfColum : 1}
        key={numOfColum}
        style={styles.flatlistSty}
        keyExtractor={item => item.id}
        ListFooterComponent={renderFooter()}
        ListEmptyComponent={renderBackfill()}
        contentContainerStyle={styles.flatListContainer}
        keyboardShouldPersistTaps="always"
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
  flatListContainer: {
    flexGrow: 1,
  },
  textWrapper: {
    flex: 3,
    borderRadius: 30,
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
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#000',
  },
  rowtTwzt: {
    fontSize: 14,
    color: '#fff',
  },
  seagcIcon: {
    height: 20,
    width: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  backFill: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'red',
    flexGrow: 1,
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
