import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar, useColorScheme} from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {getSingleProductByProductId, setProductId} from '../../../store/actions/farmMeatActions';
import Footer from '../../includes/Footer'
import ProductBackIcon from '../../../assets/svg/product_back_icon'
import ProductBasketIcon from '../../../assets/svg/single_product_basket_icon'

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
    Dimensions
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

function ProductSinglePage (props) {
    const dispatch = useDispatch();
    const {single_product_data, product_id} = useSelector(state => state.farmMeatReducer);

    useEffect(() => {
        dispatch(getSingleProductByProductId(product_id))
    }, [dispatch]);


    const context = useContext(AuthContext);




    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#EFF4D6" translucent = {true}/>
            <ScrollView style={styles.single_product_main_wrapper}>
                <View style={styles.single_product_header_wrapper}>
                    <TouchableOpacity style={styles.single_product_header_back_btn}
                                      onPress={() => {
                                          props.navigation.goBack()
                                      }}
                    >
                        <ProductBackIcon/>
                    </TouchableOpacity>
                    <View style={styles.single_product_header_img}>
                        {single_product_data.images.length > 0 ?
                            <Image style={styles.single_product_header_img_child} source={{uri: single_product_data.images[0]?.image}}/>
                            :
                            <Image style={styles.single_product_header_img_child} source={require('../../../assets/images/single_page_img.png')}/>
                        }
                    </View>
                </View>
                <View style={styles.single_product_info_part_wrapper}>
                    <View style={styles.single_product_title_price_info_basket_icon_wrapper}>
                        <View style={styles.single_product_title_price_info_box}>
                            <Text style={styles.single_product_title}>{single_product_data?.title} 450г</Text>
                            <ImageBackground borderRadius={5} source={require('../../../assets/images/button_back_img.png')} style={styles.single_product_price_info_box}>
                                <Text style={styles.single_product_price_info}>{single_product_data?.price}</Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.single_product_basket_btn_plus_minus_btns_wrapper}>
                            <TouchableOpacity style={styles.single_product_basket_btn}>
                                <ProductBasketIcon/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>

            <Footer active_page={'home_catalog'} navigation={props.navigation}/>


        </SafeAreaView>
    );
}

export default ProductSinglePage;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        width: "100%",
        height:  '100%',

    },
    single_product_header_wrapper: {
        width: '100%',
        marginBottom: 16,
        position: 'relative'
    },
    single_product_header_back_btn: {
        position: 'absolute',
        left: 10,
        top: 20,
        zIndex: 999,
    },
    single_product_header_img: {
        width: '100%',
        height: 350,
    },
    single_product_header_img_child: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    single_product_main_wrapper: {
        width: '100%',
        flex: 1,
    },
    single_product_title_price_info_basket_icon_wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    single_product_title: {
        color: '#4E7234',
        fontWeight: '400',
        fontSize: 21,
        marginBottom: 15,
    },
    single_product_info_part_wrapper: {
        width: '100%',
        paddingHorizontal: 12,
    },
    single_product_price_info_box: {
        borderRadius: 8,
        width: 99,
        height: 37,
        justifyContent: 'center',
        alignItems: 'center'
    },
    single_product_price_info: {
        color: '#4E7234',
        fontWeight: '500',
        fontSize: 17,
    },
    single_product_basket_btn: {
        backgroundColor: '#B9D149',
        borderRadius: 7,
        width: 93,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
