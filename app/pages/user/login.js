import React from 'react';
import { Button, Timers,View, Text, TextInput, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'

class Login extends React.Component {

  constructor(props){
    super(props);

    this.state={
      isMobile: true,
      title: '注册',
      timer: 59,
      codeTitle: '获取验证码',
    }
  }

  _close(){
    this.props.navigation.goBack();
  }

  _switch(){
    
  }

  _fetchCode(){
    this.interval = setInterval(
      () => this.setState((prevState)=> 
        (
        { timer: prevState.timer - 1 , codeTitle: prevState.timer + '重新发送'}
        )),
      1000
    );
  }

  componentDidUpdate(){
    if(this.state.timer === 1){ 
        clearInterval(this.interval);
      }
  }

  fetchData(){
    
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <View style={styles.header}>
          <ImageBackground source={require("../../images/background.png")} style={{width: '100%', height: '100%'}}>
            <View style={styles.headerButon}>
            <TouchableOpacity
              onPress={this._close.bind(this)}
              activeOpacity={1}
            >
              <Ionicons style={styles.headerLeft} name='close' size={15} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this._switch.bind(this)}
              activeOpacity={1}
            > 
              <Text style={styles.headerRight}>{this.state.title}</Text>
            </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.body}>
          <View>
            <TextInput ref="email"
                       autoCapitalize="none"
                       placeholder="邮箱"
                       autoCorrect={false}
                       style={[styles.inputText,{ margin: 20}]}
                       returnKeyType='next'
                       underlineColorAndroid="transparent"
             />
          </View>
          <View style={[styles.inputText, {margin: 20,}]}>
             <TextInput ref="code"
                      autoCapitalize="none"
                      placeholder="验证码"
                      autoCorrect={false}
                      keyboardType='numeric'
                      maxLength={6}
                      returnKeyType='next'
                      underlineColorAndroid="transparent"

            />
            <Text onPress={this._fetchCode.bind(this)}>{this.state.codeTitle}</Text>
          </View>
        </View>
        <View style={{flex: 1, backgroundColor:'#ddd'}}>
        </View>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flex: 1,
  },
  headerButon: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerLeft: {
    flex: 1,
    marginLeft: 15,
  },
  headerRight: {
    flex: 1,
    marginRight: 15,
    fontSize: 10,
  },
  body: {
    flex: 4,
    margin: 30
  },

  codeButton: {

  },
  inputText: {
    flexDirection: 'row',
    borderBottomColor: 'red',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    color: '#42A5F5',
    fontSize: 15,
    fontWeight: '100',
  },
})

export default Login;