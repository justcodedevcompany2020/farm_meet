import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext} from "../components/AuthContext/context";
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from "react-native-splash-screen";

import {useDispatch, useSelector, Provider} from 'react-redux';
import {checkToken} from '../store/actions/farmMeatActions';
import AuthScreen from '../components/screens/AuthScreens/Auth';
import HomeScreen from '../components/screens/MainScreens/Home';

// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();




const RootNavigator = () => {
    // AsyncStorage.clear()
    const dispatch = useDispatch();
    const {isLoggedIn, user} = useSelector(state => state.farmMeatReducer);

    React.useEffect(() => {
        dispatch(checkToken());
    }, [dispatch]);


    return (
            <NavigationContainer>

                <Stack.Navigator
                    initialRouteName='AuthScreen'
                    screenOptions={{
                        headerShown: false,
                        animationEnabled: true,
                        detachPreviousScreen: true,
                        presentation: 'transparentModal'
                    }}
                >



                    {isLoggedIn ? (
                        <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    ) : (
                        <>
                            <Stack.Screen
                                name="AuthScreen"
                                component={AuthScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                            />

                        </>
                    )}




                </Stack.Navigator>
            </NavigationContainer>


    );
};

export default RootNavigator;
