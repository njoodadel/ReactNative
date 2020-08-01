import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Input, Button, Text } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Firebase from '../../Config/Firebase'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


export default function Signup({ navigation }) {


    //Refs
    let emailInput = React.createRef();
    let usernameInput = React.createRef();
    let PhoneNumberInput = React.createRef();
    let passwordInput = React.createRef();

    // State
    // Values
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [phoneNumber, setPhonenumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    //Error messages
    const [emailError, setEmailError] = React.useState('');
    const [usernameError, setUsernameError] = React.useState('');
    const [phoneNumberError, setPhonenumberError] = React.useState('');
    const [PasswordError, setPasswordError] = React.useState('');
    //Validation
    const [emailSyntax, setEmailSyntax] = React.useState(false)
    const [usernameSyntax, setUsernameSyntax] = React.useState(false)
    const [phoneNumberSyntax, setPhoneNumberSyntax] = React.useState(false)
    const [passwordSyntax, setPasswordSyntax] = React.useState(false)

    const handleSignUp = () => {
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                console.log('then 1')
                // let uid = response.user.uid
                const userInfo = {
                    // id: response.user.uid,
                    email: email,
                    username: username,
                    phoneNumber: phoneNumber
                };

                Firebase.database().ref('Users/').push(userInfo)
                    .then(() => {
                        console.log('then 2')
                        navigation.navigate('App', { userInfo: userInfo })
                    }).catch((error) => {
                        console.log('in error')
                        console.log(error)
                    });

            })
            .catch(error => {
                console.log(error.code)
                if (error.code == 'auth/email-already-in-use') {
                    Alert.alert(
                        'Something went wrong!', 'This email is already used ',
                        [

                            { text: 'Ok' },
                        ],
                        { cancelable: false }
                    );
                }
            })




    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>

                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>

                    <View style={{ marginTop: 80, marginBottom: 80 }}>
                        <Text h2 h2Style={{ color: '#FE346E', }}>REGISTER</Text>
                    </View>

                    {/* Email */}
                    <Input inputStyle={{ paddingLeft: 5, color: 'white', }} placeholder='Email' placeholderTextColor='white' leftIcon={
                        <MaterialCommunityIcons
                            name='email-outline'
                            size={24}
                            color='#FE346E'
                        />
                    }
                        autoCapitalize='none'
                        keyboardType="email-address"
                        autoCorrect={false}
                        keyboardAppearance="light"
                        returnKeyType="next"
                        ref={(input) => (emailInput = input)}
                        onChangeText={value => setEmail(value)}
                        errorMessage={emailError}
                        onSubmitEditing={() => {
                            usernameInput.focus();
                        }}
                        onBlur={() => {
                            const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

                            if (emailRegex.test(email)) {
                                setEmailSyntax(true)
                                setEmailError('')
                            } else {
                                let newError = ''
                                if (email == '') {
                                    let newError = 'Email can\'t be empty'
                                    setEmailError(newError)
                                } else {
                                    newError = ' Invalid email'
                                    setEmailError(newError)
                                }
                            }
                        }
                        }
                    >
                    </Input>
                    {/* Username */}
                    <Input inputStyle={{ paddingLeft: 5, color: 'white', }} placeholder='Username' placeholderTextColor='white' leftIcon={
                        <MaterialCommunityIcons
                            name='account-outline'
                            size={24}
                            color='#FE346E'
                        />
                    }
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardAppearance="light"
                        returnKeyType="next"
                        ref={input => (usernameInput = input)}
                        onChangeText={value => setUsername(value)}
                        errorMessage={usernameError}
                        onSubmitEditing={() => {
                            PhoneNumberInput.focus();
                        }}
                        onBlur={() => {
                            const usernameRegex = /^[a-zA-Z0-9]{4,20}$/
                            if (usernameRegex.test(username)) {
                                setUsernameSyntax(true)
                                setUsernameError('')
                            } else {
                                let newError = ''
                                if (username == '') {
                                    let newError = 'Username  can\'t be empty'
                                    setUsernameError(newError)
                                } else {
                                    newError = 'Username lenght must be 4-20 '
                                    setUsernameError(newError)
                                }
                            }
                        }
                        }
                    ></Input>

                    {/* Phonenumber */}
                    <Input inputStyle={{ paddingLeft: 5, color: 'white', }} placeholder='Phone Number' placeholderTextColor='white' leftIcon={
                        <MaterialCommunityIcons
                            name='cellphone-iphone'
                            size={24}
                            color='#FE346E'
                        />
                    }
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='number-pad'
                        keyboardAppearance="light"
                        returnKeyType="next"
                        ref={input => (PhoneNumberInput = input)}
                        onChangeText={value => setPhonenumber(value)}
                        errorMessage={phoneNumberError}
                        onSubmitEditing={() => {
                            passwordInput.focus();
                        }}
                        onBlur={() => {
                            const phoneNumberRegex = /^\d{10}$/;

                            if (phoneNumberRegex.test(phoneNumber)) {
                                setPhoneNumberSyntax(true)
                                setPhonenumberError('')
                            } else {
                                let newError = ''
                                if (phoneNumber == '') {
                                    let newError = 'Phone number can\'t be empty'
                                    setPhonenumberError(newError)
                                } else {
                                    newError = ' Invalid phone number'
                                    setPhonenumberError(newError)
                                }
                            }
                        }
                        }
                    ></Input>

                    {/* Password */}
                    <Input inputStyle={{ paddingLeft: 5, color: 'white', }} placeholder='Password' placeholderTextColor='white' leftIcon={
                        <MaterialCommunityIcons
                            name='lock-outline'
                            size={24}
                            color='#FE346E'
                        />
                    }
                        autoCapitalize='none'
                        keyboardType="default"
                        autoCorrect={false}
                        keyboardAppearance="light"
                        secureTextEntry={true}
                        returnKeyType="done"
                        onChangeText={value => setPassword(value)}
                        errorMessage={PasswordError}
                        blurOnSubmit
                        ref={(input) => (passwordInput = input)}
                        onSubmitEditing={() => {

                        }}
                        onBlur={() => {
                            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
                            if (passwordRegex.test(password)) {
                                setPasswordSyntax(true)
                                setPasswordError('')
                            } else {
                                let newError = ''
                                if (password == '') {
                                    let newError = 'Password can\'t be empty'
                                    setPasswordError(newError)
                                } else {
                                    newError = 'Password length must be 8-12 and contains at least one small letter,capital letter'
                                    setPasswordError(newError)
                                }
                            }
                        }}
                    ></Input>

                    <Button disabled={!(emailSyntax && usernameSyntax && phoneNumberSyntax && passwordSyntax)} onPress={handleSignUp} buttonStyle={{ backgroundColor: "#FE346E", paddingLeft: 20, paddingRight: 20, marginTop: 10 }} title="Register" />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                    <Text style={{ color: "white", fontSize: 17, alignSelf: 'center' }}>Already have an account?</Text>
                    <Button title='Login' type='clear' onPress={() => navigation.navigate('Login')} />
                </View>

            </View>
        </TouchableWithoutFeedback >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        backgroundColor: '#17223B',


    },
});