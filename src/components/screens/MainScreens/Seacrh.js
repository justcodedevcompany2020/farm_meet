import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar, useColorScheme} from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {
    getProductsByCatalogCategoryId,
    setProductId,
    getBasketInfo,
    addToBasket,
    setSearchProduct,
} from '../../../store/actions/farmMeatActions';
import Footer from '../../includes/Footer'
import BackIcon from '../../../assets/svg/back_icon.js'
import BasketIcon from '../../../assets/svg/product_basket'
import StarIcon from '../../../assets/svg/star_icon'
import MinusIcon from '../../../assets/svg/minus_icon'
import PlusIcon from '../../../assets/svg/plus_icon'
import BasketBlock from '../../includes/BasketBlock';
import  SearchIcon from '../../../assets/svg/search_icon2';
import  DeleteIcon from '../../../assets/svg/delete_search_icon';


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
    TouchableHighlight
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
    const {catalog_products_data, catalog_id, basket_info, search_product} = useSelector(state => state.farmMeatReducer);

    const [search, setSearch] = useState(search_product);
    const [search_info, setSearchInfo] = useState([]);

    useEffect(() => {
        dispatch(getProductsByCatalogCategoryId(catalog_id))
    }, [dispatch]);


    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            getSearchInfo()
        });

        return unsubscribe;
    }, [props.navigation])

    const context = useContext(AuthContext);

    const getSearchInfo = async () => {
        let userInfo = await AsyncStorage.getItem('user');
        userInfo = JSON.parse(userInfo)
        let token =  userInfo.token;
        let session =  userInfo.session;
        console.log(token, 'token');
        console.log(session, 'session');

        try {

            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${token}`);

            let formdata = new FormData();
            formdata.append("session", session);
            formdata.append("search", search);
            formdata.append("category", '');

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            let response = await fetch("https://farm-meat.site/shop/products/", requestOptions);
            let data = await response.json();

            console.log(data, 'searchInfo');
            if (response.status == 200) {
                setSearchInfo(data)

            }

            resolve(true);
        } catch (error) {
            // reject(error);
        }
    }

    const redirectToProductSinglePage = (id) => {
        dispatch(setProductId(id,() => {
            props.navigation.navigate('ProductSinglePageScreen')
        }))

    }

    const  findInBasket = (id) => {
        let productId = id;
        let objectsWithProductId = basket_info[0].products.filter(obj => obj.product.id === productId);
        let hasObjectsWithProductId = objectsWithProductId.length > 0;
        return hasObjectsWithProductId ? objectsWithProductId : null;
    }

    const addToBasketHandler = (id, amount) => {
        dispatch(addToBasket(id, amount))

    }

    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#EFF4D6" translucent = {true}/>
            <View style={styles.catalog_products_header_wrapper}>
                <TouchableOpacity style={styles.catalog_products_header_btn_text_box}
                                  onPress={() => {
                                      setSearch('')
                                      props.navigation.goBack()
                                  }}
                >
                    <BackIcon/>
                    <Text style={styles.catalog_products_header_btn_text}>МЯСО</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.catalog_products_items_main_wrapper}>
                <View style={styles.home_catalog_search_input_field_icon_wrapper}>
                    <TouchableOpacity onPress={() => {
                        getSearchInfo()
                    }}>
                        <SearchIcon/>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.home_catalog_search_input_field}
                        onChangeText={(val) =>
                        {
                            setSearch(val)
                            dispatch(setSearchProduct(val))
                        }
                        }
                        value={search}
                        placeholder='Название продукта'
                        placeholderTextColor='#B8B8B8'
                    />

                    {search.length > 0 &&
                        <TouchableOpacity style={styles.delete_icon} onPress={() => {
                            setSearch('')
                            getSearchInfo()
                        }}>
                            <DeleteIcon/>
                        </TouchableOpacity>
                    }

                </View>
                <View style={styles.catalog_products_items_wrapper}>
                    {search_info.length > 0 ?
                        <View style={{width: '100%'}}>
                            {search_info.map((item, index) => {
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
                                                {findInBasket(item.id) ?
                                                    <TouchableHighlight>
                                                        <View style={styles.catalog_products_item_plus_minus_btns_wrapper}>
                                                            <TouchableOpacity
                                                                style={styles.catalog_products_item_minus_btn}
                                                                onPress={() => {
                                                                    addToBasketHandler(item.id, findInBasket(item.id)[0].amount - 1)
                                                                }}
                                                            >
                                                                <MinusIcon/>
                                                            </TouchableOpacity>
                                                            <Text style={styles.catalog_products_item_quantity_info}>
                                                                {findInBasket(item.id)[0].amount}
                                                            </Text>
                                                            <TouchableOpacity
                                                                style={styles.catalog_products_item_plus_btn}
                                                                onPress={() => {
                                                                    addToBasketHandler(item.id, findInBasket(item.id)[0].amount + 1)
                                                                }}
                                                            >
                                                                <PlusIcon/>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </TouchableHighlight>

                                                    :
                                                    <TouchableHighlight>
                                                        <TouchableOpacity
                                                            style={styles.catalog_products_item_basket_icon}
                                                            onPress={() => {
                                                                addToBasketHandler(item.id, 1)
                                                            }}
                                                        >
                                                            <BasketIcon/>
                                                        </TouchableOpacity>
                                                    </TouchableHighlight>
                                                }


                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )

                            })}
                        </View>
                      :
                        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 60}}>
                            <Text style={{fontWeight: '600', color: '#4E7234', fontSize: 20,}}>Ничего не найдено</Text>
                        </View>
                    }

                </View>
            </ScrollView>


            <BasketBlock  navigation={props.navigation}/>
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
    home_catalog_search_input_field_icon_wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        // shadowOffset: {width: 2, height: 5},
        // shadowColor: 'rgb(0, 0, 0)',
        // shadowOpacity: 3,
        // shadowRadius: 19,
        // elevation: 10,
        paddingHorizontal: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 19,
        shadowRadius: 4.65,

        elevation: 10,
        // paddingVertical: 8,
        height: 44,
        marginBottom: 20,
        position: 'relative'

    },
    delete_icon: {
      position: 'absolute',
      right: 12,
      top: 12
    },
    home_catalog_search_input_field: {
        fontWeight: '300',
        color: '#B8B8B8',
        fontSize: 16,
        marginLeft: 4,
    },
});
