import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar, useColorScheme} from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {
    getBasketInfo,
    addToBasket,
    getProfileData,
    setProductId,
    getSingleProductByProductId,
} from '../../../store/actions/farmMeatActions';
import Footer from '../../includes/Footer'
import BackIcon from '../../../assets/svg/back_icon.js'
import MinusIcon from '../../../assets/svg/minus_icon'
import PlusIcon from '../../../assets/svg/plus_icon'
import PaymentIcon from '../../../assets/svg/payment_icon'
import PaymentCloseIcon from '../../../assets/svg/payment_close_icon'
import CardIcon  from '../../../assets/svg/card_icon'
import CashIcon  from '../../../assets/svg/cash_icon'
import ChoosePaymentMethodIcon  from '../../../assets/svg/choose_payment_method_icon'
import EditIcon  from '../../../assets/svg/edit_btn'
import { WebView } from 'react-native-webview';




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
    Keyboard
} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import StarIcon from '../../../assets/svg/star_icon';
import {SET_BASKET_INFO, SET_PROFILE_INFO} from '../../../store/actions/type';
import AddAddressIcon from '../../../assets/svg/add_address_icon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Basket (props) {
    const dispatch = useDispatch();
    const {basket_info} = useSelector(state => state.farmMeatReducer);

    const [collector_comment, setCollectorComment] = useState('');
    const [delivery_address_city, setDeliveryAddressCity] = useState('');
    const [delivery_address_office, setDeliveryAddressOffice] = useState('');
    const [delivery_address_entrance, setDeliveryAddressEntrance] = useState('');
    const [delivery_address_floor, setDeliveryAddressFloor] = useState('');
    const [delivery_address_intercom, setDeliveryAddressIntercom] = useState('');

    const [promo_code, setPromoCode] = useState('');
    const [comment_courier, setCommentCourier] = useState('');
    const [show_payment_methods_popup, setShowPaymentMethodsPopup] = useState(false);
    const [choose_payment_method, setChoosePaymentMethod] = useState('Наличными при получении');

    const [show_delivery_info, setShowDeliveryInfo] = useState(false);
    const [show_pickup_info, setShowPickupInfo] = useState(false);
    const [delivery_address_popup, setDeliveryAddressPopup] = useState(false);
    const [show_addresses_list, setShowAddressesList] = useState(false);
    const [found_address_box, setFoundAddressesBox] = useState([]);
    const [payment_method, setPaymentMethod] = useState('1');
    const [order_id, setOrderId] = useState('');
    const [payment_url, setPaymentUrl] = useState('');
    const [show_payment_url, setShowPaymentUrl] = useState(false);


    const [order_success, setOrderSuccess] = useState(false);

    const [last_address, setLastAddress] = useState('');
    const [profile_info, setProfileInfo] = useState({});

    const [selected_address, setSelectedAddress] = useState(null);



    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [random_products, setRandomProducts] = useState([]);



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


    const toggleSwitch = () => {
        if (basket_info[0]?.total < 2000) {
            setIsEnabled(false)
            setIsEnabled2(true)

        } else {
            setIsEnabled(isEnabled => !isEnabled)
            setIsEnabled2(isEnabled2 => !isEnabled2)
            // setShowPickupInfo(false)
            // setShowDeliveryInfo(show_delivery_info => !show_delivery_info)
        }

    };



    const toggleSwitch2 = () => {
        if (basket_info[0]?.total < 2000) {
            setIsEnabled2(true)
            setIsEnabled(false)


        } else {
            setIsEnabled2(isEnabled2 => !isEnabled2)
            setIsEnabled(isEnabled => !isEnabled)
            // setShowDeliveryInfo(false)
            // setShowPickupInfo(show_pickup_info => !show_pickup_info)
        }

    };

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        dispatch(getBasketInfo())
    }, [dispatch]);


    useEffect(() => {
        if (basket_info[0]?.total < 2000) {
            setIsEnabled(false)
            setIsEnabled2(true)
        } else {
            setIsEnabled(true)
            setIsEnabled2(false)
        }

        console.log(basket_info[0]?.total, 'basket_info[0]?.total');
    }, [basket_info]);

    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            getProfileInfo()
        });

        return unsubscribe;
    }, [props.navigation])


    const getProfileInfo = async () => {
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

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            let response = await fetch("https://farm-meat.site/shop/user/info/", requestOptions);
            let data = await response.json();

            console.log(data, 'profileInfo');
            if (response.status == 200) {
                setProfileInfo(data)
                for (let i = 0; i < data.addresses.length; i++) {
                        if (data.addresses[i].id == data.last_addres) {
                            setLastAddress(data.addresses[i].text)
                        }
                }
            }

            resolve(true);
        } catch (error) {
            // reject(error);
        }
    }

    const add_to_basket = [
        {
            id: 1,
            img: require('../../../assets/images/add_basket_img.png'),
            title: 'Купаты куриные',
            quantity: '450г',
            price: '440',
        },
        {
            id: 2,
            img: require('../../../assets/images/add_basket_img.png'),
            title: 'Купаты куриные',
            quantity: '450г',
            price: '440',
        },
        {
            id: 3,
            img: require('../../../assets/images/add_basket_img.png'),
            title: 'Купаты куриные',
            quantity: '450г',
            price: '440',
        }
    ]

    const context = useContext(AuthContext);

    const  findInBasket = (id) => {
        let productId = id;
        let objectsWithProductId = basket_info[0].products.filter(obj => obj.product.id === productId);
        let hasObjectsWithProductId = objectsWithProductId.length > 0;
        return hasObjectsWithProductId ? objectsWithProductId : null;
    }

    const addToBasketHandler = (id, amount) => {
        console.log(id, amount, 'kkkkkkkkkkkkkkk');
        dispatch(addToBasket(id, amount))

    }

    const makeAnOrder = async () => {
        let userInfo = await AsyncStorage.getItem('user');
        userInfo = JSON.parse(userInfo)
        let token =  userInfo.token;
        let session =  userInfo.session;
        console.log(token, 'token');
        console.log(session, 'session');
        let products = [];

        let basket_products = basket_info[0]?.products;
        for (let i = 0; i < basket_products.length; i++) {
            console.log(basket_products[i].product.price, 'kkk');
             let product_detail = {
                 product: basket_products[i].product.id,
                 amount: basket_products[i].amount,
                 price: basket_products[i].product.price,
             }
            products.push(product_detail)
        }
        try {

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Token ${token}`);


            let raw = JSON.stringify({
                session: session,
                payment_method: payment_method,
                delivery_address: last_address == '' ? null : last_address,
                comment: collector_comment.length > 0 ? collector_comment : null,
                comment_dop: comment_courier.length > 0 ? comment_courier : null,
                products: products
            });

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            let response = await fetch("https://farm-meat.site/shop/orders/create/", requestOptions);
            let data = await response.json();

            console.log(raw, 'raw');
            if (response.status == 200) {


                setOrderId(data.order_id)

                if (payment_method == '1') {
                    setOrderSuccess(true)
                    setTimeout(() => {
                        setOrderSuccess(false)
                        props.navigation.navigate('HomeCatalogScreen')
                    }, 2000)
                    dispatch(getBasketInfo())
                } else if (payment_method == '0') {


                    let myHeaders = new Headers();
                    myHeaders.append("Authorization", `Token ${token}`);

                    let formdata = new FormData();
                    formdata.append("id", data.order_id);
                    formdata.append("session", session);

                    let requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: formdata,
                        redirect: 'follow'
                    };

                    fetch("https://farm-meat.site/shop/orders/payment/", requestOptions)
                        .then(response => response.json())
                        .then(result => {console.log(result, 'url')
                            if (result.hasOwnProperty('message')) {
                                if (result.message == "Payment url create successful.") {
                                    if (result.hasOwnProperty('url')) {
                                        setShowPaymentUrl(true)
                                        setPaymentUrl(result.url)
                                    }
                                }
                            }

                        })
                        .catch(error => console.log('error', error));





                }




            }

        } catch (error) {
            // reject(error);
            console.log(error);
        }



    }


    const selectSetAddress = async (item) => {
        setSelectedAddress(item)
        let userInfo = await AsyncStorage.getItem('user');
        userInfo = JSON.parse(userInfo)
        let token =  userInfo.token;
        let session =  userInfo.session;
        console.log(token, 'token');
        console.log(session, 'session');
        try {

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Token ${token}`);

            console.log(item, 'item_function');

            let raw = JSON.stringify({
                session: session,
                text: item.address,
                latitude: parseInt(item.latitude),
                longitude: parseInt(item.longitude),
                comment: ""

            });

            console.log(raw, 'raaaaw3');
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            let response = await fetch("https://farm-meat.site/shop/user/set_address/", requestOptions);
            let data = await response.json();

            console.log(data, 'set new address');

            if (data.hasOwnProperty('message')) {
                if (data.message == 'Adress set successful.') {
                    dispatch(getBasketInfo())
                    getProfileInfo()
                    setShowAddressesList(false)
                    setDeliveryAddressPopup(false)
                }
            }


        } catch (error) {
            // reject(error);
            console.log(error);
        }
    }


    const setAddressYandex = async () => {
        // setDeliveryAddressCity(val)
        // if (val.length < 3) {
        //     setShowAddressesList(false)
        //     return false;
        //
        // }
        let address = 'Россия';
        if (delivery_address_city.length != 0) {
            address += delivery_address_city
        }

        if (delivery_address_office != 0) {
            address += `,${delivery_address_office}`
        }

        if (delivery_address_entrance != 0) {
            address += `,${delivery_address_entrance}`
        }

        if (delivery_address_floor != 0) {
            address += `,${delivery_address_floor}`
        }
        if (delivery_address_intercom != 0) {
            address += `,${delivery_address_intercom}`
        }
        console.log(address, 'adrekdddddddddddddd');
        try {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };



            let url = `https://geocode-maps.yandex.ru/1.x/?apikey=18e0ef3c-65f2-4193-8487-cbf9451dd7a2&format=json&geocode=${encodeURIComponent(address)}`;
            console.log(url, 'url');

            let response = await fetch(url, requestOptions);
            let data = await response.json();


            console.log(data, 'set address');

            let found = data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found;
            console.log(found, 'found');

            let addresses = [];

            if (found > 0) {
                let futureMember = data.response.GeoObjectCollection.featureMember;
                console.log(futureMember, 'found addresses');
                for (let i = 0; i < futureMember.length; i++) {
                    let pos = futureMember[i].GeoObject.Point.pos;
                    let parts = pos.split(' ', 2);  // Splits the string by the first space
                    console.log(parts, 'partsss');
                    let dinamic_object = {address: futureMember[i].GeoObject.metaDataProperty.GeocoderMetaData.text, latitude: parts[0], longitude: parts[1]};
                    addresses.push(dinamic_object)
                }

                console.log(addresses, 'new addressess');
            }
            setFoundAddressesBox(addresses)
            setShowAddressesList(true)



        } catch (error) {
            // reject(error);
            console.log(error);
        }
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
            const [randomRoundNumber1, randomRoundNumber2, randomRoundNumber3] = getThreeUniqueRandomNumbers(1, data.length -1);

            console.log(randomRoundNumber1, randomRoundNumber2, randomRoundNumber3, 'randoms');

            let random_products = [];

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

    const redirectToProductSinglePage = (id) => {
        dispatch(setProductId(id,() => {
            props.navigation.navigate('ProductSinglePageScreen')
        }))
        dispatch(getSingleProductByProductId(id))

    }

    useEffect(() => {
        getProductsInfo()
    }, []);



    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#EFF4D6" translucent = {true}/>
            <View style={styles.basket_header_wrapper}>
                <TouchableOpacity style={styles.basket_header_back_btn}
                                  onPress={() => {
                                      props.navigation.goBack()
                                  }}
                >
                    <BackIcon/>
                    <Text style={styles.basket_header_title}>КОРЗИНА</Text>
                </TouchableOpacity>

            </View>
            <ScrollView style={styles.basket_main_wrapper}>
                <View style={styles.basket_items_wrapper}>
                    {basket_info.length > 0 && basket_info[0].products.length > 0 && basket_info[0].products.map((item, index) => {
                        console.log(basket_info[0].products, 'bsko');
                        return(
                            <View key={index} style={styles.basket_item}>
                                    <TouchableOpacity style={styles.basket_item_img}>
                                        {item?.product?.images?.length > 0 ?
                                            <Image style={styles.basket_item_img_child}  source={{uri: item?.product?.images[0]?.image}} />
                                            :
                                            <Image  style={styles.basket_item_img_child}  source={require('../../../assets/images/basket_img.png')} />

                                        }
                                    </TouchableOpacity>
                                    <View style={styles.basket_item_info_box}>
                                        <Text style={styles.basket_item_title}>{item?.product?.title}</Text>
                                        <Text style={styles.basket_item_quantity_info}>450г</Text>
                                        <View style={styles.basket_item_price_info_plus_minus_btns_wrapper}>
                                            <View style={styles.catalog_products_item_plus_minus_btns_wrapper}>
                                                <TouchableOpacity
                                                    style={styles.catalog_products_item_minus_btn}
                                                    onPress={() => {
                                                        addToBasketHandler(item.product?.id, item?.amount - 1)
                                                    }}
                                                >
                                                    <MinusIcon/>
                                                </TouchableOpacity>
                                                <Text style={styles.catalog_products_item_quantity_info}>{item?.amount}</Text>
                                                <TouchableOpacity
                                                    style={styles.catalog_products_item_plus_btn}
                                                    onPress={() => {
                                                        addToBasketHandler(item.product?.id, item?.amount + 1)
                                                    }}
                                                >
                                                    <PlusIcon/>
                                                </TouchableOpacity>
                                            </View>
                                            <ImageBackground borderRadius={5} source={require('../../../assets/images/button_back_img.png')} style={styles.basket_item_price_info_box}>
                                                <Text style={styles.basket_item_price_info}>{item?.product?.price}/шт</Text>
                                            </ImageBackground>
                                        </View>
                                    </View>
                            </View>
                        )

                    })}
                </View>
                <View style={styles.add_to_order_wrapper}>
                    <Text style={styles.add_to_order_title}>Добавить к заказу?</Text>
                    <ScrollView horizontal={true} nestedScrollEnabled={true} style={styles.add_to_order_items_wrapper}>
                        {random_products.map((item, index) => {
                            return(
                                <View key={index} style={styles.add_to_order_item}>
                                    <TouchableOpacity
                                        style={styles.add_to_order_item_img}
                                        onPress={() => {
                                            redirectToProductSinglePage(item.id)
                                        }}
                                    >
                                        <Image source={item.images[0]?.image ? {uri:  item.images[0]?.image} : require('../../../assets/images/recommendations_img.png')} style={styles.add_to_order_item_img_child}/>

                                    </TouchableOpacity>
                                    <View style={styles.add_to_order_item_info_box}>
                                        <Text numberOfLines={3} style={styles.add_to_order_item_title}>{item.title}</Text>
                                        {/*<Text style={styles.add_to_order_item_quantity_info}>{item.quantity}</Text>*/}
                                        <Text style={styles.add_to_order_item_price_info}>{item.price}Р\шт</Text>
                                    </View>
                                </View>
                            )

                        })}

                    </ScrollView>

                    {/*{random_products.length > 2 ?*/}
                    {/*    <ScrollView horizontal={true} nestedScrollEnabled={true} style={styles.add_to_order_items_wrapper}>*/}
                    {/*        {random_products.map((item, index) => {*/}
                    {/*            return(*/}
                    {/*                <View key={index} style={styles.add_to_order_item}>*/}
                    {/*                    <TouchableOpacity*/}
                    {/*                        style={styles.add_to_order_item_img}*/}
                    {/*                        onPress={() => {*/}
                    {/*                            redirectToProductSinglePage(item.id)*/}
                    {/*                        }}*/}
                    {/*                    >*/}
                    {/*                        <Image source={item.images[0]?.image ? {uri:  item.images[0]?.image} : require('../../../assets/images/recommendations_img.png')} style={styles.add_to_order_item_img_child}/>*/}

                    {/*                    </TouchableOpacity>*/}
                    {/*                    <View style={styles.add_to_order_item_info_box}>*/}
                    {/*                        <Text numberOfLines={3} style={styles.add_to_order_item_title}>{item.title}</Text>*/}
                    {/*                        /!*<Text style={styles.add_to_order_item_quantity_info}>{item.quantity}</Text>*!/*/}
                    {/*                        <Text style={styles.add_to_order_item_price_info}>{item.price}Р\шт</Text>*/}
                    {/*                    </View>*/}
                    {/*                </View>*/}
                    {/*            )*/}

                    {/*        })}*/}

                    {/*    </ScrollView>*/}
                    {/*    :*/}
                    {/*    <View style={styles.add_to_order_items_wrapper2}>*/}
                    {/*        {add_to_basket.map((item, index) => {*/}
                    {/*            return(*/}
                    {/*                <View key={index} style={styles.add_to_order_item}>*/}
                    {/*                    <TouchableOpacity style={styles.add_to_order_item_img}>*/}
                    {/*                        <Image  style={styles.add_to_order_item_img_child}  source={item.img} />*/}
                    {/*                    </TouchableOpacity>*/}
                    {/*                    <View style={styles.add_to_order_item_info_box}>*/}
                    {/*                        <Text style={styles.add_to_order_item_title}>{item.title}</Text>*/}
                    {/*                        <Text style={styles.add_to_order_item_quantity_info}>{item.quantity}</Text>*/}
                    {/*                        <Text style={styles.add_to_order_item_price_info}>{item.price}Р\шт</Text>*/}

                    {/*                    </View>*/}
                    {/*                </View>*/}
                    {/*            )*/}

                    {/*        })}*/}

                    {/*    </View>*/}
                    {/*}*/}

                </View>


                <View style={styles.basket_main_info_details_items_wrapper}>
                        <View style={styles.basket_main_info_details_item}>
                            <Text style={styles.basket_main_info_details_item_title}>Скидки</Text>
                            <Text style={styles.basket_main_info_details_item_text}>-20 р</Text>
                        </View>
                        <View style={styles.basket_main_info_details_item}>
                            <Text style={styles.basket_main_info_details_item_title}>
                                Доставка
                                <View style={{paddingHorizontal: 2}}></View>
                                <Text style={styles.basket_main_info_details_item_title_second_info}>От 2000 р</Text>
                            </Text>
                            <Text style={styles.basket_main_info_details_item_text}>0 р</Text>
                        </View>
                        <View style={styles.basket_main_info_details_item}>
                            <Text style={styles.basket_main_info_details_item_title2}>Общая сумма заказа</Text>
                            <Text style={styles.basket_main_info_details_item_text2}>{basket_info[0]?.total}</Text>
                        </View>
                </View>
                <View style={styles.basket_line}></View>
                <View style={styles.basket_collector_comment_input_wrapper}>
                    <Text style={styles.basket_collector_comment_input_title}>Комментарий сборщику</Text>

                    <TextInput
                        style={[styles.basket_collector_comment_input_field]}
                        onChangeText={(val) => setCollectorComment(val)}
                        value={collector_comment}
                        placeholder='Напишите, что важно учесть в заказе'
                        placeholderTextColor='#4E7234'
                    />

                </View>
                <View style={[styles.basket_collector_comment_input_wrapper, {marginBottom: 32}]}>
                    <Text style={styles.basket_collector_comment_input_title}>Промокод</Text>
                    <TextInput
                        style={[styles.basket_collector_comment_input_field]}
                        onChangeText={(val) => setPromoCode(val)}
                        value={promo_code}
                        keyboardType={'phone-pad'}
                        // placeholder='Напишите, что важно учесть в заказе'
                        // placeholderTextColor='#4E7234'
                    />

                </View>

                <View style={styles.basket_delivery_pickup_info_items_wrapper}>
                    <View style={styles.basket_delivery_pickup_info_items_box}>
                        <View style={styles.basket_delivery_pickup_info_item}>
                            <Text style={styles.basket_delivery_pickup_info_item_title}>Доставка</Text>
                            <Switch
                                trackColor={{false: '#f0f0f0', true: '#B9D149'}}
                                thumbColor={isEnabled ? '#ffffff' : '#B9D149'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}


                            />
                        </View>
                        <View style={styles.basket_delivery_pickup_info_item}>
                            <View style={styles.basket_delivery_pickup_info_item_title_text_box}>
                                <Text style={styles.basket_delivery_pickup_info_item_title}>Самовывоз</Text>
                                <Text style={styles.basket_delivery_pickup_info_item_text}>забрать бесплатно
                                    из пункта самовывоза</Text>
                            </View>
                            <Switch
                                trackColor={{false: '#f0f0f0', true: '#B9D149'}}
                                thumbColor={isEnabled2 ? '#ffffff' : '#B9D149'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch2}
                                value={isEnabled2}


                            />
                        </View>


                    </View>

                    {isEnabled &&
                    <View style={styles.delivery_info_wrapper}>
                        <Text style={styles.delivery_info_wrapper_title}>Адрес доставки</Text>
                        <View style={styles.delivery_address_info_edit_btn_wrapper}>
                            {profile_info?.addresses?.length > 0 ?
                                <Text style={styles.delivery_address_info}>
                                    {last_address}
                                </Text>
                                :
                                <TouchableOpacity style={styles.profile_add_address_btn} onPress={() => {
                                    setDeliveryAddressPopup(true)
                                }}>
                                    <Text style={styles.profile_add_address_btn_text}>+ Добавить новый адрес</Text>
                                    <AddAddressIcon/>
                                </TouchableOpacity>
                            }

                            {profile_info?.addresses?.length > 0 &&
                                <TouchableOpacity style={styles.delivery_address_info_edit_btn}
                                                  onPress={() => {
                                                      setDeliveryAddressPopup(true)
                                                  }}
                                >
                                    <EditIcon/>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>

                    }
                    {isEnabled2 &&
                    <View style={styles.delivery_info_wrapper}>
                        <Text style={styles.delivery_info_wrapper_title}>Условия и адрес самовывоза</Text>
                        <Text style={styles.pickup_info_wrapper_info}>
                            Г.Нижний Новгород, ул Геологов 2Б График работы с понедельника по пятницу с 9.00 до 17.00
                        </Text>
                        <Text style={styles.pickup_info_wrapper_info}>
                            Самовывоз доступен только по согласованию с менеджером.
                        </Text>
                    </View>

                    }

                </View>
                <View style={[styles.basket_collector_comment_input_wrapper, {marginBottom: 36}]}>
                    <Text style={styles.basket_collector_comment_input_title}>Комментарий курьеру</Text>

                    <TextInput
                        style={[styles.basket_collector_comment_input_field]}
                        onChangeText={(val) => setCommentCourier(val)}
                        value={comment_courier}
                        placeholder='Напишите, что важно учесть в заказе'
                        placeholderTextColor='#4E7234'
                    />

                </View>
                <TouchableOpacity style={styles.basket_payment_method_wrapper}
                              onPress={() => {
                                  setShowPaymentMethodsPopup(true)
                              }}
                >
                    <View style={styles.basket_payment_method_info_box}>
                        <Text style={styles.basket_payment_method_title}>Способ оплаты</Text>
                        <Text style={styles.basket_payment_method_text}>
                            Выберите способ оплаты
                        </Text>
                        {choose_payment_method != '' &&
                            <Text style={{ fontWeight: '600', color: '#4E7234', fontSize: 16,}}>{choose_payment_method}</Text>
                        }
                    </View>
                    <View style={styles.basket_payment_method_btn}>
                        <PaymentIcon/>
                    </View>

                </TouchableOpacity>

            </ScrollView>
            <View style={styles.order_basket_btn_box}>
                {basket_info[0]?.products?.length > 0 ?
                    <TouchableOpacity

                        style={styles.order_basket_btn}
                        onPress={() => {
                            makeAnOrder()
                        }}
                    >
                        <Text style={styles.order_basket_btn_text}>Заказать</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        disabled={true}
                        style={[styles.order_basket_btn, {opacity: 0.6}]}
                    >
                        <Text style={styles.order_basket_btn_text}>Заказать</Text>
                    </TouchableOpacity>

                }

            </View>

            {isKeyboardVisible === false &&
                 <Footer active_page={'basket'} navigation={props.navigation}/>
            }

            {show_payment_methods_popup &&
                <View style={styles.payment_methods_popup}>
                    <View style={styles.payment_methods_popup_wrapper}>
                        <TouchableOpacity style={styles.payment_methods_popup_close_btn}
                                      onPress={() => {
                                          setShowPaymentMethodsPopup(false)
                                      }}
                        >
                            <PaymentCloseIcon/>
                        </TouchableOpacity>
                        <Text style={styles.payment_methods_popup_title}>Способ оплаты</Text>
                        <View style={styles.payment_methods_popup_items_wrapper}>
                            <View style={[styles.payment_methods_popup_item, {
                                borderBottomWidth: 2,
                                borderBottomColor: '#EFF4D6',
                                paddingBottom: 16,
                            }]}>
                                <TouchableOpacity
                                    style={styles.payment_methods_popup_item_btn}
                                      onPress={() => {
                                          setChoosePaymentMethod('Переводом СБП')
                                          setPaymentMethod('0')
                                          setShowPaymentMethodsPopup(false)

                                      }}
                                >
                                    <View style={styles.payment_methods_popup_item_btn_icon_title_wrapper}>
                                        <View style={styles.payment_methods_popup_item_btn_icon}>
                                            <CardIcon/>
                                        </View>

                                        <Text style={styles.payment_methods_popup_item_btn_title}>Переводом СБП</Text>
                                    </View>
                                    {choose_payment_method == 'Переводом СБП' &&
                                        <View style={styles.payment_methods_popup_item_btn_choosen_icon}>
                                            <ChoosePaymentMethodIcon/>
                                        </View>
                                    }

                                </TouchableOpacity>
                            </View>
                            <View style={styles.payment_methods_popup_item}>
                                <TouchableOpacity
                                    style={styles.payment_methods_popup_item_btn}
                                    onPress={() => {
                                        setChoosePaymentMethod('Наличными при получении')
                                        setPaymentMethod('1')
                                        setShowPaymentMethodsPopup(false)

                                    }}
                                >
                                    <View style={styles.payment_methods_popup_item_btn_icon_title_wrapper}>
                                        <View style={styles.payment_methods_popup_item_btn_icon}>
                                            <CashIcon/>
                                        </View>

                                        <Text style={styles.payment_methods_popup_item_btn_title}>Наличными при получении</Text>
                                    </View>
                                    {choose_payment_method == 'Наличными при получении' &&
                                        <View style={styles.payment_methods_popup_item_btn_choosen_icon}>
                                            <ChoosePaymentMethodIcon/>
                                        </View>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            }
            {delivery_address_popup &&
            <View style={styles.delivery_address_popup}>
                <View style={styles.delivery_address_popup_wrapper}>
                    <View style={styles.basket_header_wrapper}>
                        <TouchableOpacity style={styles.basket_header_back_btn}
                                          onPress={() => {
                                              setDeliveryAddressPopup(false)
                                          }}
                        >
                            <BackIcon/>
                            <Text style={styles.basket_header_title}>КОРЗИНА</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.delivery_address_popup_box}>
                        <TouchableOpacity style={styles.delivery_address_popup_close_btn}
                                          onPress={() => {
                                              setDeliveryAddressPopup(false)
                                          }}
                        >
                            <PaymentCloseIcon/>
                        </TouchableOpacity>
                        <Text style={styles.delivery_address_popup_title}>Адрес доставки</Text>
                        <View style={[styles.delivery_address_popup_input_wrapper]}>
                            <TextInput
                                style={[styles.delivery_address_popup_input_field]}
                                onChangeText={(val) => setDeliveryAddressCity(val)}
                                value={delivery_address_city}
                                placeholder='Город, улица, дом'
                                placeholderTextColor='#CFCFCF'

                            />
                        </View>

                        <View style={styles.delivery_address_popup_details_inputs_wrapper}>
                            <TextInput
                                style={[styles.delivery_address_popup_details_input_field]}
                                onChangeText={(val) => setDeliveryAddressOffice(val)}
                                value={delivery_address_office}
                                placeholder='кв/офис'
                                placeholderTextColor='#CFCFCF'
                                keyboardType={'phone-pad'}
                            />
                            <TextInput
                                style={[styles.delivery_address_popup_details_input_field]}
                                onChangeText={(val) => setDeliveryAddressEntrance(val)}
                                value={delivery_address_entrance}
                                placeholder='подъезд'
                                placeholderTextColor='#CFCFCF'
                                keyboardType={'phone-pad'}
                            />

                            <TextInput
                                style={[styles.delivery_address_popup_details_input_field]}
                                onChangeText={(val) => setDeliveryAddressFloor(val)}
                                value={delivery_address_floor}
                                placeholder='этаж'
                                placeholderTextColor='#CFCFCF'
                                keyboardType={'phone-pad'}
                            />
                            <TextInput
                                style={[styles.delivery_address_popup_details_input_field]}
                                onChangeText={(val) => setDeliveryAddressIntercom(val)}
                                value={delivery_address_intercom}
                                placeholder='домофон'
                                placeholderTextColor='#CFCFCF'
                                keyboardType={'phone-pad'}
                            />


                        </View>
                    </View>
                    <TouchableOpacity style={styles.delivery_address_popup_save_btn} onPress={() => {
                        setAddressYandex()
                    }}>
                        <Text style={styles.delivery_address_popup_save_btn_text}>Сохранить</Text>
                    </TouchableOpacity>

                    {show_addresses_list &&
                    <View style={styles.address_wrapper}>
                        <View style={styles.address_wrapper_child}>
                            {/*<TouchableOpacity style={styles.delivery_address_popup_close_btn}*/}
                            {/*                  onPress={() => {*/}
                            {/*                      setShowAddressesList(false)*/}
                            {/*                  }}*/}
                            {/*>*/}
                            {/*    <PaymentCloseIcon/>*/}
                            {/*</TouchableOpacity>*/}
                            {found_address_box.length > 0
                                ?
                                <ScrollView style={styles.address_wrapper_child_scrollbox}>
                                    {found_address_box.map((item, index) => {
                                        console.log(item.address, 'iteeeeem');
                                        return(
                                            <TouchableOpacity key={index}
                                                              style={styles.address_item}
                                                              onPress={() => {
                                                                  selectSetAddress(item)
                                                              }}
                                            >

                                                <Text style={styles.address_item_text}>{item.address}</Text>
                                            </TouchableOpacity>
                                        )

                                    })}
                                </ScrollView>
                                :
                                <View style={styles.address_wrapper_not_found}>
                                    <Text style={styles.address_wrapper_not_found_text}>
                                        Адрес не найден
                                    </Text>
                                </View>


                            }
                        </View>

                    </View>
                    }

                </View>
            </View>
            }
            {order_success &&
                <View style={styles.order_success_popup}>
                    <View style={styles.order_success_popup_wrapper}>
                        <Text style={styles.order_success_popup_title}>Заказ принят спасибо</Text>
                    </View>
                </View>
            }

            {show_payment_url &&
            <View style={styles.payment_popup}>
                <View style={styles.payment_popup_wrapper}>
                    {/*<TouchableOpacity style={{right: 20, top: 20, position: 'absolute', zIndex: 9999}} onPress={() => setShowPaymentUrl(false)}>*/}

                    {/*    <Svg*/}
                    {/*        xmlns="http://www.w3.org/2000/svg"*/}
                    {/*        width={35}*/}
                    {/*        height={35}*/}
                    {/*        viewBox="0 0 35 35"*/}
                    {/*        fill="none"*/}
                    {/*    >*/}
                    {/*        <Path*/}
                    {/*            d="M17.499 17.78L9.141 9.36m-.063 16.779l8.421-8.358-8.421 8.358zm8.421-8.358l8.421-8.359L17.5 17.78zm0 0l8.358 8.42-8.358-8.42z"*/}
                    {/*            stroke="#4E7234"*/}
                    {/*            strokeWidth={2}*/}
                    {/*            strokeLinecap="round"*/}
                    {/*        />*/}
                    {/*    </Svg>*/}

                    {/*</TouchableOpacity>*/}
                    <WebView
                        style={{
                            height: '100%',
                            width: '100%',
                            flex: 1,
                        }}
                        useWebKit={true}
                        source={{ uri: payment_url}}
                        androidHardwareAccelerationDisabled={true}
                        allowFileAccess={true}
                        onNavigationStateChange={(webViewState)=>{
                            console.log(payment_url, 'payment_url');
                            console.log(webViewState.url, 'WebView onNavigationStateChange')
                            if(webViewState.url.search('https://farm-meat.site/shop/orders/payment/view/') !== -1)
                            {
                                console.log('success')
                                setShowPaymentUrl(false)
                                setOrderSuccess(true)
                                setTimeout(() => {
                                    setOrderSuccess(false)
                                    props.navigation.navigate('HomeCatalogScreen')
                                }, 2000)
                                dispatch(getBasketInfo())

                            }


                        }}
                        javaScriptEnabled = {true}
                        // domStorageEnabled = {true}
                    />
                </View>
            </View>
            }

        </SafeAreaView>
    );
}

