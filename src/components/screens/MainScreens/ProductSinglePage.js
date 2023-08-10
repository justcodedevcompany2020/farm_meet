import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar, useColorScheme} from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {getSingleProductByProductId, setProductId, getBasketInfo, addToBasket} from '../../../store/actions/farmMeatActions';
import Footer from '../../includes/Footer'
import ProductBackIcon from '../../../assets/svg/product_back_icon'
import ProductBasketIcon from '../../../assets/svg/single_product_basket_icon'
import StarFullIcon from '../../../assets/svg/star_full_icon'
import StarNotFullIcon from '../../../assets/svg/star_not_full_icon'
import SmallStarFullIcon from '../../../assets/svg/small_star_full_icon'
import SmallStarNotFullIcon from '../../../assets/svg/small_star_not_full_icon'
import RecommendationsBasketIcon from '../../../assets/svg/recommendations_basket_icon'
import MinusIcon from '../../../assets/svg/minus_big_icon'
import PlusIcon from '../../../assets/svg/plus_big_icon'
import BasketBlock from '../../includes/BasketBlock';



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

function ProductSinglePage (props) {
    const dispatch = useDispatch();
    const {single_product_data, product_id, basket_info} = useSelector(state => state.farmMeatReducer);

    const [show_feedback, setShowFeedback] = useState(false);
    const [show_loader, setShowLoader] = useState(true);
    const [random_products, setRandomProducts] = useState([]);

    useEffect(() => {
        dispatch(getSingleProductByProductId(product_id))
    }, [dispatch]);

    function getRandomRoundNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getThreeUniqueRandomNumbers(min, max) {
        const numbers = new Set();

        // Ensure there's enough range to generate three unique numbers
        if (max - min < 2) {
            throw new Error('Range too small to generate three unique numbers.');
        }

        while (numbers.size < 3) {
            numbers.add(getRandomRoundNumber(min, max));
        }

        return [...numbers];
    }

    const getProductsInfo = async () => {
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
            formdata.append("category", '');


            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            let response = await fetch("https://farm-meat.site/shop/products/", requestOptions);
            let data = await response.json();

            console.log(data, 'products');
            const [randomRoundNumber1, randomRoundNumber2, randomRoundNumber3] = getThreeUniqueRandomNumbers(1, data.length - 1);

            console.log(randomRoundNumber1, randomRoundNumber2, randomRoundNumber3, 'randoms');

            let random_products = [];
            console.log(data.length, 'lenght');

            if (response.status == 200) {
                for (let i = 0; i < data.length ; i++) {
                    if (i == randomRoundNumber1 || i == randomRoundNumber2 || i == randomRoundNumber3) {
                            random_products.push(data[i])
                    }
                }

                setRandomProducts(random_products)

                console.log(random_products, 'randomProducts');
            }

            resolve(true);
        } catch (error) {
            // reject(error);
        }
    }


    useEffect(() => {
        setShowLoader(true)
    }, []);

    useEffect(() => {
        getProductsInfo()
    }, []);

    useEffect(() => {
        dispatch(getBasketInfo())
        setTimeout(() => {
            setShowLoader(false)
        }, 1700)
    }, [dispatch]);



    const context = useContext(AuthContext);

    const feedback = [
        {
            id: 1,
            name: 'Елена',
            feedback: 'Все очень хорошо, радует качество товара.',
            date: '24 марта 2023',
        },
        {
            id: 2,
            name: 'Елена',
            feedback: 'Все очень хорошо, радует качество товара.',
            date: '24 марта 2023',
        },
        {
            id: 3,
            name: 'Елена',
            feedback: 'Все очень хорошо, радует качество товара.',
            date: '24 марта 2023',
        },
        {
            id: 4,
            name: 'Елена',
            feedback: 'Все очень хорошо, радует качество товара.',
            date: '24 марта 2023',
        },
        {
            id: 5,
            name: 'Елена',
            feedback: 'Все очень хорошо, радует качество товара.',
            date: '24 марта 2023',
        },
    ];
    const recommendations = [
        {
            id: 1,
            title: 'Купаты куриные 450г',
            price: '440',
            img: require('../../../assets/images/recommendations_img.png')
        },
        {
            id: 2,
            title: 'Купаты куриные 450г',
            price: '440',
            img: require('../../../assets/images/recommendations_img.png')
        },

        {
            id: 3,
            title: 'Купаты куриные 450г',
            price: '440',
            img: require('../../../assets/images/recommendations_img.png')
        },
        {
            id: 4,
            title: 'Купаты куриные 450г',
            price: '440',
            img: require('../../../assets/images/recommendations_img.png')
        },
        {
            id: 5,
            title: 'Купаты куриные 450г',
            price: '440',
            img: require('../../../assets/images/recommendations_img.png')
        },
    ];

    const  findInBasket = (id) => {
        let productId = id;
        let objectsWithProductId = basket_info[0].products.filter(obj => obj.product.id === productId);
        let hasObjectsWithProductId = objectsWithProductId.length > 0;
        return hasObjectsWithProductId ? objectsWithProductId : null;
    }

    const addToBasketHandler = (id, amount) => {
        dispatch(addToBasket(id, amount))

    }

    if (show_loader) {
        return (
            <View style={{backgroundColor: '#ffffff', position: 'absolute', top: 0, left: 0,  justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '100%',  height: '100%', }}>

                <ActivityIndicator size="large" color="#4E7234" />

            </View>
        )
    }

    const redirectToProductSinglePage = (id) => {
        dispatch(setProductId(id,() => {
            props.navigation.navigate('ProductSinglePageScreen')
        }))
        dispatch(getSingleProductByProductId(id))

    }




    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#EFF4D6" translucent = {true}/>
            <ScrollView style={styles.single_product_main_wrapper}>
                <View style={styles.single_product_header_wrapper}>
                    <TouchableOpacity
                         style={styles.single_product_header_back_btn}
                          onPress={() => {
                              props.navigation.goBack()
                          }}
                    >
                        <ProductBackIcon/>
                    </TouchableOpacity>
                    <View style={styles.single_product_header_img}>
                        {single_product_data?.images?.length > 0 ?
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
                                <Text style={styles.single_product_price_info}>{single_product_data?.price}Р/шт</Text>
                            </ImageBackground>
                        </View>
                        <View>
                            {findInBasket(product_id) ?
                                <View style={styles.catalog_products_item_plus_minus_btns_wrapper}>
                                    <TouchableOpacity
                                        style={styles.catalog_products_item_minus_btn}
                                        onPress={() => {
                                            addToBasketHandler(product_id, findInBasket(product_id)[0].amount - 1)
                                        }}
                                    >
                                        <MinusIcon/>
                                    </TouchableOpacity>
                                    <Text style={styles.catalog_products_item_quantity_info}>
                                        {findInBasket(product_id)[0].amount}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.catalog_products_item_plus_btn}
                                        onPress={() => {
                                            addToBasketHandler(product_id, findInBasket(product_id)[0].amount + 1)
                                        }}
                                    >
                                        <PlusIcon/>
                                    </TouchableOpacity>
                                </View>

                                :
                                <View style={styles.single_product_basket_btn_plus_minus_btns_wrapper}>
                                    <TouchableOpacity
                                        style={styles.single_product_basket_btn}
                                        onPress={() => {
                                            addToBasketHandler(product_id, 1)
                                        }}
                                    >
                                        <ProductBasketIcon/>
                                    </TouchableOpacity>
                                </View>
                            }

                        </View>

                    </View>
                    <View style={styles.single_product_description_main_wrapper}>
                        {single_product_data?.description ?
                            <Text>{single_product_data.description}</Text>
                            :
                            <View style={styles.single_product_description_wrapper}>
                                <Text style={[styles.single_product_description, {marginBottom: 12}]}>
                                    <Text style={styles.single_product_description_bold_text}>Состав:</Text>
                                    <View style={{paddingHorizontal: 3}}></View>
                                     мясо птицы, мясо птицы механической обвалки, кожа птицы, соль, ароматизаторы (кориандр, тмин, перец черный, мускат), чеснок.
                                </Text>
                                <Text style={[styles.single_product_description, {width: '85%'}]}>
                                    <Text style={styles.single_product_description_bold_text}>Пищевая и энергетическая ценность в 100г:</Text>
                                    <View style={{paddingHorizontal: 1,}}>
                                    </View>
                                    жир – 6,0 г; белок - 14,0 г; углеводы – 2,0 г.,
                                    500 кДж/120 ккал
                                </Text>
                            </View>

                        }
                    </View>
                    {/*<View style={styles.single_product_feedbacks_wrapper}>*/}
                        {/*<TouchableOpacity style={styles.single_product_feedback_btn}*/}
                        {/*    onPress={() => {*/}
                        {/*        setShowFeedback(!show_feedback)*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*        <View style={styles.single_product_feedback_btn_title_star_icons_wrapper}>*/}
                        {/*                <Text style={styles.single_product_feedback_btn_title}>*/}
                        {/*                    Отзывы*/}
                        {/*                    <View style={{paddingHorizontal: 2}}></View>*/}
                        {/*                    <Text style={styles.single_product_feedback_btn_title2}>87</Text>*/}
                        {/*                </Text>*/}
                        {/*            <View style={styles.single_product_feedback_btn_stars_wrapper}>*/}
                        {/*                <StarFullIcon/>*/}
                        {/*                <StarFullIcon/>*/}
                        {/*                <StarFullIcon/>*/}
                        {/*                <StarFullIcon/>*/}
                        {/*                <StarNotFullIcon/>*/}
                        {/*            </View>*/}
                        {/*        </View>*/}
                        {/*       <Text style={styles.single_product_feedback_btn_rating_info}>4.6 / 5</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {/*{show_feedback &&*/}
                        {/*    <View style={styles.single_product_feedbacks_items_wrapper}>*/}
                        {/*        {feedback.map((item, index) => {*/}
                        {/*            return(*/}
                        {/*                <View key={index} style={styles.single_product_feedbacks_item}>*/}
                        {/*                    <Text style={styles.single_product_feedbacks_item_name}>{item.name}</Text>*/}
                        {/*                    <View style={styles.single_product_feedbacks_item_stars_date_wrapper}>*/}
                        {/*                        <View style={styles.single_product_feedbacks_item_stars_wrapper}>*/}
                        {/*                            <SmallStarFullIcon/>*/}
                        {/*                            <SmallStarFullIcon/>*/}
                        {/*                            <SmallStarFullIcon/>*/}
                        {/*                            <SmallStarFullIcon/>*/}
                        {/*                            <SmallStarNotFullIcon/>*/}
                        {/*                        </View>*/}
                        {/*                        <Text style={styles.single_product_feedbacks_item_date}>{item.date}</Text>*/}
                        {/*                    </View>*/}
                        {/*                    <Text style={styles.single_product_feedbacks_item_feedback_text}>{item.feedback}</Text>*/}
                        {/*                </View>*/}
                        {/*            )*/}

                        {/*        })}*/}
                        {/*    </View>*/}
                        {/*}*/}
                    {/*</View>*/}
                    <View style={styles.single_product_recommendations_wrapper}>
                        <Text style={styles.single_product_recommendations_title}>Рекомендации:</Text>
                        <ScrollView horizontal={true} nestedScrollEnabled={true} style={styles.single_product_recommendations_items_wrapper}>
                            {random_products.map((item, index) => {
                                {console.log(item.images, 'image')}
                                return(
                                   <TouchableOpacity
                                       style={styles.single_product_recommendations_item} key={index}
                                       onPress={() => {
                                           redirectToProductSinglePage(item.id)
                                       }}
                                   >
                                        <View style={styles.single_product_recommendations_item_img}>
                                            <Image source={item.images[0]?.image ? {uri:  item.images[0]?.image} : require('../../../assets/images/recommendations_img.png')} style={styles.single_product_recommendations_item_img_child}/>
                                        </View>
                                       <Text numberOfLines={3} style={styles.single_product_recommendations_item_title}>
                                           {item.title}
                                       </Text>
                                       <View style={styles.single_product_recommendations_item_price_add_basket_btn_wrapper}>
                                           <Text style={styles.single_product_recommendations_item_price}>{item.price}Р\шт</Text>

                                           {/*<TouchableOpacity*/}
                                           {/*    style={styles.single_product_recommendations_basket_btn}*/}
                                           {/*    onPress={() => {*/}
                                           {/*        addToBasketHandler(product_id, 1)*/}
                                           {/*    }}*/}
                                           {/*>*/}
                                           {/*    <RecommendationsBasketIcon/>*/}
                                           {/*</TouchableOpacity>*/}

                                       </View>
                                   </TouchableOpacity>
                                )

                            })}
                        </ScrollView>
                    </View>
                </View>

            </ScrollView>

            <BasketBlock  navigation={props.navigation}/>
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
        zIndex: 999999999999,
        width: 50,
        height: 50
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
        justifyContent: 'space-between'
    },
    single_product_title: {
        color: '#4E7234',
        fontWeight: '400',
        fontSize: 21,
        marginBottom: 8,
    },
    single_product_info_part_wrapper: {
        width: '100%',
        paddingHorizontal: 12,
    },
    single_product_price_info_box: {
        borderRadius: 8,
        width: 120,
        height: 37,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 3,
        shadowRadius: 19,
        elevation: 10,
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
    },
    single_product_title_price_info_box: {
        width: '70%',
    },
    single_product_description: {
        fontWeight: '500',
        fontSize: 14,
        color: '#898989',
    },
    single_product_description_bold_text: {
        color: '#4E7234',

    },
    single_product_description_main_wrapper: {
        width: '100%',
        marginBottom: 17,
    },
    single_product_description_wrapper: {
        width: '100%',
    },

    single_product_feedback_btn: {
        width: '100%',
        borderRadius: 15,
        backgroundColor: '#ffffff',
        shadowOffset: {width: 0, height: 4},
        shadowColor: 'rgba(0, 0, 0, 0,25)',
        shadowOpacity: 0.25,
        shadowRadius: 0,
        elevation: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    single_product_feedbacks_wrapper: {
        width: '100%',
        marginBottom: 17,
    },
    single_product_feedback_btn_title: {
        fontWeight: '500',
        fontSize: 21,
        color: '#4E7234',
        marginBottom: 6,
    },
    single_product_feedback_btn_title2: {
        color: '#898989',
        fontSize: 17,
    },
    single_product_feedback_btn_stars_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 136,
    },
    single_product_feedback_btn_rating_info: {
        fontWeight: '500',
        fontSize: 21,
        color: '#4E7234',
    },
    single_product_feedbacks_items_wrapper: {
        width: '100%',
        paddingHorizontal: 21,
    },
    single_product_feedbacks_item: {
        width: '100%',
        marginBottom: 34,
        paddingTop: 15,
    },
    single_product_feedbacks_item_name: {
        fontWeight: '400',
        fontSize: 16,
        color: '#4E7234',
        marginBottom: 3,
    },
    single_product_feedbacks_item_stars_date_wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginBottom: 10,
    },
    single_product_feedbacks_item_stars_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 105,
        marginRight: 17,
    },
    single_product_feedbacks_item_date: {
        fontWeight: '400',
        fontSize: 14,
        color: '#898989',
    },
    single_product_feedbacks_item_feedback_text: {
        fontWeight: '400',
        fontSize: 14,
        color: '#898989',
    },
    single_product_recommendations_wrapper: {
        width: '100%',
        marginBottom: 20,
    },
    single_product_recommendations_title: {
        fontWeight: '400',
        fontSize: 21,
        color: '#4E7234',
        marginBottom: 12,
    },
    single_product_recommendations_items_wrapper: {
        width: '100%',
    },
    single_product_recommendations_item: {
        width: 114,
        marginRight: 8,
    },
    single_product_recommendations_item_img: {
        width: 114,
        height: 97,
        marginBottom: 8,
    },
    single_product_recommendations_item_img_child: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    single_product_recommendations_item_title: {
        fontWeight: '700',
        fontSize: 14,
        color: '#4E7234',
        marginBottom: 6,
        width: 100,
        height: 50
    },
    single_product_recommendations_item_price_add_basket_btn_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    single_product_recommendations_item_price: {
        fontWeight: '400',
        fontSize: 14,
        color: '#B9D149',
    },
    single_product_recommendations_basket_btn: {
        backgroundColor: '#B9D149',
        borderRadius: 4,
        width: 44,
        height: 33,
        justifyContent: 'center',
        alignItems: 'center'
    },
    catalog_products_item_plus_minus_btns_wrapper: {
        backgroundColor: '#B9D149',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 43,
        width: 110,
        paddingHorizontal: 10,

    },
    catalog_products_item_plus_minus_btns_wrapper2: {
        backgroundColor: '#B9D149',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 43,
        width: 110,
        paddingHorizontal: 10,
    },
    catalog_products_item_quantity_info: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: '600',
        marginLeft: 5,
        marginRight: 5,
    },
    catalog_products_item_minus_btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 43,
    },

    catalog_products_item_plus_btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 43,
    },
});
