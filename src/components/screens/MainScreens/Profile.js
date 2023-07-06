import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, useColorScheme} from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {getProfileData} from '../../../store/actions/farmMeatActions';
import Footer from '../../includes/Footer'
import AddAddressIcon from '../../../assets/svg/add_address_icon'
import EditAddressIcon from '../../../assets/svg/edit_btn'

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
import BackIcon from '../../../assets/svg/back_icon';
import BasketBlock from '../../includes/BasketBlock';
import PaymentCloseIcon from '../../../assets/svg/payment_close_icon';
import QuestionIcon from '../../../assets/svg/question_icon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Profile (props) {
    const dispatch = useDispatch();
    const {profile_info} = useSelector(state => state.farmMeatReducer);
    const [delivery_address_popup, setDeliveryAddressPopup] = useState(false);
    const [delivery_address_city, setDeliveryAddressCity] = useState('');
    const [delivery_address_office, setDeliveryAddressOffice] = useState('');
    const [delivery_address_entrance, setDeliveryAddressEntrance] = useState('');
    const [delivery_address_floor, setDeliveryAddressFloor] = useState('');
    const [delivery_address_intercom, setDeliveryAddressIntercom] = useState('');
    const [found_address_box, setFoundAddressesBox] = useState([]);
    const [show_addresses_list, setShowAddressesList] = useState(false);
    const [selected_address, setSelectedAddress] = useState(null);



    useEffect(() => {
        dispatch(getProfileData())
    }, [dispatch]);


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
                     dispatch(getProfileData())
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
        let address = '';
        if (delivery_address_city.length != 0) {
             address = delivery_address_city
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

    // const selectAddress = (item) => {
    //     console.log(item.address,  'item.addresses');
    //
    //     setSelectedAddress(item)
    //     setDeliveryAddressCity(item.address)
    //     setShowAddressesList(false)
    // }


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
                    <TouchableOpacity style={styles.profile_wrapper_tab_my_details_btn}>
                        <Text style={styles.profile_wrapper_tab_my_details_btn_text}>Мои данные</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.profile_info_box}>
                    <View style={styles.profile_info_box_personal_info}>
                        <View style={styles.profile_info_box_title_info_wrapper}>
                            <Text style={styles.profile_info_box_title}>Имя:</Text>
                            <Text style={styles.profile_info_box_text}>{profile_info.last_name}</Text>
                        </View>
                        <View style={styles.profile_info_box_title_info_wrapper}>
                            <Text style={styles.profile_info_box_title}>Номер телефона:</Text>
                            <Text style={styles.profile_info_box_text}>{profile_info.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.profile_address_info_box}>
                        <Text style={styles.profile_address_info_title}>
                            Адрес доставки
                        </Text>
                        <TouchableOpacity style={styles.profile_add_address_btn} onPress={() => {
                            setDeliveryAddressPopup(true)
                        }}>
                                <Text style={styles.profile_add_address_btn_text}>+ Добавить новый адрес</Text>
                                <AddAddressIcon/>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.profile_edit_address_info_box}>
                    <ScrollView style={{width: '100%', flex: 1}}>
                        {profile_info?.addresses?.map((item, index) => {
                            console.log(item.text, 'iteeeeem');
                            return(
                                <View style={styles.profile_edit_address_icon_parent} key={index}>
                                    <View style={styles.profile_edit_address_icon_wrapper}>
                                        <Text style={styles.profile_edit_address_info}>
                                            {item.text}
                                        </Text>
                                        {/*<TouchableOpacity style={styles.profile_edit_address_icon}>*/}
                                        {/*    <EditAddressIcon/>*/}
                                        {/*</TouchableOpacity>*/}
                                    </View>

                                </View>
                            )

                        })}
                    </ScrollView>


                </View>
            </ScrollView>
            <BasketBlock  navigation={props.navigation}/>
            {isKeyboardVisible === false &&
            <Footer active_page={'profile'} navigation={props.navigation}/>
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
                            <TouchableOpacity style={styles.delivery_address_popup_close_btn}
                                              onPress={() => {
                                                  setShowAddressesList(false)
                                              }}
                            >
                                <PaymentCloseIcon/>
                            </TouchableOpacity>
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
        borderWidth: 2,
        borderColor: '#EFF4D6',
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
    profile_wrapper_tab_my_orders_btn: {
        backgroundColor: '#D8D8D8',
        width: '48%',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    profile_wrapper_tab_my_orders_btn_text: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 400,

    },

    profile_wrapper_tab_my_details_btn: {
        backgroundColor: '#4E7234',
        width: '48%',
        borderRadius: 4,
        // height: 37,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile_wrapper_tab_my_details_btn_text: {
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
        height: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0,
        top: 95,
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


});
