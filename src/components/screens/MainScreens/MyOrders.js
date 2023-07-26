import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, useColorScheme} from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {getMyOrdersData, getProfileData, login} from '../../../store/actions/farmMeatActions';
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
import EditIcon from '../../../assets/svg/edit_btn';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Profile (props) {
    const dispatch = useDispatch();
    const {my_orders_info} = useSelector(state => state.farmMeatReducer);






    useEffect(() => {
        dispatch(getMyOrdersData())
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

    const redirectToProfileScreen = () => {
        props.navigation.navigate('ProfileScreen')
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
                    <ScrollView style={{width: '100%', flex: 1}}>
                    </ScrollView>


                </View>
            </ScrollView>
            <BasketBlock  navigation={props.navigation}/>
            {isKeyboardVisible === false &&
            <Footer active_page={'profile'} navigation={props.navigation}/>
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
    }
});
