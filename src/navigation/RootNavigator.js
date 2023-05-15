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
import HomeCatalogScreen from '../components/screens/MainScreens/HomeCatalog';
import CatalogProductsScreen from '../components/screens/MainScreens/CatalogProducts';
import ProductSinglePageScreen from '../components/screens/MainScreens/ProductSinglePage';
import BasketScreen from '../components/screens/MainScreens/Basket';

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
                {isLoggedIn ? (
                    <Stack.Navigator
                        initialRouteName='HomeCatalogScreen'
                        screenOptions={{
                            headerShown: false,
                            animationEnabled: true,
                            detachPreviousScreen: true,
                            presentation: 'transparentModal'
                        }}
                    >
                        <Stack.Screen
                            name="HomeCatalogScreen"
                            component={HomeCatalogScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />
                        <Stack.Screen
                            name="CatalogProductsScreen"
                            component={CatalogProductsScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />
                        <Stack.Screen
                            name="ProductSinglePageScreen"
                            component={ProductSinglePageScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />
                        <Stack.Screen
                            name="BasketScreen"
                            component={BasketScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />
                    </Stack.Navigator>

                ) : (
                <>
                    <Stack.Navigator
                        initialRouteName='AuthScreen'
                        screenOptions={{
                            headerShown: false,
                            animationEnabled: true,
                            detachPreviousScreen: true,
                            presentation: 'transparentModal'
                        }}
                    >
                        <Stack.Screen
                            name="AuthScreen"
                            component={AuthScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />

                    </Stack.Navigator>

                </>
            )}





            </NavigationContainer>


    );
};

export default RootNavigator;
