import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, useColorScheme} from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import  NotificationLogo from '../../../assets/svg/notifications';
import  SearchIcon from '../../../assets/svg/search_icon';
import  DeliveryIcon from '../../../assets/svg/delivery_icon';
import  PhoneIcon from '../../../assets/svg/phone_icon';
import  QuestionIcon from '../../../assets/svg/question_icon';
import  CloseIcon from '../../../assets/svg/close_icon';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {getCatalogData, setCatalogId, setSearchProduct} from '../../../store/actions/farmMeatActions';
import Footer from '../../includes/Footer'
import Orientation from 'react-native-orientation-locker';


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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function HomeCatalog (props) {
    const dispatch = useDispatch();
    const {catalog_data} = useSelector(state => state.farmMeatReducer);

    useEffect(() => {
        // Lock the orientation to portrait mode
        Orientation.lockToPortrait();
        return () => {
            Orientation.unlockAllOrientations();
        };
    }, []);

    useEffect(() => {
        dispatch(getCatalogData())
    }, [dispatch]);



    const interesting_questions = [
        {
         id: 1,
         question: 'Какие гарантии качества вы предоставляете?',
         answer1: 'Вы можете быть уверены в качестве нашего мяса. Вся наша мясная продукция проходит ветеринарный контроль. Документом является ветсвидетельство, которое выдается в электронном виде в системе Меркурий на каждую партию мяса, мы предоставим вам его по запросу.',
         answer2: 'Также есть декларации соответствия на мясо и готовую продукцию. Декларация подтверждает соответствие продукции требованиям безопасности, что говорит об отсутствии опасности для жизни и здоровья человека.',
         answer3: 'Наша цель  полезный и вкусный продукт для наших клиентов. Поэтому, чтобы вы были уверены в качестве продукта мы зарегистрировали собственный знак качества - Амбарцево.',
         answer4: 'Мы несем ответственность за каждый заказ, готовы вернуть деньги или обменять товар, если вас что-то не устроило.Проверяйте наличие знака качества «Амбарцево» на вашем заказе.',
        },

        {
            id: 2,
            question: 'Доставка? ',
            answer1: 'Доставка осуществляется бесплатно при заказе на сумму  от 3 000 руб., при заказе заказе до 3000р стоимость доставки составит 200 руб.',
            answer2: 'Вся продукция изготавливается под заказ, а мясные наборы доставляются без заморозки в течении суток после разруба и упаковки, мясо не замораживается. Мы принимаем предзаказы от покупателей, готовим продукцию и назначаем дату доставки. В одно направление возим 1-2 раза в неделю. За день до доставки мы согласуем время прибытия курьера. На месте курьер поднимет ваш заказ на любой этаж и занесет при необходимости.',
            answer3:  'Таким образом вы получаете продукцию практически в день изготовления с запасом срока годности. Товары перевозятся в специально оборудованных автомобилях, в нужных температурных диапазонах. Все продукты разложены по коробкам с учетом товарного соседства и веса.',
        },
        {
            id: 3,
            question: 'Почему мясо продается наборами?',
            answer1: 'У нас исключительно натуральные, высококачественные фермерские продукты.',
            answer2: 'В наше время новых технологий откорма приходится очень избирательно относиться к выбору мясных продуктов для своей семьи. Мы распределяем части туши так, чтобы у каждого клиента были одинаковые равноценные части. Такое распределение дает возможность сохранять доступные цены и доставлять свежее мясо, не прибегая к глубокой заморозке и использованию консервантов.',
            answer3: 'В данный момент многие конкуренты копируют нашу идею. Чтобы быть уверенным,  рекомендуем проверять наличие знака качества “Амбарцево” на нашей продукции - мы несем ответственность за каждый заказ.',

        },
        {
            id: 4,
            question: 'Как заказать?',
            answer1: '1. В меню внизу страницы выберите вкладку “Каталог”.',
            answer2: '2. Наполните корзину нужными вам товарами. Возможность перейти в корзину появится только когда вы добавите в нее что-то, это можно сделать из каталога или из карточки товара.',
            answer3: '3. Перейдите в корзину, чтобы оформить заказ. Укажите ваш адрес и выберите удобный вариант оплаты. Если у вас есть промокод, примените его в корзине до оформления заказа.',
            answer4: '4. Нажмите "Заказать". Статус заказа всегда можно посмотреть на вкладке “Профиль”, там же будет кнопка “Связаться с нами”, если необходимо что-то уточнить.',
            answer5: 'PS. А ещё с 9.00 до 20.00 вы можете сделать заказ по телефону нажав на кнопку на главном экране.'
        },
        {
            id: 5,
            question: 'О нас ?',
            answer1: 'Мы — команда “Фермерское мясо”, которая выросла в деревне и не понаслышке знает, что такое натуральные фермерские продукты! Всю нашу любовь к крестьянскому труду и здоровому питанию мы вложили в свою продукцию и этой любовью мы делимся с вами.',
            answer2: 'Мы начинали с небольших продаж мяса своим близким и знакомым, стараясь как для себя. Постепенно спрос увеличивался мы задумались как сохранить натуральность и сделать ее ближе городскому жителю, так появился формат мясного набора.',
            answer3: 'В данный момент мы сотрудничаем с фермерскими хозяйствами Нижегородской области, тщательно отбираем поставщиков, изготавливаем продукцию на собственном небольшом производстве. Принцип работы «как для себя» остался и остается до сих пор!'
        },
    ]

    const [search, setSearch] = useState('');
    const [active_interest, setActiveInterest] = useState({});
    const [show_interesting_question_popup, setShowInterestingQuestionPopup] = useState(false);
    const [show_about_delivery_popup, setShowAboutDeliveryPopup] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

    const redirectToSignInScreen = () => {
        props.navigation.navigate('SignInScreen')
    }
    const openActiveInterest = (item) => {
        setActiveInterest(item)
        setShowInterestingQuestionPopup(true)

    }

    const redirectToCatalogProductsPage = (id) => {
            dispatch(setCatalogId(id,() => {
                props.navigation.navigate('CatalogProductsScreen')
            }))

    }
    const redirectToSearchPage = () => {
        setSearch('')
        props.navigation.navigate('SearchScreen')
    }
    const redirectToMyOrdersPage = () => {
        props.navigation.navigate('MyOrdersScreen')
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

    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#EFF4D6" translucent = {true}/>

            <ScrollView style={styles.home_catalog_main_wrapper}>
                <View style={styles.home_catalog_header_wrapper}>
                    <View style={styles.home_catalog_header_img}>
                        <Image style={styles.home_catalog_header_img_child} source={require('../../../assets/images/home_img.png')}/>
                    </View>
                    <TouchableOpacity style={styles.home_catalog_header_notification_icon}>
                        <NotificationLogo/>
                    </TouchableOpacity>
                </View>
                <View style={styles.home_catalog_main_img}>
                    <Image style={styles.home_catalog_main_img_child} source={require('../../../assets/images/home_page_img.png')}/>
                </View>
                <View style={styles.home_catalog_search_input_delivery_phone_buttons_wrapper}>
                        <View style={styles.home_catalog_search_input_field_icon_wrapper}>
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

                        </View>
                        <View style={styles.home_catalog_delivery_phone_buttons_wrapper}>
                            {search.length > 0 ?
                                <TouchableOpacity style={styles.home_catalog_delivery_phone_button} onPress={() => {
                                    redirectToSearchPage()
                                }}>
                                    <SearchIcon/>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={[styles.home_catalog_delivery_phone_button, {opacity: 0.5}]} disabled={true}>
                                    <SearchIcon/>
                                </TouchableOpacity>
                            }


                            <TouchableOpacity
                                style={styles.home_catalog_delivery_phone_button}
                                onPress={() => {
                                    setShowAboutDeliveryPopup(true)
                                }}
                            >
                                <DeliveryIcon/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.home_catalog_delivery_phone_button}
                                onPress={() => {
                                    makePhoneCall()
                                }}
                            >
                                <PhoneIcon/>
                            </TouchableOpacity>
                        </View>
                </View>
                <View style={styles.home_catalog_items_wrapper}>
                    {catalog_data.length > 0 && catalog_data.map((item, index) => {
                        return(
                            <TouchableOpacity key={index} style={styles.home_catalog_item}
                                              onPress={() => redirectToCatalogProductsPage(item.id)}
                            >
                                    <Text style={styles.home_catalog_item_title}>{item?.title}</Text>
                                    <View style={styles.home_catalog_item_img}>
                                        {item.images.length > 0 ?
                                            <Image style={styles.home_catalog_item_img_child} source={{uri: item.images[0].image}}/>
                                            :
                                            <Image style={styles.home_catalog_item_img_child} source={require('../../../assets/images/catalog_img.png')}/>
                                        }
                                    </View>
                            </TouchableOpacity>
                        )

                    })}
                </View>
                <View style={styles.home_catalog_line}></View>
                <View style={styles.home_catalog_interesting_questions_wrapper}>
                    <Text style={styles.home_catalog_interesting_questions_title}>ИНТЕРЕСНОЕ</Text>
                    <ScrollView horizontal={true} nestedScrollEnabled={true} style={styles.home_catalog_interesting_questions_items_wrapper}>
                        {interesting_questions.map((item, index) => {
                            return(
                                <TouchableOpacity key={index}
                                                  style={styles.home_catalog_interesting_questions_items}
                                                  onPress={() => {
                                                      openActiveInterest(item)
                                                  }}

                                >
                                        <View style={styles.home_catalog_interesting_questions_item_icon}>
                                            <QuestionIcon/>
                                        </View>
                                        <Text style={styles.home_catalog_interesting_questions_item_title}>{item.question}</Text>
                                </TouchableOpacity>
                            )

                        })}
                    </ScrollView>
                </View>
            </ScrollView>


            {isKeyboardVisible === false &&
                <Footer active_page={'home_catalog'} navigation={props.navigation}/>
            }


            {show_interesting_question_popup &&
                <View style={styles.interesting_question_popup}>
                    <View style={styles.interesting_question_popup_wrapper}>
                        <TouchableOpacity style={styles.interesting_question_popup_close_icon}
                            onPress={() => {
                                setShowInterestingQuestionPopup(false)
                            }}
                        >
                            <CloseIcon/>
                        </TouchableOpacity>

                        <ScrollView style={{flex: 1, width: '100%'}}>
                            <Text style={styles.interesting_question_popup_title}>{active_interest.question}</Text>

                            {active_interest.answer1 &&
                            <Text style={styles.interesting_question_popup_text}>{active_interest.answer1}</Text>

                            }
                            {active_interest.answer2 &&
                            <Text style={styles.interesting_question_popup_text}>{active_interest.answer2}</Text>
                            }
                            {active_interest.answer3 &&
                            <Text style={styles.interesting_question_popup_text}>{active_interest.answer3}</Text>
                            }
                            {active_interest.answer4 &&
                            <Text style={styles.interesting_question_popup_text}>{active_interest.answer4}</Text>
                            }

                            {active_interest.answer5 &&
                            <Text style={styles.interesting_question_popup_text}>{active_interest.answer5}</Text>
                            }
                        </ScrollView>

                    </View>
                </View>
            }
            {show_about_delivery_popup &&
                <View style={styles.interesting_question_popup}>
                <View style={styles.interesting_question_popup_wrapper}>
                    <TouchableOpacity style={styles.interesting_question_popup_close_icon}
                                      onPress={() => {
                                          setShowAboutDeliveryPopup(false)
                                      }}
                    >
                        <CloseIcon/>
                    </TouchableOpacity>

                    <ScrollView style={{flex: 1, width: '100%'}}>
                        <Text style={styles.interesting_question_popup_title}>Доставка</Text>

                        <Text style={styles.interesting_question_popup_text}>
                            Доставка осуществляется бесплатно при заказе на сумму от 3 000 рублей. При заказе на сумму менее 3 000 рублей стоимость доставки составит 200 рублей. Вся продукция изготавливается под заказ, а мясные наборы доставляются без заморозки в течение суток после разруба и упаковки – мясо не замораживается. Мы принимаем предзаказы от покупателей, готовим продукцию и назначаем дату доставки.
                        </Text>
                        <Text style={styles.interesting_question_popup_text}>
                            В одном направлении мы возим товары 1-2 раза в неделю. За день до доставки мы согласуем время прибытия курьера. На месте курьер поднимет ваш заказ на любой этаж и занесет, если потребуется. Таким образом, вы получаете продукцию практически в день изготовления с запасом срока годности.
                        </Text>
                        <Text style={styles.interesting_question_popup_text}>
                            Товары перевозятся в специально оборудованных автомобилях в нужных температурных диапазонах. Все продукты разложены по коробкам с учетом товарного соседства и веса.
                        </Text>



                    </ScrollView>

                </View>
            </View>
            }


        </SafeAreaView>
    );
}

