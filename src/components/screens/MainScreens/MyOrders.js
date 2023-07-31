import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar, TouchableHighlight, useColorScheme} from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {
    addToBasket,
    getBasketInfo,
    getMyOrdersData,
    getProfileData,
    login,
} from '../../../store/actions/farmMeatActions';
import Footer from '../../includes/Footer'
import AddAddressIcon from '../../../assets/svg/add_address_icon'
import CloseIcon from '../../../assets/svg/Close'
import RepeatOrderIcon from '../../../assets/svg/repeat_order_icon'


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
    Keyboard,
    Linking
} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import BackIcon from '../../../assets/svg/back_icon';
import BasketBlock from '../../includes/BasketBlock';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Profile (props) {
    const dispatch = useDispatch();
    const {my_orders_info} = useSelector(state => state.farmMeatReducer);


    useEffect(() => {
        setShowLoader(true)
    }, []);

    useEffect(() => {
        dispatch(getMyOrdersData())
    }, [dispatch]);


    useEffect(() => {
        setMyOrdersInfoLocal(my_orders_info);
        setTimeout(() => {
            setShowLoader(false)
        }, 1700)
    }, [my_orders_info]);


    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [order_details, setOrderDetails] = useState([]);
    const [about_order_popup, setAboutOrderPopup] = useState(false);
    const [my_orders_info_local, setMyOrdersInfoLocal] = useState([]);
    const [order_success, setOrderSuccess] = useState(false);
    const [show_loader, setShowLoader] = useState(true);
    const [about_order_info, setAboutOrderInfo] = useState([]);
    const [more_product_info, setMoreProductInfo] = useState([]);
    const {basket_info} = useSelector(state => state.farmMeatReducer);


    useEffect(() => {
        // AsyncStorage.clear()
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

    const context = useContext(AuthContext);

    const redirectToProfileScreen = () => {
        props.navigation.navigate('ProfileScreen')
    }

    useEffect(() => {
        dispatch(getBasketInfo())
    }, [dispatch]);


    const getTime =  (date) => {
        let timestamp = date;
        timestamp = timestamp.substring(0, 10);
        date = new Date(timestamp);

        let options = { day: 'numeric', month: 'long', };
        let formattedDate = date.toLocaleDateString('ru-RU', options);

        // console.log(formattedDate);
        return formattedDate;
    }
    const getTime2 =  (date) => {
        let timestamp = date;
        timestamp = timestamp.substring(0, 10);
        date = new Date(timestamp);

        let options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', };
        let formattedDate = date.toLocaleDateString('ru-RU', options);

        console.log(formattedDate);
        return formattedDate;
    }

    const getMoreAboutOrder  = async (id) => {
        // console.log(id, 'order id');
        let userInfo = await AsyncStorage.getItem('user');
        userInfo = JSON.parse(userInfo)
        let token =  userInfo.token;
        let session =  userInfo.session;
        // console.log(token, 'token');
        // console.log(session, 'session');

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

            let response = await fetch(`https://farm-meat.site/shop/orders/${id}/`, requestOptions);
            let data = await response.json();

            let my_orders_info_local_ = my_orders_info_local;

            if (response.status == 200) {
                setAboutOrderInfo(data)

                // for (let i = 0; i < my_orders_info_local_.length ; i++) {
                //
                //     console.log(my_orders_info_local_[i].id == id, 'my_orders_info_local[i].id == id');
                //     if (my_orders_info_local_[i].id == id ) {
                //         my_orders_info_local_[i].more_product = data;
                //         break
                //     }
                //
                // }
                //
                // setMyOrdersInfoLocal(my_orders_info_local_);
                // console.log(my_orders_info_local_[0].more_product, 'moreeeeeeeeeee');

                setMyOrdersInfoLocal(prevOrders => {
                    return prevOrders.map(order => {
                        if (order.id === id) {
                            // return {order, more_product: data };
                            order.more_product = data
                            setMoreProductInfo(order.more_product)
                            return order;
                        } else {
                            return order;
                        }
                    });
                });

            }



        } catch (error) {
            // reject(error);
        }

    }

    const checkId = (id) => {

        let id_object = null;


        let find = false;
        let order_details_info = order_details;

        for (let i = 0; i < order_details_info.length ; i++) {

            if (order_details_info[i].id == id ) {
                find = true;
                id_object = order_details_info[i];
            }

        }

        if (!id_object) {
            return null
        } else  {
            alert('111')
            return id_object
        }

    }
   const checkStatus = (status) => {
       let status_text = '';

       switch(status) {
           case 0:
               status_text = 'Новый';
               break;
           case 1:
               status_text = 'Принят';
               break;
           case 2:
               status_text = 'Собран';
               break;
           case 3:
               status_text =  'Собран с изменениями';
               break;
           case 4:
               status_text =  'Доставляется';
               break;
           case 5:
               status_text =  'Отменен';
               break;
           case 6:
               status_text =  'Выполнен';
               break;
           default:
       }

       return status_text;
    }
   const checkStatusPay = (status_pay) => {

       let status_text = '';

       switch(status_pay) {
           case 0:
               status_text = 'Ожидается оплата';
               break;
           case 1:
               status_text = 'Оплачено';
               break;
           case 2:
               status_text = 'Частично оплачено';
               break;
           default:
       }


       return status_text;
    }

    const repeatOrder = async () => {
        let products = more_product_info.products;

        for (let i = 0; i < products.length; i++) {
             let product_id = products[i].product.id;
             let product_amount = products[i].amount;

            let objectsWithProductId = basket_info[0].products.filter(obj => obj.product.id === product_id);
            let hasObjectsWithProductId = objectsWithProductId.length > 0;



            let product_amount_in_basket = 0
            if (hasObjectsWithProductId) {
                 product_amount_in_basket = objectsWithProductId[0].amount;
            }

            let total_amount = Number(product_amount_in_basket) + Number(product_amount)
            console.log(total_amount, 'tota;');


           await dispatch(addToBasket(product_id, total_amount))
        }

        setAboutOrderPopup(false)
        setOrderSuccess(true)
    }


    const makePhoneCall = () => {
        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${+79162912782}';
        } else {
            phoneNumber = 'telprompt:${+79162912782}';
        }

        Linking.openURL(phoneNumber);
    };

    if (show_loader) {
        return (
            <View style={{backgroundColor: '#ffffff', position: 'absolute', top: 0, left: 0,  justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '100%',  height: '100%', }}>

                <ActivityIndicator size="large" color="#4E7234" />

            </View>
        )
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#EFF4D6" translucent = {true}/>

            <View style={styles.profile_header_wrapper}>
                <TouchableOpacity style={styles.profile_header_back_btn}
                                  onPress={() => {
                                      props.navigation.goBack()
                                  }}
                >
                    <BackIcon/>
                    <Text style={styles.profile_header_title}>Профиль</Text>
                </TouchableOpacity>

            </View>
            <ScrollView style={styles.profile_wrapper}>
                <View style={styles.profile_wrapper_tab_buttons}>
                    <TouchableOpacity style={styles.profile_wrapper_tab_my_orders_btn}>
                        <Text style={styles.profile_wrapper_tab_my_orders_btn_text}>Мои заказы</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profile_wrapper_tab_my_details_btn} onPress={() => {redirectToProfileScreen()}}>
                        <Text style={styles.profile_wrapper_tab_my_details_btn_text}>Мои данные</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.profile_edit_address_info_box}>
                    <Text style={styles.profile_main_title}>Все заказы</Text>
                    <ScrollView style={{width: '100%', flex: 1}} >
                        <View style={styles.my_order_items_wrapper}>
                            {my_orders_info_local.map((item, index) => {
                                return(
                                    <View key={index} style={styles.my_order_item}>
                                        <View style={styles.my_order_item_title_price_info_wrapper}>
                                            <Text style={styles.my_order_item_title}>Доставка</Text>
                                            <Text style={styles.my_order_item_price_info}>{item.total}Р</Text>
                                        </View>
                                        <View style={styles.my_order_items_address_date_info_wrapper_parent}>
                                            <View style={styles.my_order_items_address_date_info_wrapper}>
                                                <Text style={styles.my_order_item_address_info}>{item.address}</Text>
                                                <Text style={styles.my_order_item_date_info}>{getTime(item.date_created)}</Text>

                                            </View>

                                        </View>
                                        <View style={styles.my_order_item_number_status_info_wrapper}>
                                            <Text style={styles.my_order_item_number}>Заказ №{item.id}</Text>
                                            <Text style={styles.my_order_item_status_info}>{checkStatus(item.status)}</Text>

                                        </View>
                                        <View style={styles.my_order_item_price_status_pay_info_wrapper}>
                                            <Text style={styles.my_order_item_second_price_info}>{item.total}Р</Text>
                                            <Text style={styles.my_order_item_status_pay_info}>{checkStatusPay(item.status_pay)}</Text>

                                        </View>
                                        {!item.more_product &&
                                            <TouchableOpacity style={styles.my_order_item_more_info_btn} onPress={() => {getMoreAboutOrder(item.id)}}>
                                                <Text style={styles.my_order_item_more_info_btn_text}>Подробнее</Text>
                                            </TouchableOpacity>
                                        }


                                        {item.hasOwnProperty('more_product') &&
                                              <View style={styles.more_products_wrapper}>
                                                  <View style={styles.more_products_items_wrapper}>
                                                      {item.more_product.products.map((item, index) => {
                                                              return(
                                                              <View key={index} style={styles.more_product_item}>
                                                                      <View style={styles.more_product_item_img}>
                                                                          {item.product.images[0]?.image ?
                                                                              <Image source={{uri: item.product.images[0]?.image }}
                                                                                     style={styles.more_product_item_img_child}/>
                                                                                     :
                                                                              <Image source={require('../../../assets/images/catalog_product_img.png')}
                                                                                     style={styles.more_product_item_img_child}/>
                                                                          }

                                                                      </View>
                                                                      <View style={styles.more_product_item_info}>
                                                                          <Text style={styles.more_product_item_info_name}>{item.product.title}</Text>
                                                                          <View style={styles.more_product_item_info_price_amount_info_wrapper}>
                                                                              <Text style={styles.more_product_item_info_price_info}>{item.product.price}Р\шт</Text>
                                                                              <Text style={styles.more_product_item_info_amount_info}>{item.amount} шт</Text>
                                                                          </View>
                                                                      </View>
                                                              </View>
                                                          )

                                                      })}
                                                  </View>
                                                  <View style={styles.more_product_item_order_details_call_btns_wrapper}>
                                                      <TouchableOpacity style={styles.more_product_item_order_details_btn} onPress={() => {
                                                          setAboutOrderPopup(true)
                                                      }}>
                                                          <Text style={styles.more_product_item_order_details_btn_text}>Детали заказа</Text>
                                                      </TouchableOpacity>
                                                      <TouchableOpacity
                                                          style={styles.more_product_item_call_btn}
                                                          onPress={() => {
                                                              makePhoneCall()
                                                          }}
                                                      >
                                                          <Text style={styles.more_product_item_call_btn_text}>Связаться с нами</Text>
                                                      </TouchableOpacity>
                                                  </View>

                                              </View>
                                        }



                                    </View>
                                )
                            })}

                        </View>
                    </ScrollView>



                </View>
            </ScrollView>
            <BasketBlock  navigation={props.navigation}/>
            {isKeyboardVisible === false &&
              <Footer active_page={'profile'} navigation={props.navigation}/>
            }

            {about_order_popup &&
                <View style={styles.about_order_popup}>
                <View style={styles.about_order_popup_wrapper}>
                    <View style={styles.about_order_popup_header}>
                        <Text style={styles.about_order_popup_title}>О заказе</Text>
                        <TouchableOpacity onPress={() => {setAboutOrderPopup(false)}}>
                            <CloseIcon/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.about_order_popup_order_number_date_info_box}>
                        <Text style={styles.about_order_order_number}>Заказ №{about_order_info.id}</Text>
                        <Text style={styles.about_order_popup_date_info}>{getTime2(about_order_info.date_created)}</Text>
                    </View>
                    <ScrollView style={{flex: 1, width: '100%'}}>
                        <View style={styles.about_order_popup_line}></View>
                        <View style={styles.about_order_popup_address_info_title_wrapper}>
                            <Text style={styles.about_order_popup_address_info_title}>Доставка</Text>
                            <Text style={styles.about_order_popup_address_info1}>
                                Заказ {checkStatus(about_order_info.status)}
                            </Text>
                            <Text style={styles.about_order_popup_address_info}>
                                {about_order_info.address}
                            </Text>

                        </View>
                        <View style={styles.about_order_popup_line}></View>
                        <View style={styles.about_order_popup_repeat_order_btn_title_wrapper}>
                            <Text style={styles.about_order_popup_repeat_order_btn_title}>Заказ доставлен</Text>
                            <TouchableOpacity
                                style={styles.about_order_popup_repeat_order_btn}
                                onPress={() => {
                                    repeatOrder()
                                }}
                            >
                                <View style={styles.about_order_popup_repeat_order_btn_icon}>
                                    <RepeatOrderIcon/>
                                </View>
                                <Text style={styles.about_order_popup_repeat_order_btn_text}>
                                    Повторить заказ
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.about_order_popup_amount_info}>{more_product_info.products.length} товаров  на сумму:</Text>
                        <Text style={styles.about_order_popup_total_info}>{about_order_info.total}Р</Text>

                        <View style={[styles.more_products_items_wrapper, {paddingHorizontal: 16}]}>
                            {more_product_info.products.map((item, index) => {
                                return(
                                    <View key={index} style={styles.more_product_item}>
                                        <View style={styles.more_product_item_img}>
                                            {item.product.images[0]?.image ?
                                                <Image source={{uri: item.product.images[0]?.image }}
                                                       style={styles.more_product_item_img_child}/>
                                                :
                                                <Image source={require('../../../assets/images/catalog_product_img.png')}
                                                       style={styles.more_product_item_img_child}/>
                                            }

                                        </View>
                                        <View style={styles.more_product_item_info}>
                                            <Text style={styles.more_product_item_info_name}>{item.product.title}</Text>
                                            <View style={styles.more_product_item_info_price_amount_info_wrapper}>
                                                <Text style={styles.more_product_item_info_price_info}>{item.product.price}Р\шт</Text>
                                                <Text style={styles.more_product_item_info_amount_info}>{item.amount} шт</Text>
                                            </View>
                                        </View>
                                    </View>
                                )

                            })}
                        </View>
                    </ScrollView>



                </View>
            </View>
            }

            {order_success &&
            <View style={styles.order_success_popup}>
                <View style={styles.order_success_popup_wrapper}>
                    <TouchableOpacity style={{position: 'absolute', right: 20, top: 20}} onPress={() => {setOrderSuccess(false)}}>
                        <CloseIcon/>
                    </TouchableOpacity>
                    <Text style={styles.order_success_popup_title}>Добавлено в корзину!</Text>
                </View>
            </View>
            }



        </SafeAreaView>
    );
}

