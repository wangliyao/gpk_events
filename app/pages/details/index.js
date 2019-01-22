import React from 'react';
import { Button, View, Text, StyleSheet, Image, ScrollView, Dimensions,  PixelRatio } from 'react-native';
import HTMLView from 'react-native-htmlview';
import AutoHeightImage from 'react-native-auto-height-image';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStackNavigator, createAppContainer } from 'react-navigation'; // 1.0.0-beta.27

const { width } = Dimensions.get('window');


class DetailsScreen extends React.Component {
    static navigationOptions = {
      title: 'modal',
    };

    componentDidMount(){
      const postId = this.props.navigation.getParam('postId', 'NO-ID')

      this.fetchDetail(postId);
    }

    constructor(props){
      super(props);

      this.state = {
        post: {},
        column: {},
        loading: false,
        authors: [],
        myheight: 0,
      };
    }


    fetchDetail(postId){
      var _this = this;
      fetch("http://main_test.geekpark.net/api/v1/posts/" + postId)
      .then(function(response){
        if (response.ok == true){
          response.json().then(function(rsp){
            _this.setState({
             loading: true,
             post: rsp.post,
             column: rsp.post.column,
             authors: rsp.post.authors,
            })
            console.log(_this.state.data)
          })
        }
      }).catch((error) => {
        console.error(error);
      });
    }

  _renderNode(node, index, siblings, parent, defaultRenderer) {
     if (node.name == 'img') {
      const { src, height } = node.attribs;
      const width = Dimensions.get('window').width;
      const imageHeight = 200;
      return (
        <Image
          key={index}
          resizeMode='contain'
          style={{ width: width -30, height: imageHeight * PixelRatio.get() }}
          source={{ uri: src }} />
     );  
     }
   }

  _goBack = () => this.props.navigation.goBack();


  render() {
    const htmlContent = `${this.state.post.content}`.replace(/(<br\/>|<br>|\\n)/, '')


    const authors = this.state.authors.map((author, idx)=> {
        return(
          <View style={styles.user} key={idx}>
            <Image 
              style={{width: 30, height: 30, borderRadius: 15}}
              source={{uri: author.avatar_url}} />
            <Text style={{padding: 8}}>{author.nickname}</Text>
          </View>
        )
      })

    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>

          <View style={styles.header}>
            <View style={styles.articleInfo}>
               <View style={styles.columnTitle}>
                 <Text style={styles.Article}>{this.state.column.title}</Text>
                 <Text style={styles.ArticleReadTime}>阅读时长: {this.state.post.reading_time} 分钟</Text>
               </View>
               <Text style={{fontSize: fontSize * 1.2}}>{this.state.post.title}</Text>
            </View>
              {authors}
          </View>
          <View style={styles.body}>
            <View style={styles.abstract}>
              <Image 
                style={{height: 200}}
                source={{uri: this.state.post.cover_url}} />
              <View style={styles.abstractTitle}>
                <Text style={{fontSize: 15, paddingRight: 10,}}><Ionicons name='tag'/>摘要</Text>
                <Text style={{padding: 10, letterSpacing: 1.5,}}>{this.state.post.abstract}</Text>
              </View>
            </View>
            <View style={styles.post}>
            <HTMLView
              renderNode={this._renderNode}
              value={htmlContent}
              stylesheet={styles}
            />
            </View>
          </View>

        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.buttonGroup}>
              <View style={styles.backButton}>
                <Ionicons name='chevron-left' size={25} onPress={this._goBack}></Ionicons>
              </View>
              <View style={styles.otherButtom}></View>
            </View>
          </View>
      </View>
    );
  }
}

const fontSize = 14
const rowMargin = 5

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  p: {
    letterSpacing: 1.5,
    fontSize,
    color: 'rgba(0,0,0,0.8)'
  },
  image: {
    position: 'relative',
  },
  h1: {
    fontSize: fontSize * 1.5,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)'
  },
  h2: {
    letterSpacing: 1.5,
    fontSize: fontSize * 1.4,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.85)',
  },
  h3: {
     fontWeight: 'bold',
     fontSize: fontSize * 1.4,
     color: 'rgba(0,0,0,0.8)'
   },
   h4: {
     fontSize: fontSize * 1.3,
     color: 'rgba(0,0,0,0.7)',
     fontWeight: 'bold'
   },
  header: {
    flex: 1,
    padding: 15,
    borderLeftWidth: 2.5,
    borderColor: "green",
  },
  user: {
   flexDirection: 'row',
  },
  articleInfo: {
    paddingBottom: 15,
  },
  Article: {
    backgroundColor: '#ddd',
    padding: 3,
  },
  ArticleReadTime: {
    fontSize: 12,
    color: 'rgba(0,0,0,.5)',
    padding: 3,
    marginLeft: 3,
  },
  columnTitle: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  abstractTitle:{
    paddingTop: 20,
    fontSize: 15,
    borderBottomWidth: 0.3,
    borderColor: "rgba(0,0,0,.5)",
  },
  body: {
    borderTopWidth: 0.3,
    borderColor: "rgba(0,0,0,.5)",
    padding: 15,
    flex: 4,
  },
  abstract:{
    flex: 1,
  },
  post:{
    flex: 1,
    paddingTop: 15,
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

export default DetailsScreen;