import React from 'react';
import { Button, View, Text, Image, TouchableHighlight, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import Post from '../pages/post'
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'


const { width } = Dimensions.get('window');

class List extends React.Component {
  static navigationOptions = {
  };

  constructor(props){
    super(props);

    this.state = {
      isRefreshing: false,
      isDataLoaded: false,
      page: 1,
      data: [],
      columnId: 0,
      slider: [],
      title: '',
    }
  }

  _renderItem = ({item}) => (
    <Post
      post={item}
    />
  );

  _goBack = () => this.props.navigation.goBack();


  componentWillMount(){
    const columnId = this.props.navigation.getParam('columnId', 'NO-ID')
    this.setState({columnId: columnId})
    this.fetchData(columnId);
  }

  _onRefresh(){
    this.state.data = [];
    this.setState({page: 1, isRefreshing: true}, ()=>{
      this.fetchData(this.state.columnId);
    })
  }

  _onEndReached(){
    if (this.state.page == -1 || !this.state.isDataLoaded){
      return;
    }else{
      this.fetchData(this.state.columnId);
    }
  }


  fetchData(columnId){
    var _this = this;
    fetch("http://xxx"+ columnId + "?roles=dev&page="  + this.state.page)
    .then(function(response){
      if (response.ok == true){
        response.json().then(function(rsp){
          _this.setState({
            data: _this.page === 1 ? rsp.column.posts : [..._this.state.data, ...rsp.column.posts],
            page: _this.state.page + 1,
            title: rsp.column.title,
            isRefreshing: false,
            isDataLoaded: true,
          })
        })
      }else{
        console.log('Error', 'column error');
      }
    }).catch((error) => {
        console.error(error);
    });
  }




  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
           <Text style={{marginTop: 5,textAlign: 'center', fontSize: 15}}>{this.state.title}</Text>
        </View>
        <View style={styles.body}>
          <FlatList
            data={this.state.data}
            extraData={this.state.isRefreshing}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            onEndReachedThreshold={0.2}
            onEndReached={this._onEndReached.bind(this)}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.buttonGroup}>
              <View style={styles.backButton}>
                <Ionicons name='chevron-left' size={25} onPress={this._goBack.bind(this)}></Ionicons>
              </View>
              <View style={styles.otherButtom}></View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
    height: 50,
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  },
  body: {
    flex: 1
  },
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  imageText:{
    backgroundColor: 'black',
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute', 
    bottom: 10, 
    left: 0
  },
  image: {
     width,
     flex: 1
  },
  postContainer:{
     flex: 1,
     padding: 80,
     backgroundColor: '#eee',
  },
  footer: {
    height: 50,
    backgroundColor: '#ddd',
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backButton:{
    flex: 2,
  },
  otherButtom:{
    flex: 4,
  },
 
})
export default List;