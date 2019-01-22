import React, {Component} from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import { withNavigation } from 'react-navigation';


class Radius extends React.Component {
  
  _onPressButton(){
    this.props.navigation.navigate('LoginScreen')
  }

  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity 
          onPress={this._onPressButton.bind(this)}
          activeOpacity={1}
          >
            <Image
              style={styles.btnContainer}
              source={require('../images/channel1.png')}
            />
        </TouchableOpacity>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container:{
    margin: 10,
  },
  btnContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
})

export default withNavigation(Radius);
