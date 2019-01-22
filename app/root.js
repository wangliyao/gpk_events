import React from 'react';
import HomeScreen from './pages/home'
import UserScreen from './pages/user'
import DetailsScreen from './pages/details'
import SubjectScreen from './pages/subject'
import ListScreen from './components/list'
import LoginScreen from './pages/user/login'
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import {createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';


const Home = createStackNavigator({ HomeScreen });
const List = createStackNavigator({ ListScreen });
const Subject = createStackNavigator({ SubjectScreen })
const User = createStackNavigator({ UserScreen });


const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: '首页',
      }
    },
    Subject: {
      screen: Subject,
      navigationOptions: {
        tabBarLabel: '主题',
      }
    },
    User: {
      screen: User,
      navigationOptions: {
        tabBarLabel: '用户',
      }
    },
  },
  {
    defaultNavigationOptions:({ navigation }) => ({ 
      tabBarIcon:({tintColor, horizontal, focused}) => {
        const { routeName } = navigation.state
        if (routeName == 'Home'){
          iconName = 'home'
        }else if(routeName == 'User'){
          iconName = 'account'
        }else if (routeName == 'Subject'){
          iconName = 'text-subject'
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const RootStack = createStackNavigator({
  TabNavigator,
  Details: { screen: DetailsScreen },
  List: ListScreen,
  LoginScreen,
},{
  headerMode: 'none',
})


const AppContainer = createAppContainer(RootStack)

export default AppContainer;