export default Profile;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        width: "100%",
        height:  '100%',

    },
    profile_header_wrapper: {
        width: '100%',
        marginBottom: 11,
        position: 'relative',
        borderBottomWidth: 2,
        borderBottomColor: '#EFF4D6',
        paddingTop: 12,
        paddingBottom: 11,
    },
    profile_header_back_btn: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profile_header_title: {
        fontWeight: '400',
        color: '#758364',
        fontSize: 22,
        marginLeft: 8,
    },
    profile_wrapper: {
        flex: 1,
        width: '100%',
    },

    profile_wrapper_tab_buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingHorizontal: 12,
    },
    profile_wrapper_tab_my_details_btn: {
        backgroundColor: '#D8D8D8',
        width: '48%',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    profile_wrapper_tab_my_details_btn_text: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 400,

    },

     profile_wrapper_tab_my_orders_btn: {
        backgroundColor: '#4E7234',
        width: '48%',
        borderRadius: 4,
        // height: 37,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile_wrapper_tab_my_orders_btn_text: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 400,

    },
    profile_info_box: {
        width: '100%',
    },
    profile_info_box_personal_info: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 27,
    },
    profile_info_box_title_info_wrapper: {
        marginBottom: 6,
    },
    profile_info_box_title: {
        color: '#4E7234',
        fontWeight: 400,
        fontSize: 22,
        marginBottom: 6
    },
    profile_info_box_text: {
        color: '#B9D149',
        fontWeight: 400,
        fontSize: 20,
        marginBottom: 6
    },
    profile_address_info_box: {
        width: '100%',
        borderBottomColor: '#EFF4D6',
        borderBottomWidth: 2,
        marginBottom: 14,
        paddingBottom: 25,
    },
    profile_address_info_title: {
        paddingHorizontal: 20,
        fontWeight: 500,
        color: '#4E7234',
        fontSize: 22,
        marginBottom: 25,
    },
    profile_add_address_btn: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    profile_add_address_btn_text: {
        fontWeight: 500,
        color: '#4E7234',
        fontSize: 22,
    },
    profile_edit_address_info_box: {
        width: '100%',
    },
    profile_edit_address_icon_parent: {
        width: '100%',
        borderBottomColor: '#EFF4D6',
        borderBottomWidth: 2,
        marginBottom: 10,
        paddingBottom: 18,
    },
    profile_edit_address_icon_wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
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
        height:  windowHeight + 40,
        position: 'absolute',
        left: 0,
        bottom: 0,
        top: 0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 20


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
        marginTop: 20
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
        width: '100%',
    },

    edit_name_popup: {
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
    edit_name_popup_wrapper: {
        width: '90%',
        backgroundColor: '#ffffff',
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.2,
        shadowRadius: 19,
        elevation: 10,
        borderRadius: 15,
        paddingTop: 70,
        paddingBottom: 47,
        paddingHorizontal: 20,
    },
    edit_name_input_field: {
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
    edit_name_popup_input_field_wrapper: {
        width: '100%',
        marginBottom: 30
    },
    edit_name_popup_save_btn: {
        width: 182,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#4E7234',
        borderRadius: 7,
        height: 36,

    },
    edit_name_popup_save_btn_text: {
        color: '#ffffff',
        fontWeight: '400',
        fontSize: 18,
    },
    edit_name_popup_close_btn: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    profile_main_title: {
        color: '#4E7234',
        fontWeight: '400',
        fontSize: 21,
        marginBottom: 10,
        paddingHorizontal: 12,
    },
    my_order_items_wrapper: {
        width: '100%',
        paddingHorizontal: 30,
    },
    my_order_item: {
        marginBottom: 14,
        width: '100%',
        maxWidth: 312,
        backgroundColor: '#EFF4D6',
        borderRadius: 18,
        paddingVertical: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: '19%',
        shadowRadius: 21,

        elevation: 10,
    },
    my_order_item_title_price_info_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 9,
    },

    my_order_item_title: {
        color: '#4E7234',
        fontWeight: '500',
        fontSize: 16,
    },
    my_order_item_price_info: {
        color: '#4E7234',
        fontWeight: '500',
        fontSize: 17,
    },

    my_order_item_address_info: {
        color: '#B9D149',
        fontSize: 14,
        fontWeight: '400',
        width: '75%'
    },
    my_order_items_address_date_info_wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 15,
        paddingRight: 9,
    },
    my_order_item_price_status_pay_info_wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 15,
        paddingRight: 9,
        marginBottom: 13,
    },
    my_order_items_address_date_info_wrapper_parent: {
        width: '100%',
        marginBottom: 10,
        paddingBottom: 13,
        borderBottomWidth: 1,
        borderBottomColor: '#B9D149',
    },

    my_order_item_date_info: {
        color: '#B9D149',
        fontSize: 14,
        fontWeight: '400',
    },

    my_order_item_number: {
        color: '#4E7234',
        fontSize: 16,
        fontWeight: '500',
    },
    my_order_item_status_info: {
        color: '#4E7234',
        fontSize: 18,
        fontWeight: '500',
    },
    my_order_item_number_status_info_wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 15,
        paddingRight: 9,
        marginBottom: 10,
    },
    my_order_item_second_price_info: {
        color: '#B9D149',
        fontSize: 16,
        fontWeight: '500',
    },
    my_order_item_status_pay_info: {
        color: '#B9D149',
        fontSize: 18,
        fontWeight: '500',
    },
    my_order_item_more_info_btn: {
        backgroundColor: '#B9D149',
        borderRadius: 6,
        height: 32,
        width: 142,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
    my_order_item_more_info_btn_text: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '400',
    },
    more_products_wrapper: {
        width: '100%',
        paddingTop: 18,
        borderTopWidth: 1,
        borderTopColor: '#B9D149',
        paddingHorizontal: 10
    },
    more_product_item_img: {
        width: 70,
        height: 69,
        marginRight: 10,
    },
    more_product_item_img_child: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    more_product_item: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    more_products_items_wrapper: {
        width: '100%',
        marginBottom: 14,
    },
    more_product_item_info: {
        flex: 1,
        paddingTop: 12
    },
    more_product_item_info_name: {
        fontWeight: '500',
        color: '#4E7234',
        fontSize: 15,
        // marginBottom: 4,
    },
    more_product_item_info_price_amount_info_wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    more_product_item_info_price_info: {
        color: '#B9D149',
        fontWeight: '500',
        fontSize: 16,
    },
    more_product_item_info_amount_info: {
        color: '#B9D149',
        fontWeight: '400',
        fontSize: 20,
    },
    more_product_item_order_details_call_btns_wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    more_product_item_order_details_btn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B9D149',
        width: '49%',
        borderRadius: 6,
        height: 37,

    },

    more_product_item_order_details_btn_text: {
        color: '#ffffff',
        fontWeight: '400',
        fontSize: 15,

    },
    more_product_item_call_btn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B9D149',
        width: '49%',
        borderRadius: 6,
        height: 37,
    },
    more_product_item_call_btn_text: {
        color: '#ffffff',
        fontWeight: '400',
        fontSize: 15,
    },
    about_order_popup: {
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
        // bottom: 0,
        top: 0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    about_order_popup_wrapper: {
        width: '92%',
        borderRadius: 26,
        backgroundColor: '#ffffff',
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 34,
        elevation: 999,
        zIndex: 999999,
        paddingTop: 12,
        paddingBottom: 27,
        maxHeight: 511,
        height: '100%'
    },
    about_order_popup_header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
        paddingHorizontal: 16,

    },
    about_order_popup_title: {
        color: '#4E7234',
        fontWeight: '500',
        fontSize: 21,
    },
    about_order_order_number: {
        color: '#B9D149',
        fontWeight: '500',
        fontSize: 16,
    },
    about_order_popup_order_number_date_info_box: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 9,
    },
    about_order_popup_date_info: {
        color: '#B9D149',
        fontWeight: '500',
        fontSize: 11,
    },
    about_order_popup_line: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#B9D149',
        marginBottom: 10,
    },
    about_order_popup_address_info_title_wrapper: {
        width: '100%',
        paddingHorizontal: 16,
        marginBottom: 15,
    },
    about_order_popup_address_info_title: {
        color: '#4E7234',
        fontWeight: '500',
        fontSize: 21,
        marginBottom: 8
    },
    about_order_popup_address_info: {
        color: '#B9D149',
        fontWeight: '500',
        fontSize: 14,
    },
    about_order_popup_address_info1: {
        color: '#4E7234',
        fontWeight: '500',
        fontSize: 14,
    },

    about_order_popup_repeat_order_btn_title_wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7,
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    about_order_popup_repeat_order_btn_title: {
        color: '#4E7234',
        fontWeight: '500',
        fontSize: 21,
        width: '50%'
    },

    about_order_popup_repeat_order_btn: {
        backgroundColor: '#B9D149',
        borderRadius: 9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 37,
        width: '100%',
        maxWidth: 153,
    },
    about_order_popup_repeat_order_btn_text: {
        color: '#ffffff',
        fontWeight: '400',
        fontSize: 14,
        marginLeft: 6
    },

    about_order_popup_amount_info: {
        color: '#4E7234',
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 2,
        paddingHorizontal: 16,
    },
    about_order_popup_total_info: {
        color: '#B9D149',
        fontWeight: '400',
        fontSize: 16,
        marginBottom: 9,
        paddingHorizontal: 16,
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
        position: 'relative',
    },
    order_success_popup_title: {
        color: '#4E7234',
        fontWeight: '500',
        fontSize: 25,
    },

});
