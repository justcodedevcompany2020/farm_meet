import * as React from 'react';
import {useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import Logo from '../../../assets/svg/logo'
import FooterLogo from '../../../assets/svg/footer_logo'


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
    const [phone, setPhone] = useState('');
    const [phone_error, setPhoneError] = useState(false);
    const [phone_error_text, setPhoneErrorText] = useState('');

    const [name, setName] = useState('');
    const [name_error, setNameError] = useState(false);
    const [name_error_text, setNameErrorText] = useState('');

    const [show_phone_code_popup, setPhoneCodePopup] = useState(false);
    const [show_name_popup, setNamePopup] = useState(false);
    const [show_welcome_popup, setWelcomePopup] = useState(false);


    const [timer, setTimer] = useState(60);

    const context = useContext(AuthContext);


    const [code, setCode] = useState(['', '', '', '']);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const inputRefs = useRef([]);

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

    const handleSubmit = () => {
        const enteredCode = code.join('');
        console.log('Entered code:', enteredCode);
    };

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
        // setPhoneButtonDisable(isValid)

        setPhone(myPhone);
    }

    function validatePhoneNumber(phoneNumber) {
        let regex = /^((\7|7|8)+([0-9]){10})$/;
        let new_phone = phoneNumber.replace(/\D/g, '');
        return regex.test(new_phone);

    }



    return (
        <SafeAreaView style={[styles.container]}>

            <Text>bpppp</Text>


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
        textAlign: 'center'

    },


    auth_btn: {
        width: '100%',
        backgroundColor: '#BCC9B2',
        borderRadius: 14,
        paddingHorizontal: 17,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
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
        textAlign: 'center'
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
        justifyContent: 'center'
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
    }
});
