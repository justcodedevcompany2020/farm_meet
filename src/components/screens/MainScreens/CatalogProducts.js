import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar, useColorScheme} from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {getProductsByCatalogCategoryId, setProductId} from '../../../store/actions/farmMeatActions';
import Footer from '../../includes/Footer'
import BackIcon from '../../../assets/svg/back_icon.js'
import BasketIcon from '../../../assets/svg/product_basket'
import StarIcon from '../../../assets/svg/star_icon'
import MinusIcon from '../../../assets/svg/minus_icon'
import PlusIcon from '../../../assets/svg/plus_icon'

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

function CatalogProducts (props) {
    const dispatch = useDispatch();
    const {catalog_products_data, catalog_id} = useSelector(state => state.farmMeatReducer);

    useEffect(() => {
        dispatch(getProductsByCatalogCategoryId(catalog_id))
    }, [dispatch]);


    const context = useContext(AuthContext);


    const redirectToProductSinglePage = (id) => {
        dispatch(setProductId(id,() => {
            props.navigation.navigate('ProductSinglePageScreen')
        }))

    }


    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#EFF4D6" translucent = {true}/>
            <View style={styles.catalog_products_header_wrapper}>
                <TouchableOpacity style={styles.catalog_products_header_btn_text_box}
                                  onPress={() => {
                                      props.navigation.goBack()
                                  }}
                >
                    <BackIcon/>
                    <Text style={styles.catalog_products_header_btn_text}>МЯСО</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.catalog_products_items_main_wrapper}>
                <View style={styles.catalog_products_items_wrapper}>
                    {catalog_products_data.length > 0 && catalog_products_data.map((item, index) => {
                        return(
                            <TouchableOpacity key={index} style={styles.catalog_products_item}
                                onPress={() => {
                                    redirectToProductSinglePage(item.id)
                                }}
                            >
                                <View style={styles.catalog_products_item_img}>
                                    {item.images.length > 0 ?
                                        <Image style={styles.catalog_products_item_img_child} source={{uri: item.images[0]?.image}}/>
                                        :
                                        <Image style={styles.catalog_products_item_img_child} source={require('../../../assets/images/catalog_product_img.png')}/>
                                    }
                                    <View style={styles.catalog_products_item_rate_info_box}>
                                        <StarIcon/>
                                        <Text style={styles.catalog_products_item_rate_info}>4.7</Text>
                                    </View>
                                </View>
                                <View style={styles.catalog_products_item_info_wrapper}>
                                    <Text style={styles.catalog_products_item_title} numberOfLines={2}>{item.title}</Text>
                                    <Text style={styles.catalog_products_item_quantity}>450г</Text>
                                    <View style={styles.catalog_products_item_price_info_basket_icon_wrapper}>
                                        <ImageBackground borderRadius={5} source={require('../../../assets/images/button_back_img.png')} style={styles.catalog_products_item_price_info_box}>
                                            <Text style={styles.catalog_products_item_price_info}>{item.price}/шт</Text>
                                        </ImageBackground>
                                        {/*<TouchableOpacity style={styles.catalog_products_item_basket_icon}>*/}
                                        {/*    <BasketIcon/>*/}
                                        {/*</TouchableOpacity>*/}
                                        <View style={styles.catalog_products_item_plus_minus_btns_wrapper}>
                                            <TouchableOpacity style={styles.catalog_products_item_minus_btn}>
                                                <MinusIcon/>
                                            </TouchableOpacity>
                                            <Text style={styles.catalog_products_item_quantity_info}>1</Text>
                                            <TouchableOpacity style={styles.catalog_products_item_plus_btn}>
                                                <PlusIcon/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )

                    })}
                </View>
            </ScrollView>


            <Footer active_page={'home_catalog'} navigation={props.navigation}/>


        </SafeAreaView>
    );
}

export default CatalogProducts;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        width: "100%",
        height:  '100%',

    },
    catalog_products_header_wrapper: {
        width: '100%',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#EFF4D6',
        paddingTop: 16,
        paddingBottom: 14,
    },
    catalog_products_header_btn_text_box: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 9,
    },
    catalog_products_header_btn_text: {
        fontWeight: '400',
        color: '#4E7234',
        fontSize: 22,
        marginLeft: 8,
},
    catalog_products_items_main_wrapper: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 25,
    },
    catalog_products_items_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'wrap'

    },
    catalog_products_item: {
        marginBottom: 15,
        width: '48.5%',
        backgroundColor: '#ffffff',
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 3,
        shadowRadius: 25,
        elevation: 10,
        borderRadius: 5,
        paddingBottom: 12,
    },
    catalog_products_item_img:{
        width: '100%',
        height: 162,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 6,

    },
    catalog_products_item_img_child: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    catalog_products_item_title: {
        fontWeight: '400',
        color: '#4E7234',
        fontSize: 16,
        height: 21
    },
    catalog_products_item_quantity: {
        fontWeight: '300',
        color: '#4E7234',
        fontSize: 16,
        marginBottom: 10,
    },
    catalog_products_item_info_wrapper: {
        width: '100%',
        paddingHorizontal: 8,
    },
    catalog_products_item_price_info_basket_icon_wrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    catalog_products_item_price_info_box: {
        borderRadius: 5,
        // backgroundColor: '#ffffffcd',
        shadowOffset: {width: 2, height: 4},
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 3,
        shadowRadius: 19,
        elevation: 10,
        paddingVertical: 8,
        paddingHorizontal: 5,
        resizeMode: 'contain',
        marginRight: 8,
        flex: 1,

    },
    catalog_products_item_price_info: {
        fontWeight: '700',
        color: '#4E7234',
        fontSize: 13,
        textAlign: 'center'
    },
    catalog_products_item_basket_icon: {
        backgroundColor: '#B9D149',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 54,
        height: 33,
    },
    catalog_products_item_rate_info_box: {
        backgroundColor: '#B9D149',
        borderRadius: 5,
        width: 54,
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,

    },
    catalog_products_item_rate_info: {
        fontWeight: '400',
        color: '#ffffff',
        fontSize: 11,
        marginLeft: 4,
    },
    catalog_products_item_plus_minus_btns_wrapper: {
        backgroundColor: '#B9D149',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 33,
        // width: 71,
        paddingHorizontal: 10,

    },
    catalog_products_item_quantity_info: {
        fontSize: 17,
        color: '#ffffff',
        fontWeight: '600',
        marginLeft: 5,
        marginRight: 5,
    },
    catalog_products_item_minus_btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 33,
    },

    catalog_products_item_plus_btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 33,
    },
});
