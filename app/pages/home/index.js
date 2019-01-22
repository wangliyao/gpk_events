import React, {Component} from 'react'
import SplashScreen from 'react-native-splash-screen'
import Swiper from 'react-native-swiper';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, ScrollView, FlatList, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import Post from '../post'

const { width } = Dimensions.get('window')
let ScreenHight = Dimensions.get('window').height / 3.5

class Home extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      isRefreshing: false,
      isDataLoaded: false,
      page: 1,
      data: [],
      slider: [],
    }
  }

  static navigationOptions = {
      title: '首页',
    };

  componentDidMount() {
    SplashScreen.hide();
  }

  componentWillMount(){
    this.fetchData();
  }


  fetchData(){
    var _this = this;
    fetch("http://www.xxx.com?page=" + this.state.page,{
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    })
    .then(function(response){
      if (response.ok == true){
        response.json().then(function(rsp){
          _this.setState({
            isRefreshing: false,
            isDataLoaded: true,
            data: _this.page === 1 ? rsp.homepage_posts : [..._this.state.data, ...rsp.homepage_posts],
            page: _this.state.page + 1,
            slider: rsp.slider.posts,
          })
        })
      }else{
        console.log('Error', 'home error');
      }
    }).catch((error) => {
        console.error(error);
    });
  }

  _keyExtractor = (item) => item.post.id;

  _renderItem = ({item}) => (
    <Post
      post={item.post}
    />
  );

  _onRefresh(){
    this.state.data = [];
    this.setState({page: 1, isRefreshing: true}, ()=>{
      this.fetchData();
    })
  }

  _onEndReached(){
    if (this.state.page == -1 || !this.state.isDataLoaded){
      return;
    }else{
      this.fetchData();
    }
  }

  _onDeatilButton(id){
    this.props.navigation.navigate('Details', { postId: id })
  }

  render() {
    const swiper = this.state.slider.map((post, idx)=>{
      return(
        <View key={idx} style={styles.slide}>
          <TouchableOpacity
          onPress={this._onDeatilButton.bind(this, post.id)}
          activeOpacity={1}
          >
           <ImageBackground resizeMode='stretch' style={styles.image} source={{uri: post.cover_url}}>
             <Text style={styles.imageText}>{post.title}</Text>
          </ImageBackground>
        </TouchableOpacity>
        </View>
      )
    })

    const swiperComponent = () => {
      return(
          <Swiper
            dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
            key={this.state.slider.length}
            style={styles.wrapper}
            height={200}
            removeClippedSubviews={false}
            autoplay>
            {swiper}
          </Swiper>
      )
    }
    return (
       <View style={styles.container}>
         <View style={styles.body}>
           <FlatList
             data={this.state.data}
             ListHeaderComponent={swiperComponent}
             extraData={this.state.isRefreshing}
             keyExtractor={this._keyExtractor}
             renderItem={this._renderItem}
             refreshing={this.state.isRefreshing}
             onRefresh={this._onRefresh.bind(this)}
             onEndReachedThreshold={0.2}
             onEndReached={this._onEndReached.bind(this)}
           />
         </View>
       </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1
  },
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#9DD6EB',
  },
  imageText:{
    backgroundColor: 'black',
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute', 
    bottom: 10, 
    left: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  postContainer:{
     flex: 1,
     padding: 80,
     backgroundColor: '#eee',
  },
 
})
export default Home;