export default HomeCatalog;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        width: "100%",
        height:  '100%',

    },

    home_catalog_header_wrapper: {
        width: '100%',
        height: 50,
        backgroundColor: '#EFF4D6',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: 8
    },
    home_catalog_header_notification_icon: {
        position: 'absolute',
        right: 13,
    },
    home_catalog_header_img: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: 198,
        height: 63
    },

    home_catalog_header_img_child: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    home_catalog_main_wrapper: {
        flex: 1,
        width: '100%',
    },
    home_catalog_main_img: {
        width: '100%',
        height: 210,
        marginBottom: 15,
    },
    home_catalog_main_img_child: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover'
    },
    home_catalog_search_input_delivery_phone_buttons_wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingHorizontal: 12,
    },
    home_catalog_search_input_field_icon_wrapper: {
        width: '100%',
        maxWidth: 200,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 3,
        shadowRadius: 19,
        elevation: 10,
        paddingHorizontal: 8,
        // paddingVertical: 8,
        height: 45,

    },
    home_catalog_search_input_field: {
        fontWeight: '300',
        color: '#B8B8B8',
        fontSize: 16,
        marginLeft: 4,
    },
    home_catalog_delivery_phone_buttons_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 150,
        justifyContent: 'space-between',
    },
    home_catalog_delivery_phone_button: {
        backgroundColor: '#B9D149',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 3,
        shadowRadius: 19,
        elevation: 10,
        width: 42,
        height: 44,
    },
    home_catalog_items_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 23,
        paddingHorizontal: 14,
    },
    home_catalog_item: {
        backgroundColor: '#EFF4D6',
        width: '48%',
        borderRadius: 14,
        position: 'relative',
        height: 160,
        marginBottom: 15,
        paddingTop: 8,
        // paddingLeft: 12,
        justifyContent: 'space-between'

    },
    home_catalog_item_img: {
        width: '100%',
        height: 110,
        // position: 'absolute',
        // right: 0,
        // bottom: 0,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        overflow: 'hidden',
        marginTop: 5

    },
    home_catalog_item_img_child: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    home_catalog_item_title: {
        color: '#4C7032',
        fontWeight: '400',
        fontSize: 16,
        paddingLeft: 12,
        // marginBottom: 5
    },
    home_catalog_interesting_questions_title: {
        color: '#4E7234',
        fontWeight: '400',
        fontSize: 22,
        marginBottom: 14
    },
    home_catalog_interesting_questions_wrapper: {
        width: '100%',
        paddingHorizontal: 18,
    },
    home_catalog_line: {
        width: '100%',
        height: 2,
        backgroundColor: '#EFF4D6',
        marginBottom: 13,
    },
    home_catalog_interesting_questions_items: {
        borderColor: '#B9D149',
        borderWidth: 2,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        width: 110,
        height: 126,
        paddingVertical: 9,
        paddingHorizontal: 11,
        marginRight: 17,
        justifyContent: 'space-between',
        alignItems: 'flex-start'

    },
    home_catalog_interesting_questions_items_wrapper: {
        width: '100%',
        marginBottom: 25,
    },
    home_catalog_interesting_questions_item_title: {
        color: '#4E7234',
        fontWeight: '400',
        fontSize: 11,
    },
    interesting_question_popup: {
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
    interesting_question_popup_wrapper: {
        width: '100%',
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        backgroundColor: '#ffffff',
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 34,
        elevation: 999,
        zIndex: 999999,
        position: 'absolute',
        bottom: 0,
        paddingTop: 60,
        paddingHorizontal: 18,
        paddingBottom: 54,
        maxHeight: 648,
        height: '100%'
    },
    interesting_question_popup_title: {
        color: '#4E7234',
        fontWeight: '700',
        fontSize: 24,
        marginBottom: 25,
    },
    interesting_question_popup_text: {
        color: '#000000',
        fontWeight: '400',
        fontSize: 18,
        marginBottom: 20,
    },
    interesting_question_popup_close_icon: {
       position: 'absolute',
       top: 25,
       right: 25,
    },
});
