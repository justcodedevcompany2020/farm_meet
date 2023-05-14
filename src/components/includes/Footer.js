import * as React from 'react';
import  { useState, useRef } from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G, Use, Pattern, } from "react-native-svg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CatalogActiveSvg from '../../assets/svg/catalog_active';
import CatalogNoActiveSvg from '../../assets/svg/catalog_no_active';
import StockNoActiveSvg from '../../assets/svg/stock_no_active';
import BasketNoActiveSvg from '../../assets/svg/basket_no_active';
import BasketActiveSvg from '../../assets/svg/basket_active';
import ProfileActiveSvg from '../../assets/svg/profile_active';
import ProfileNoActiveSvg from '../../assets/svg/profile_no_active';





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
    Dimensions
} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Footer (props) {


    const redirectToHomeCatalogScreen = () => {
        props.navigation.navigate('HomeCatalogScreen')
    }





    return (
        <View style={styles.footer}>

            <View style={styles.footer_wrapper}>
                {props.active_page == 'home_catalog' ?
                    <TouchableOpacity style={styles.footer_item}>
                        <View style={styles.footer_item_icon}>
                            <CatalogActiveSvg/>
                        </View>
                        <Text style={styles.footer_item_title_active}>Каталог</Text>

                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.footer_item} onPress={() => redirectToHomeCatalogScreen()}>
                        <View style={styles.footer_item_icon}>
                            <CatalogNoActiveSvg/>
                        </View>
                        <Text style={styles.footer_item_title_no_active}>Каталог</Text>
                    </TouchableOpacity>
                }

                {props.active_page == 'stock' ?
                    <TouchableOpacity style={styles.footer_item}>
                        <View style={styles.footer_item_icon}>
                            <StockNoActiveSvg/>
                        </View>
                        <Text style={styles.footer_item_title_active}>Акции</Text>

                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.footer_item}>
                        <View style={styles.footer_item_icon}>
                            <StockNoActiveSvg/>
                        </View>
                        <Text style={styles.footer_item_title_no_active}>Акции</Text>
                    </TouchableOpacity>
                }

                {props.active_page == 'basket' ?
                    <TouchableOpacity style={styles.footer_item}>
                        <View style={styles.footer_item_icon}>
                            <BasketActiveSvg/>
                        </View>
                        <Text style={styles.footer_item_title_active}>Корзина</Text>

                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.footer_item}>
                        <View style={styles.footer_item_icon}>
                            <BasketNoActiveSvg/>
                        </View>
                        <Text style={styles.footer_item_title_no_active}>Корзина</Text>
                    </TouchableOpacity>
                }

                {props.active_page == 'profile' ?
                    <TouchableOpacity style={styles.footer_item}>
                        <View style={styles.footer_item_icon}>
                            <ProfileActiveSvg/>
                        </View>
                        <Text style={styles.footer_item_title_active}>Профиль</Text>

                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.footer_item}>
                        <View style={styles.footer_item_icon}>
                            <ProfileNoActiveSvg/>
                        </View>
                        <Text style={styles.footer_item_title_no_active}>Профиль</Text>
                    </TouchableOpacity>
                }




            </View>

        </View>
    );
}

export default Footer;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        width: "100%",
        height: "100%",
    },
    footer: {
        width: '100%',
        paddingTop: 12,
        paddingBottom: 20,
        borderWidth: 2,
        borderColor: '#E9E9E9',
    },
    footer_wrapper: {
        width: 305,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },

    footer_item: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    footer_item_icon: {
        marginBottom: 4
    },
    footer_item_title_active: {
        fontWeight: '400',
        color: '#4C7032',
        fontSize: 14,
    },
    footer_item_title_no_active: {
        fontWeight: '400',
        color: '#B4B4B4',
        fontSize: 14,
    }

});
