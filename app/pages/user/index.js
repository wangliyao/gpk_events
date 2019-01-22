import React from 'react';
import { Button, View, Text, Image } from 'react-native';
import Radius from '../../components/radius'

class User extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: '用户',
      headerRight: (
        <Radius />
      ),
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

export default User;