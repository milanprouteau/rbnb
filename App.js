import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from './helpers/rootReducer';
import Splash from "./screens/Splash";
import Home from "./screens/Home";
import Details from "./screens/Details";
import Profil from "./screens/Profil";
import Search from "./screens/Search";
import Login from "./screens/Login";

const persistConfig = {key: 'root', storage: AsyncStorage};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);


const BottomNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor}) => (
                    <Icon
                        name={"list"}
                        color={tintColor}
                        size={24}
                    />
                )
            })
        },
        Search: {
            screen: Search,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor}) => (
                    <Icon
                        name={"search"}
                        color={tintColor}
                        size={24}
                    />
                )
            })
        },
        Profil: {
            screen: Profil,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor}) => (
                    <Icon
                        name={"user"}
                        color={tintColor}
                        size={24}
                    />
                )
            })
        }

    },
    {
        tabBarOptions: {
            showLabel: false,
            activeTintColor: '#7766C6',
            inactiveTintColor: 'black',
        }
    }
);

const AppNavigator = createStackNavigator(
    {
        Splash: {screen: Splash, navigationOptions: {headerShown: false}},
        Login: {screen: Login, navigationOptions: {headerShown: false}},
        Home: {screen: BottomNavigator, navigationOptions: {headerShown: false}},
        Details: {screen: Details, navigationOptions: {headerShown: false}},
    },
    {
        initialRouteName: 'Splash'
    }
);

const AppContainer = createAppContainer(AppNavigator);

class App extends Component{
    render() {
      return <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
                <AppContainer/>
          </PersistGate>
      </Provider>
    }
}

export default App;
