import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar, useColorScheme} from 'react-native';
import {AuthContext} from "../AuthContext/context";
import { useContext } from 'react';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {getBasketInfo, addToBasket} from '../../store/actions/farmMeatActions';
import BasketBlockIcon from '../../assets/svg/basket_block_icon'
import BasketBackIcon from '../../assets/svg/basket_block_back_btn'

import {
    Text,
    Alert,
    Button,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    Platform,
    Dimensions,
    Switch,
} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function BasketBlock (props) {
    const dispatch = useDispatch();
    const {basket_info} = useSelector(state => state.farmMeatReducer);



    useEffect(() => {
        dispatch(getBasketInfo())
    }, [dispatch]);


    const context = useContext(AuthContext);

    const redirectToBasketScreen = () => {
        props.navigation.navigate('BasketScreen')
    }

    const getTotalAmount = () => {
        let count = 0;
        if (basket_info.length > 0) {
            let products = basket_info[0].products;

            for (let i = 0; i < products.length; i++) {
                count += products[i].amount;
            }

        }
        return count;
    }

    return (
            <View style={styles.basket_block_wrapper}>
                {basket_info.length > 0 && basket_info[0].products.length > 0 &&
                    <TouchableOpacity
                        style={styles.basket_block_btn}
                        onPress={() => {
                            redirectToBasketScreen()
                        }}
                    >
                        <View style={styles.basket_block_btn_icon_info_wrapper}>
                            <View style={styles.basket_block_btn_icon_quantity_info_box}>
                                <BasketBlockIcon/>
                                <Text style={styles.basket_block_btn_quantity_info}>
                                    {getTotalAmount()}
                                </Text>
                            </View>

                            <View style={styles.basket_block_btn_main_info}>
                                    <View style={styles.basket_block_btn_title_total_info}>
                                        <Text style={styles.basket_block_btn_title}>Корзина</Text>
                                        <Text style={styles.basket_block_btn_total_info}>{basket_info[0]?.total}</Text>
                                    </View>
                                    <Text style={styles.basket_block_btn_info2}>Доставка   бесплатно</Text>
                            </View>
                        </View>

                        <BasketBackIcon/>



                    </TouchableOpacity>
                }
            </View>

    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        width: "100%",
        height:  '100%',

    },
    basket_block_wrapper: {
        width: '100%',
    },
    basket_block_btn: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4E7234',
        paddingVertical: 15,
        paddingHorizontal: 25,
    },
    basket_block_btn_icon_info_wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    basket_block_btn_icon_quantity_info_box: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    basket_block_btn_quantity_info: {
        color: '#ffffff',
        fontSize: 21,
        fontWeight: '600',
        marginLeft: 11,
    },
    basket_block_btn_title_total_info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },

    basket_block_btn_title: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '700',
        marginRight: 5,
    },
    basket_block_btn_total_info: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    basket_block_btn_info2: {
        color: '#ffffff',
        fontSize: 9,
        fontWeight: '400',
    },
});

export default BasketBlock;
