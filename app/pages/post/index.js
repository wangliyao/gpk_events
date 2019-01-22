import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';


class Post extends React.Component {


  _onDeatilButton(){
    this.props.navigation.navigate('Details', { postId: this.props.post.id })
  }

  render(){
    return(
      <TouchableOpacity 
        onPress={this._onDeatilButton.bind(this)}
        activeOpacity={0.7}
        >
        <View style={styles.container}>
          <Text style={styles.rowTitle}>
            {this.props.post.title}
          </Text>
          <Image style={styles.image} source={{uri: this.props.post.cover_url}}/>
        </View>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eee'

  },
  rowTitle:{
    flex: 5,
    paddingBottom: 5,
    fontSize: 15,
    fontWeight: "700",
  },

  image:{
    height: 200,
    flex: 1
  },
})

export default withNavigation(Post);