export default Basket;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        width: "100%",
        height:  '100%',

    },
    basket_header_wrapper: {
        width: '100%',
        marginBottom: 18,
        position: 'relative',
        borderBottomWidth: 2,
        borderBottomColor: '#EFF4D6',
        paddingTop: 12,
        paddingBottom: 11,
    },
    basket_header_back_btn: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    basket_header_title: {
        fontWeight: '400',
        color: '#4E7234',
        fontSize: 22,
        marginLeft: 8,
    },
    basket_main_wrapper: {
        flex: 1,
        width: '100%',
    },
    catalog_products_item_plus_minus_btns_wrapper: {
        backgroundColor: '#B9D149',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 30,
        width: 80,
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
        height: 30,
    },

    catalog_products_item_plus_btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
    },

    basket_item_img: {
        width: 127,
        height: 85,
        borderRadius: 5,
        overflow: 'hidden',
        marginRight: 5,
        flex: 1,
    },
    basket_item_img_child: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    basket_items_wrapper: {
        width: '100%',
        marginBottom: 6,
        paddingHorizontal: 15,
    },
    basket_item: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 11,
    },
    basket_item_info_box: {
        maxWidth: 201,
        width: '100%'
    },
    basket_item_title: {
        fontWeight: '400',
        color: '#4E7234',
        fontSize: 16,
        marginLeft: 4,
    },
    basket_item_quantity_info: {
        fontWeight: '300',
        color: '#4E7234',
        fontSize: 15,
        marginBottom: 4,
    },
    basket_item_price_info_plus_minus_btns_wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    basket_item_price_info_box: {
        borderRadius: 5,
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.2,
        shadowRadius: 19,
        elevation: 10,
        height: 30,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'

    },
    basket_item_price_info: {
        fontWeight: '500',
        color: '#4E7234',
        fontSize: 17,
    },
    add_to_order_wrapper: {
        width: '100%',
        marginBottom: 22,
        paddingHorizontal: 15,
    },

    add_to_order_items_wrapper: {
        width: '100%',
        // flex: 1
    },
    add_to_order_items_wrapper2: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    add_to_order_title: {
        fontWeight: '500',
        color: '#4E7234',
        fontSize: 17,
        marginBottom: 8,
    },
    add_to_order_item: {
        width: 168,
        marginRight: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    add_to_order_item_img: {
        width: 73,
        height: 51,
        marginRight: 8,
        borderRadius: 7,
        overflow: 'hidden',
        flex: 1,
    },
    add_to_order_item_img_child: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    add_to_order_item_info_box: {
        width: 90,
    },
    add_to_order_item_title: {
        fontWeight: '600',
        color: '#4E7234',
        fontSize: 11,
    },
    add_to_order_item_quantity_info: {
        fontWeight: '600',
        color: '#4E7234',
        fontSize: 11,
        marginBottom: 4
    },
    add_to_order_item_price_info: {
        fontWeight: '500',
        color: '#B9D149',
        fontSize: 16,
    },
    basket_main_info_details_items_wrapper: {
        width: '100%',
        marginBottom: 22,
        paddingHorizontal: 15,
    },

    basket_main_info_details_item: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    basket_main_info_details_item_title: {
        fontWeight: '400',
        color: '#4E7234',
        fontSize: 21,
    },
    basket_main_info_details_item_text: {
        fontWeight: '400',
        color: '#758364',
        fontSize: 21,
    },
    basket_main_info_details_item_title2: {
        fontWeight: '500',
        color: '#4E7234',
        fontSize: 21,
    },
    basket_main_info_details_item_text2: {
        fontWeight: '500',
        color: '#758364',
        fontSize: 21,
    },
    basket_main_info_details_item_title_second_info: {
        fontWeight: '400',
        color: '#B9D149',
        fontSize: 10,
    },
    basket_line: {
        width: '100%',
        height: 2,
        backgroundColor: '#EFF4D6',
        marginBottom: 16,
    },
    basket_collector_comment_input_wrapper: {
        width: '100%',
        marginBottom: 15,
        paddingHorizontal: 15,

    },
    basket_collector_comment_input_title: {
        fontWeight: '400',
        color: '#4E7234',
        fontSize: 18,
        marginBottom: 9,
    },
    basket_collector_comment_input_field: {
        width: '100%',
        borderRadius: 15,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
        shadowOffset: {width: 0, height: 4},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
        paddingVertical: 10,
        height: 55,
        color: '#4E7234',
        fontWeight: '400',
        fontSize: 14,
    },
    basket_payment_method_wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    basket_payment_method_title: {
        fontWeight: '700',
        color: '#4E7234',
        fontSize: 21,
        marginBottom: 3,
    },
    basket_payment_method_text: {
        fontWeight: '400',
        color: '#758364',
        fontSize: 17,
    },
    basket_payment_method_btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,

    },
    order_basket_btn_box: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    order_basket_btn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4E7234',
        borderRadius: 11,
        height: 60,
    },
    order_basket_btn_text: {
        color: '#ffffff',
        fontWeight: '500',
        fontSize: 21,
    },
    payment_methods_popup: {
        backgroundColor:  'rgba(157, 148, 148, 0.49)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 999,
        zIndex: 999999,
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    payment_methods_popup_wrapper: {
        width: '95%',
        backgroundColor: '#ffffff',
        borderRadius: 45,
        paddingTop: 40,
        paddingBottom: 22,
        position: 'relative',
    },
    payment_methods_popup_close_btn: {
        position: 'absolute',
        top: 12,
        right: 12,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    payment_methods_popup_title: {
        color: '#4E7234',
        fontWeight: '700',
        fontSize: 24,
        marginBottom: 22,
        paddingLeft: 26,
    },
    payment_methods_popup_items_wrapper: {
        width: '100%',
    },
    payment_methods_popup_item: {
        width: '100%',
        marginBottom: 11,

    },
    payment_methods_popup_item_btn: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    payment_methods_popup_item_btn_icon_title_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    payment_methods_popup_item_btn_title: {
        color: '#4E7234',
        fontWeight: '400',
        fontSize: 16,
    },
    payment_methods_popup_item_btn_icon: {
        width: 50,
        marginLeft: 10,
    },
    basket_delivery_pickup_info_items_wrapper: {
        width:'100%',
        marginBottom: 45,
        paddingHorizontal: 15,
    },
    basket_delivery_pickup_info_items_box: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 15,
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.2,
        shadowRadius: 19,
        elevation: 10,

    },
    basket_delivery_pickup_info_item_title: {
        color: '#4E7234',
        fontWeight: '500',
        fontSize: 21,
    },
    basket_delivery_pickup_info_item: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 28,
    },
    basket_delivery_pickup_info_item_text: {
        color: '#B9D149',
        fontWeight: '400',
        fontSize: 11,
    },
    basket_delivery_pickup_info_item_title_text_box: {
        width: 120,
    },
    switch_box: {
        width: 73,
        height: 22,
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.2,
        shadowRadius: 19,
        elevation: 10,
    },
    delivery_info_wrapper: {
        width: '100%',
        paddingTop: 45,
    },
    delivery_info_wrapper_title: {
        color: '#4E7234',
        fontWeight: '500',
        fontSize: 22,
        marginBottom: 18,
    },
    delivery_address_info_edit_btn_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
    },
    delivery_address_info: {
        color: '#4E7234',
        fontWeight: '500',
        fontSize: 21,
        width: 230,
        marginRight: 57,
    },

    pickup_info_wrapper_info: {
        color: '#4E7234',
        fontWeight: '500',
        fontSize: 18,
        marginBottom: 20,

    },
    delivery_address_popup: {
        backgroundColor:  'rgba(157, 148, 148, 0.49)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 999,
        zIndex: 999999,
        width: '100%',
        height: windowHeight + 40,
        position: 'absolute',
        left: 0,
        bottom: 0,
        top: 0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',

    },
    delivery_address_popup_wrapper: {
       width: '100%',
       height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#ffffff',
        paddingTop: 40,

    },
    delivery_address_popup_box: {
        width: '94%',
        backgroundColor: '#ffffff',
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.2,
        shadowRadius: 19,
        elevation: 10,
        borderRadius: 15,
        paddingTop: 30,
        paddingBottom: 47,
        paddingHorizontal: 10,
        marginBottom: 45,
        position: 'relative',
        marginTop: 20,
    },
    delivery_address_popup_save_btn: {
        width: 182,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4E7234',
        borderRadius: 7,
        height: 36,

    },
    delivery_address_popup_save_btn_text: {
        color: '#ffffff',
        fontWeight: '400',
        fontSize: 18,
    },
    delivery_address_popup_close_btn: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingTop: 30,
        paddingBottom: 30,
        paddingRight: 20,
        paddingLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    delivery_address_popup_title: {
        color: '#4E7234',
        fontWeight: '500',
        fontSize: 22,
        marginBottom: 18,
    },
    delivery_address_popup_input_wrapper: {
        width: '100%',
        marginBottom: 15
    },
    delivery_address_popup_input_field: {
        width: '100%',
        backgroundColor: '#ffffff',
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.2,
        shadowRadius: 19,
        elevation: 10,
        borderRadius: 5,
        color: '#8C8C8C',
        fontWeight: '400',
        fontSize: 14,
        paddingVertical: 14,
        paddingHorizontal: 12,
    },
    delivery_address_popup_details_inputs_wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    delivery_address_popup_details_input_field: {
        backgroundColor: '#ffffff',
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.2,
        shadowRadius: 19,
        elevation: 10,
        borderRadius: 5,
        color: '#8C8C8C',
        fontWeight: '400',
        fontSize: 14,
        // paddingVertical: 14,
        // paddingHorizontal: 12,
        width: 75,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    order_success_popup: {
        backgroundColor:  'rgba(157, 148, 148, 0.49)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 999,
        zIndex: 999999,
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0,
        alignSelf: 'center',
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 70,
    },
    payment_popup: {
        backgroundColor:  'rgba(157, 148, 148, 0.49)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 999,
        zIndex: 999999,
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0,
        alignSelf: 'center',
        alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: 70,
    },
    payment_popup_wrapper: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        position: 'relative'

    },
    order_success_popup_wrapper: {
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.2,
        shadowRadius: 19,
        elevation: 10,
        width: '80%',
        height: 120,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    order_success_popup_title: {
        color: '#4E7234',
        fontWeight: '500',
        fontSize: 25,
    },
    address_wrapper: {
        backgroundColor:  'rgba(157, 148, 148, 0.49)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 999,
        zIndex: 999999,
        width: '100%',
        height: windowHeight,
        position: 'absolute',
        left: 0,
        bottom: 0,
        top: 0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    address_item: {
        width: '100%',
        marginBottom: 10,
    },
    address_item_text: {
        color: '#4E7234',
        fontWeight: '400',
        fontSize: 20,
    },
    address_wrapper_child: {
        width: '90%',
        height:  300,
        backgroundColor: '#ffffff',
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.2,
        shadowRadius: 19,
        elevation: 10,
        borderRadius: 15,
        paddingTop: 50,
        paddingBottom: 47,
        paddingHorizontal: 20,
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 9999999999999,
        top: 174,

    },
    address_wrapper_child_scrollbox: {
        flex: 1,
        width: '100%',
    },
    address_wrapper_not_found: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingTop: 70
    },

    address_wrapper_not_found_text: {
        color: '#4E7234',
        fontWeight: '400',
        fontSize: 25,
        textAlign: 'center'
    },
    profile_edit_address_info: {
        fontWeight: 500,
        color: '#4E7234',
        fontSize: 21,
        width: '90%',
    },
    profile_add_address_btn: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: 20,
    },
    profile_add_address_btn_text: {
        fontWeight: 500,
        color: '#4E7234',
        fontSize: 22,
    },
});

