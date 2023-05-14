import * as React from 'react';
import {useRef, useState, useEffect} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import Logo from '../../../assets/svg/logo'
import FooterLogo from '../../../assets/svg/footer_logo'
import {useDispatch, useSelector, Provider} from 'react-redux';
import {checkToken, login, getCatalogData} from '../../../store/actions/farmMeatActions';

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
function SignIn (props) {

    const dispatch = useDispatch();
    const {isLoggedIn, user} = useSelector(state => state.farmMeatReducer);

    const [phone, setPhone] = useState('');
    const [phone_error, setPhoneError] = useState(false);
    const [phone_error_text, setPhoneErrorText] = useState('');

    const [name, setName] = useState('');
    const [name_error, setNameError] = useState(false);
    const [name_error_text, setNameErrorText] = useState('');

    const [show_phone_code_popup, setPhoneCodePopup] = useState(false);
    const [show_name_popup, setNamePopup] = useState(false);
    const [show_welcome_popup, setWelcomePopup] = useState(false);
    const [phone_button_disable, setPhoneButtonDisable] = useState(false);


    const [user_info_after_get_code, setUserInfoAfterGetCode] = useState([]);
    const [logged_user_info, setLoggedUserInfo] = useState([]);


    const [timer, setTimer] = useState(60);

    const context = useContext(AuthContext);


    const [code, setCode] = useState(['', '', '', '']);
    const [code_error, setCodeError] = useState(false);
    const [code_error_text, setCodeErrorText] = useState('');

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (timer > 0 ) {
            const interval = setInterval(() => setTimer(timer - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);





    const handleResend = async () => {
        // Отправляем запрос на повторное отправление кода на телефон

        let cleaned_phone_number = phone.replace(/\D/g, '');

        let formdata = new FormData();
        formdata.append("user", cleaned_phone_number);

        console.log(cleaned_phone_number, 'phone');

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        let response = await fetch("https://farm-meat.site/accounts/get_auth_code/", requestOptions);
        let data = await response.json();

        if (response.status == 200) {
            setTimer(60);
            setUserInfoAfterGetCode(data)
        } else {
            //errors
        }

        console.log(typeof response.status, 'stauuuuus');
        console.log(data, ';llllllllllllll');
    };

    const handleChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
        setIsButtonDisabled(newCode.some((value) => !value));
        if (text && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (event, index) => {
        if (event.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // const handleSubmit = () => {
    //
    // };

    const redirectToSignInScreen = () => {
        props.navigation.navigate('SignInScreen')
    }


    const phoneValidation = (val) => {

        let x = val
            .replace(/\D/g, '')
            .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        let myPhone = !x[2]
            ? '+7 ' + (x[1] != '7' ? x[1] : '')
            : !x[3]
                ? '+7 (' + x[2]
                : '+7 (' +
                x[2] +
                ') ' +
                (x[3] ? x[3] : '') +
                (x[4] ? ' - ' + x[4] : '') +
                (x[5] ? ' - ' + x[5] : '');

        const isValid = validatePhoneNumber(myPhone);
        console.log(isValid, 'isvalid');
        setPhoneButtonDisable(isValid)

        setPhone(myPhone);
    }

    function validatePhoneNumber(phoneNumber) {
        let regex = /^((\7|7|8)+([0-9]){10})$/;
        let new_phone = phoneNumber.replace(/\D/g, '');
        return regex.test(new_phone);

    }

    const getCodeForAuth = async () => {
        let cleaned_phone_number = phone.replace(/\D/g, '');

        let formdata = new FormData();
        formdata.append("user", cleaned_phone_number);

        console.log(cleaned_phone_number, 'phone');

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        let response = await fetch("https://farm-meat.site/accounts/get_auth_code/", requestOptions);
        let data = await response.json();

        if (response.status == 200) {
            setPhoneButtonDisable(true)
            setUserInfoAfterGetCode(data)
            setPhoneCodePopup(true)
            setTimer(60)

        } else {
            if (data.hasOwnProperty('message')) {
                if (data.message == 'does not match the format 89XXXXXXXXX or phone field is missing') {
                     setPhoneError(true)
                    setPhoneErrorText('Не верный формат')
                     setTimeout(() => {
                         setPhoneError(false)
                     }, 2000)
                }
                if (data.message == `It's been less than 1 minute since the last request code.`) {
                    setPhoneError(true)
                    setPhoneErrorText(`Попробуйте ещё раз через ${timer} секунд`)
                    setTimeout(() => {
                        setPhoneError(false)
                    }, 2000)
                }
            }
        }

        console.log(typeof response.status, 'stauuuuus');
        console.log(data, ';llllllllllllll');

    }


    const loginOrRegister = async () => {
        let cleaned_phone_number = phone.replace(/\D/g, '');
        let enteredCode = code.join('');
        console.log('Entered code:', enteredCode);

        let formdata = new FormData();
        formdata.append("user", cleaned_phone_number);
        formdata.append("code", enteredCode);
        formdata.append("device", "");

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        let response = await fetch("https://farm-meat.site/accounts/login/", requestOptions);
        let data = await response.json();

        console.log(response.status, 'code status');
        if (response.status == 200) {
             if (user_info_after_get_code.new === true) {
                    setPhoneCodePopup(false)
                   setNamePopup(true)
             } else {

                 setPhoneCodePopup(false)
                 setWelcomePopup(true)
                 setTimeout(() => {
                     dispatch(login(data))
                 }, 2000)


             }
            setLoggedUserInfo(data)

        } else {
            if (data.message == 'Code is wrong') {
                setCodeError(true)
                setCodeErrorText('Не верный код')
                setTimeout(() => {
                    setCodeError(false)
                }, 2000)
            }
        }


        console.log(data, 'ffffff');
    }

    const updateUserInfo = async () => {
        let cleaned_phone_number = phone.replace(/\D/g, '');
        let formdata = new FormData();

        formdata.append("user", cleaned_phone_number);
        formdata.append("first_name", name);

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        let response = await fetch("https://farm-meat.site/accounts/update_user/", requestOptions);
        let data = await response.json();

        if (response.status == 200) {
             setNamePopup(false)
            setWelcomePopup(true)
            setTimeout(() => {
                dispatch(login(logged_user_info))
            }, 2000)

        } else {
            //errors
        }
    }



    return (
        <SafeAreaView style={[styles.container]}>
            <ScrollView style={styles.auth_main_wrapper}>
                <View style={styles.auth_wrapper}>
                    <View style={{ width: '100%',paddingHorizontal: 60,alignSelf: 'center', alignItems: "center",}}>
                        <View style={styles.auth_logo}>
                            <Logo/>
                        </View>
                        <View style={styles.auth_input_btn_wrapper}>
                            <View style={styles.auth_input_wrapper}>
                                <TextInput
                                    style={[styles.auth_input_field]}
                                    // onChangeText={(val) => setPhone(val)}
                                    onChangeText={(val) => {
                                        phoneValidation(val)
                                    }}
                                    value={phone}
                                    placeholder='+7ХХХ-ХХХ-ХХ-ХХ'
                                    placeholderTextColor='#ffffff'
                                    keyboardType={'phone-pad'}
                                />

                            </View>

                            {phone_button_disable ? (
                                <TouchableOpacity
                                    style={[styles.auth_btn, {backgroundColor:'#B9D149'}]}
                                    onPress={() => {
                                        setPhoneButtonDisable(false)
                                        getCodeForAuth()
                                    }}
                                >
                                    <Text style={styles.auth_btn_text}>ВХОД</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={[styles.auth_btn, {backgroundColor: '#BCC9B2'}]}  disabled={true} >
                                    <Text style={styles.auth_btn_text}>ВХОД</Text>
                                </TouchableOpacity>
                            )}

                        </View>
                    </View>

                    <View style={styles.footer_logo}>
                        <FooterLogo/>
                    </View>
                    <View style={{width: '100%', height: 480, zIndex: -1, position: 'absolute', bottom:0 }}>
                        <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={require('../../../assets/images/back_img.png')}/>
                    </View>
                </View>
            </ScrollView>



            {show_phone_code_popup &&
                <View style={styles.phone_code_popup}>
                    <View style={styles.phone_code_popup_wrapper}>
                        <ScrollView style={styles.auth_main_wrapper}>
                            <View style={styles.auth_wrapper}>
                                <View style={{ width: '100%',paddingHorizontal: 60,alignSelf: 'center', alignItems: "center",}}>
                                    <View style={styles.phone_code_popup_logo}>
                                        <Logo/>
                                    </View>
                                    <View style={{width: '100%'}}>
                                        <Text style={styles.phone_code_popup_title}>ВВЕДИТЕ КОД</Text>
                                        <View style={styles.phone_code_popup_inputs_wrapper}>
                                            {code.map((value, index) => (
                                                <TextInput
                                                    key={index}
                                                    ref={(ref) => inputRefs.current[index] = ref}
                                                    style={styles.phone_code_popup_input_field}
                                                    onChangeText={(text) => handleChange(text, index)}
                                                    onKeyPress={(event) => handleKeyPress(event, index)}
                                                    value={value}
                                                    keyboardType="numeric"
                                                    maxLength={1}
                                                />
                                            ))}

                                        </View>

                                        {isButtonDisabled ? (
                                            <TouchableOpacity
                                                disabled={true}
                                                style={[styles.auth_btn, {backgroundColor:'#BCC9B2'}]}
                                            >
                                                <Text style={styles.auth_btn_text}>ДАЛЕЕ</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity
                                                style={[styles.phone_code_popup_btn, {backgroundColor: '#B9D149'}]}
                                                onPress={() => {
                                                    loginOrRegister()
                                                }}
                                            >
                                            <Text style={styles.phone_code_popup_btn_text}>ДАЛЕЕ</Text>
                                            </TouchableOpacity>

                                        )}



                                        <View style={{width: '100%', paddingTop: 20}}>
                                            {timer > 0 &&
                                            <TouchableOpacity disabled={true} style={styles.timer_btn}>
                                                <Text style={styles.timer_text}>Повторить через {timer} сек.</Text>
                                            </TouchableOpacity>
                                            }
                                            {/*<Text style={styles.timer_text}>{timer > 0 ? `Повторить через ${timer} сек.` : null}</Text>*/}
                                            {timer == 0 &&
                                                <TouchableOpacity onPress={() => {handleResend()}} style={styles.timer_btn}>
                                                    <Text style={styles.timer_text}>Отправить код повторно</Text>
                                                </TouchableOpacity>
                                            }

                                        </View>
                                    </View>

                                </View>

                                <View style={styles.footer_logo}>
                                    <FooterLogo/>
                                </View>
                                <View style={{width: '100%', height: 480, zIndex: -1, position: 'absolute', bottom:0 }}>
                                    <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={require('../../../assets/images/back_img.png')}/>
                                </View>

                            </View>

                        </ScrollView>
                    </View>
                </View>
            }
            {show_name_popup &&
            <View style={styles.phone_code_popup}>
                <View style={styles.phone_code_popup_wrapper}>
                    <ScrollView style={styles.auth_main_wrapper}>
                        <View style={styles.auth_wrapper}>
                            <View style={{ width: '100%',paddingHorizontal: 60,alignSelf: 'center', alignItems: "center",}}>
                                <View style={styles.name_popup_logo}>
                                    <Logo/>
                                </View>
                                <View style={styles.auth_input_btn_wrapper}>
                                    <View style={styles.auth_input_wrapper}>
                                        <TextInput
                                            style={[styles.auth_input_field]}
                                            onChangeText={(val) => setName(val)}
                                            value={name}
                                            placeholder='ВВЕДИТЕ ИМЯ'
                                            placeholderTextColor='#ffffff'
                                        />

                                    </View>

                                    {name.length > 0 ?
                                        <TouchableOpacity
                                            style={[styles.auth_btn, {backgroundColor:'#B9D149'}]}
                                            onPress={() => {
                                                updateUserInfo()
                                            }}
                                        >
                                            <Text style={styles.auth_btn_text}>ВХОД</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            style={[styles.auth_btn, {backgroundColor:'#BCC9B2'}]}
                                            disabled={true}
                                        >
                                            <Text style={styles.auth_btn_text}>ВХОД</Text>
                                        </TouchableOpacity>
                                    }

                                </View>
                            </View>
                            <View style={styles.footer_logo}>
                                <FooterLogo/>
                            </View>
                            <View style={{width: '100%', height: 480, zIndex: -1, position: 'absolute', bottom:0 }}>
                                <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={require('../../../assets/images/back_img.png')}/>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            </View>
            }
            {show_welcome_popup &&
            <View style={styles.phone_code_popup}>
                <View style={styles.phone_code_popup_wrapper}>
                    <ScrollView style={styles.auth_main_wrapper}>
                        <View style={styles.auth_wrapper}>
                            <View style={{ width: '100%',paddingHorizontal: 60,alignSelf: 'center', alignItems: "center",}}>
                                <View style={styles.welcome_popup_logo}>
                                    <Logo/>
                                </View>
                                <Text style={styles.welcome_popup_title}>Добро пожаловать!</Text>
                            </View>

                            <View style={styles.footer_logo}>
                                <FooterLogo/>
                            </View>
                            <View style={{width: '100%', height: 480, zIndex: -1, position: 'absolute', bottom:0 }}>
                                <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={require('../../../assets/images/back_img.png')}/>
                            </View>

                        </View>
                    </ScrollView>

                </View>
            </View>
            }
            {phone_error &&
                <View style={styles.error_box}>
                    <Text style={styles.error_text}>{phone_error_text}</Text>
                </View>
            }
            {code_error &&
                <View style={styles.error_box}>
                    <Text style={styles.error_text}>
                        {code_error_text}
                    </Text>
                </View>
            }
        </SafeAreaView>
    );
}

export default SignIn;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4E7234',
        width: "100%",
        height:  '100%',
        position: 'relative'

    },

    auth_main_wrapper: {
        width: '100%',
        flex: 1,

    },
    auth_wrapper: {
        width: '100%',
        paddingTop: 155,
        justifyContent: 'flex-start',
        alignSelf: 'center',
        alignItems: "center",
        height: windowHeight

    },
    auth_logo: {
        marginBottom: 28,
        alignSelf: 'center',
        alignItems: "center",
    },
    auth_input_btn_wrapper: {
        width: '100%',
    },
    auth_input_wrapper: {
        width: '100%',
    },

    auth_input_field: {
        width: '100%',
        backgroundColor: '#BCC9B2',
        borderRadius: 14,
        marginBottom: 7,
        paddingHorizontal: 17,
        height: 51,
        fontWeight: '400',
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center',
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 3,
        shadowRadius: 19,
        elevation: 10


    },


    auth_btn: {
        width: '100%',
        // backgroundColor: '#BCC9B2',
        borderRadius: 14,
        paddingHorizontal: 17,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 3,
        shadowRadius: 19,
        elevation: 10
    },
    auth_btn_text: {
        fontWeight: '400',
        color: '#ffffff',
        fontSize: 21,
    },

    phone_code_popup: {
        backgroundColor:  'rgba(0, 0, 0, 0.6)',
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
    phone_code_popup_wrapper: {
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: '#4E7234',

    },
    phone_code_popup_input_field: {
        width: 50,
        height: 51,
        backgroundColor: 'rgba(255, 255, 255, 0.62)',
        borderRadius: 14,
        fontWeight: '400',
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center',
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 3,
        shadowRadius: 19,
        elevation: 10
    },
    phone_code_popup_inputs_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: 224,
        marginBottom: 11,

    },
    phone_code_popup_logo: {
        marginBottom: 6,
        alignSelf: 'center',
        alignItems: "center",
    },
    phone_code_popup_btn: {
        width: '100%',
        backgroundColor: '#BCC9B2',
        borderRadius: 14,
        paddingHorizontal: 17,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {width: 2, height: 5},
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 3,
        shadowRadius: 19,
        elevation: 10
    },
    phone_code_popup_btn_text: {
        fontWeight: '400',
        color: '#ffffff',
        fontSize: 21,
    },
    phone_code_popup_title: {
        fontWeight: '400',
        color: '#ffffff',
        fontSize: 21,
        marginBottom: 6,
        textAlign: 'center'
    },
    name_popup_logo: {
        marginBottom: 17,
        alignSelf: 'center',
        alignItems: "center",
    },
    welcome_popup_logo: {
        marginBottom: 30,
        alignSelf: 'center',
        alignItems: "center",
    },
    welcome_popup_title: {
        fontWeight: '700',
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center'
    },
    footer_logo: {
        position: 'absolute',
        bottom: 40
    },
    error_box: {
        height: 70,
        width: 220,
        borderRadius: 14,
        backgroundColor: '#cc0000',
        position: 'absolute',
        top: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        zIndex: 99999999999999999,


    },
    error_text: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
    },
    timer_text: {
        fontWeight: '400',
        color: '#ffffff',
        fontSize: 21,
        textAlign: 'center',
    },
    timer_btn: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    }
});
