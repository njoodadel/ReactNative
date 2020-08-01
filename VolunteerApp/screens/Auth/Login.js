import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Input, Button, Text } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Firebase from '../../Config/Firebase'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function Login({ navigation }) {


    //Refs
    let emailInput = React.createRef();
    let passwordInput = React.createRef();

    //State
    // Values
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    //Error messages
    const [emailError, setEmailError] = React.useState('');
    const [PasswordError, setPasswordError] = React.useState('');

    const handleLogin = () => {

        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => navigation.navigate('App'))
            .catch(error => {
                console.log(error.code)

                if (error.code == 'auth/user-not-found') {

                    Alert.alert(
                        'Something went wrong!', 'User not found',
                        [

                            { text: 'Ok' },
                        ],
                        { cancelable: false }
                    );
                } else if (error.code == 'auth/wrong-password') {
                    Alert.alert(
                        'Something went wrong!', 'Wrong password',
                        [

                            { text: 'Ok' },
                        ],
                        { cancelable: false }
                    );
                }
            })
    }
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            {/* {console.log()} */}
            {/* <KeyboardAvoidingView behavior='padding' > */}

            <View style={styles.container}>

                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>

                    <View style={{ marginTop: 80, marginBottom: 80 }}>
                        <Image
                            source={require('../../assets/images/logoW.png')}
                            style={{ width: 120, height: 120, }} />
                        <Text h2 h2Style={{ color: '#FE346E', }}>LOGIN</Text>
                    </View>

                    {/* Email */}
                    <Input inputStyle={{ paddingLeft: 5, color: 'white', }} placeholder='Email' placeholderTextColor='white' leftIcon={
                        <MaterialCommunityIcons
                            name='email-outline'
                            size={24}
                            color='#FE346E'
                        />}
                        autoCapitalize='none'
                        keyboardType="email-address"
                        autoCorrect={false}
                        keyboardAppearance="light"
                        returnKeyType="next"
                        ref={(input) => (emailInput = input)}
                        onChangeText={value => setEmail(value)}
                        errorMessage={emailError}
                        onSubmitEditing={() => {
                            passwordInput.focus();
                        }}
                        onBlur={() => {
                            if (email == '') {
                                setEmailError('Email can\'t be empty ')
                            } else setEmailError('')
                        }
                        }
                    >
                    </Input>

                    {/* Password */}
                    <Input inputStyle={{ paddingLeft: 5, color: 'white', }} placeholder='Password' placeholderTextColor='white' leftIcon={
                        <MaterialCommunityIcons
                            name='lock-outline'
                            size={24}
                            color='#FE346E'
                        />}
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
                            if (password == '') {
                                setPasswordError('Password can\'t be empty')
                            } else setPasswordError('')
                        }}



                    >
                    </Input>

                    <Button onPress={handleLogin} buttonStyle={{ backgroundColor: "#FE346E", paddingLeft: 20, paddingRight: 20, marginTop: 10 }} title="Login" />

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                    <Text style={{ color: "white", fontSize: 17, alignSelf: 'center' }}>Don't have an account?</Text>
                    <Button title='Sign up' type='clear' onPress={() => navigation.navigate('Signup')} />
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

const mapStateToProps = (state) => {
    return {
        username: state.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
