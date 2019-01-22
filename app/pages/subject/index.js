import React from 'react';
import { Button, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
class Subject extends React.Component {
  static navigationOptions = {
      title: '主题',
    };


  constructor(props){
    super(props);


    this.imageGroup = [
                        {img:require('../../images/channel3.png'), num: 177},
                        {img:require('../../images/channel4.png'), num: 81},
                        {img:require('../../images/channel5.png'), num: 250},
                        {img:require('../../images/channel6.png'), num: 85},
                        {img:require('../../images/channel7.png'), num: 91},
                        {img:require('../../images/channel8.png'), num: 251},
                       ]

    this.state = {
      data: [],
      page: 1,
      width: 0,
      height: 0,
    }
  }

  componentWillMount(){
    const screenWidth = Dimensions.get('window').width
    height = screenWidth * 430 / 960 
    this.setState({width: screenWidth, height: height})
  }
  _onPressButton = (num) => {
    this.props.navigation.navigate('List', { columnId: num })
  }

  render() {

    const images = this.imageGroup.map((item, idx) => {
       return(
        <View style={{flex: 1, margin: 10,}} key={idx}>
        <TouchableOpacity onPress={this._onPressButton.bind(this, item.num)} >
          <Image style={{width: this.state.width, height: this.state.height}}
            source={item.img} />
        </TouchableOpacity> 
        </View>      
       )
    })
    return (
      <ScrollView>
          {images}
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  button: {
  }
})

export default Subject;

