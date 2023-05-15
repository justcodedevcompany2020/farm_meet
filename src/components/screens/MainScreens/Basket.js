import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar, useColorScheme} from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {getBasketInfo} from '../../../store/actions/farmMeatActions';
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
import StarIcon from '../../../assets/svg/star_icon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ProductSinglePage (props) {
    const dispatch = useDispatch();
    const {basket_info} = useSelector(state => state.farmMeatReducer);

    const [collector_comment, setCollectorComment] = useState('');
    const [delivery_address, setDeliveryAddress] = useState('');
    const [delivery_address_office, setDeliveryAddressOffice] = useState('');
    const [delivery_address_entrance, setDeliveryAddressEntrance] = useState('');
    const [delivery_address_floor, setDeliveryAddressFloor] = useState('');
    const [delivery_address_intercom, setDeliveryAddressIntercom] = useState('');

    const [promo_code, setPromoCode] = useState('');
    const [comment_courier, setCommentCourier] = useState('');
    const [show_payment_methods_popup, setShowPaymentMethodsPopup] = useState(false);
    const [show_choose_payment_method_icon, setShowChoosePaymentMethodIcon] = useState('');

    const [show_delivery_info, setShowDeliveryInfo] = useState(false);
    const [show_pickup_info, setShowPickupInfo] = useState(false);
    const [delivery_address_popup, setDeliveryAddressPopup] = useState(false);

    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(isEnabled => !isEnabled)
        setShowDeliveryInfo(show_delivery_info => !show_delivery_info)
    };
    const toggleSwitch2 = () => {
        setIsEnabled2(isEnabled2 => !isEnabled2)
        setShowPickupInfo(show_pickup_info => !show_pickup_info)
    };

    useEffect(() => {
        dispatch(getBasketInfo())
    }, [dispatch]);

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
                        console.log(item?.product?.images[0]?.image, 'bsko');
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
                                                <TouchableOpacity style={styles.catalog_products_item_minus_btn}>
                                                    <MinusIcon/>
                                                </TouchableOpacity>
                                                <Text style={styles.catalog_products_item_quantity_info}>{item?.amount}</Text>
                                                <TouchableOpacity style={styles.catalog_products_item_plus_btn}>
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
                    {add_to_basket.length > 2 ?
                        <ScrollView horizontal={true} nestedScrollEnabled={true} style={styles.add_to_order_items_wrapper}>
                            {add_to_basket.map((item, index) => {
                                return(
                                    <View key={index} style={styles.add_to_order_item}>
                                        <TouchableOpacity style={styles.add_to_order_item_img}>
                                            <Image  style={styles.add_to_order_item_img_child}  source={item.img} />
                                        </TouchableOpacity>
                                        <View style={styles.add_to_order_item_info_box}>
                                            <Text style={styles.add_to_order_item_title}>{item.title}</Text>
                                            <Text style={styles.add_to_order_item_quantity_info}>{item.quantity}</Text>
                                            <Text style={styles.add_to_order_item_price_info}>{item.price}Р\шт</Text>

                                        </View>
                                    </View>
                                )

                            })}

                        </ScrollView>
                        :
                        <View style={styles.add_to_order_items_wrapper2}>
                            {add_to_basket.map((item, index) => {
                                return(
                                    <View key={index} style={styles.add_to_order_item}>
                                        <TouchableOpacity style={styles.add_to_order_item_img}>
                                            <Image  style={styles.add_to_order_item_img_child}  source={item.img} />
                                        </TouchableOpacity>
                                        <View style={styles.add_to_order_item_info_box}>
                                            <Text style={styles.add_to_order_item_title}>{item.title}</Text>
                                            <Text style={styles.add_to_order_item_quantity_info}>{item.quantity}</Text>
                                            <Text style={styles.add_to_order_item_price_info}>{item.price}Р\шт</Text>

                                        </View>
                                    </View>
                                )

                            })}

                        </View>
                    }

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

                    {show_delivery_info &&
                    <View style={styles.delivery_info_wrapper}>
                        <Text style={styles.delivery_info_wrapper_title}>Адрес доставки</Text>
                        <View style={styles.delivery_address_info_edit_btn_wrapper}>
                            <Text style={styles.delivery_address_info}>ул. Енисейская 17к2, кв. 10, подъезд 1.</Text>
                            <TouchableOpacity style={styles.delivery_address_info_edit_btn}
                                onPress={() => {
                                    setDeliveryAddressPopup(true)
                                }}
                            >
                                    <EditIcon/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    }
                    {show_pickup_info &&
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
                    </View>
                    <View style={styles.basket_payment_method_btn}>
                        <PaymentIcon/>
                    </View>

                </TouchableOpacity>

            </ScrollView>
            <View style={styles.order_basket_btn_box}>
                <TouchableOpacity style={styles.order_basket_btn}>
                    <Text style={styles.order_basket_btn_text}>Заказать</Text>
                </TouchableOpacity>
            </View>
            <Footer active_page={'basket'} navigation={props.navigation}/>

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
                                          setShowChoosePaymentMethodIcon('card')
                                      }}
                                >
                                    <View style={styles.payment_methods_popup_item_btn_icon_title_wrapper}>
                                        <View style={styles.payment_methods_popup_item_btn_icon}>
                                            <CardIcon/>
                                        </View>

                                        <Text style={styles.payment_methods_popup_item_btn_title}>Переводом СБП</Text>
                                    </View>
                                    {show_choose_payment_method_icon == 'card' &&
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
                                                      setShowChoosePaymentMethodIcon('cash')
                                                  }}
                                >
                                    <View style={styles.payment_methods_popup_item_btn_icon_title_wrapper}>
                                        <View style={styles.payment_methods_popup_item_btn_icon}>
                                            <CashIcon/>
                                        </View>

                                        <Text style={styles.payment_methods_popup_item_btn_title}>Наличными при получении</Text>
                                    </View>
                                    {show_choose_payment_method_icon == 'cash' &&
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
                        <View style={styles.delivery_address_popup_box}>
                            <TouchableOpacity style={styles.delivery_address_popup_close_btn}
                                              onPress={() => {
                                                  setDeliveryAddressPopup(false)
                                              }}
                            >
                                <PaymentCloseIcon/>
                            </TouchableOpacity>
                            <Text style={styles.delivery_address_popup_title}>Адрес доставки</Text>
                            <View style={styles.delivery_address_popup_input_wrapper}>
                                <TextInput
                                    style={[styles.delivery_address_popup_input_field]}
                                    onChangeText={(val) => setDeliveryAddress(val)}
                                    value={delivery_address}
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
                        <TouchableOpacity style={styles.delivery_address_popup_save_btn}>
                            <Text style={styles.delivery_address_popup_save_btn_text}>Сохранить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }


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
    basket_header_wrapper: {
        width: '100%',
        marginBottom: 18,
        position: 'relative',
        borderWidth: 2,
        borderColor: '#EFF4D6',
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
        height: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0,
        top: 100,
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
        top: 20,
        right: 20,
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
    }
});
