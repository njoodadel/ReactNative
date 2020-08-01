// import React, { useState } from 'react';
import { Input } from 'react-native-elements';

import React from 'react';
import { View, ActivityIndicator, StyleSheet, Keyboard, Alert, TouchableWithoutFeedback, Image, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import CameraComp from '../component/CameraComp'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)

        // Bind the this context to the handler function
        this.animatingHandlerT = this.animatingHandlerT.bind(this);
        this.animatingHandlerF = this.animatingHandlerF.bind(this);

        this.state = {
            input: "",
            animating: false,
            show: false,
            result: "",
            connection_Status: "",
            height: 0
        }
    }
    ////////////////////////////
    error = ""
    input2 = React.createRef();
    ////////////////////////////

    componentDidMount() {


        // console.log(this.state.connection_Status)
    }

    componentWillUnmount() {
    }



    static navigationOptions = {

        headerTitle: 'الرئيسية',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? '#633689' : '#633689',
            height: 100,
        },

        headerTitleStyle: {
            fontSize: 25,
        },

        headerTintColor: Platform.OS === 'android' ? 'white' : 'white',
        // headerLeft: (<View></View>),
        // headerRight: (<View></View>)
    };



    move = () => {//////////////////////////////////////////



        if (this.state.result != "") {
            this.props.navigation.navigate({
                routeName: 'Result',
                params: {
                    Name: this.state.result
                    // result: this.state.result
                }
            }

            )
        }

    }


    //////////////////////////////////////////
    render() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 0
        return (

            // <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" ? "" : "height"} keybo>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={{ height: '100%', justifyContent: "center", backgroundColor: 'white' }} >

                    <View style={{
                        flex: 2, top: 35
                    }}>

                        <Image
                            style={{
                                flex: 1,
                                width: 270,
                                height: 100, alignSelf: "center",
                                resizeMode: 'contain'
                            }}
                            source={require('../assets/wafferlylogo.png')} />
                    </View>
                    <View style={{ flex: 1, justifyContent: "space-around" }}>
                        <Input
                            ref={this.input2}
                            inputStyle={{ textAlign: 'right' }}
                            placeholder='البحث'
                            rightIcon={{ type: 'FontAwesome', name: 'search', color: 'grey' }

                            }

                            onSubmitEditing={() => {
                                // this.checkCon();
                                if (this.state.input != "") {
                                    input3 = this.state.input
                                    this.setState({ input: "" })
                                    this.props.navigation.navigate({
                                        routeName: 'Result',
                                        params: {
                                            Name: input3,
                                            result: ""
                                        }
                                    }

                                    )
                                    this.input2.current.focus()
                                    this.input2.current.clear()
                                    this.setState({ input: "" })
                                } else {
                                    // this.input2.current.shake()
                                    // this.error = "ادخل اسم النتج"
                                    Alert.alert(
                                        'لم يتم ادخال اسم منتج',
                                        'الرجاء كتابة اسم امنتج',
                                        [

                                            { text: 'حسناً' },
                                        ],
                                        { cancelable: false }
                                    );
                                }

                            }
                            }
                            // errorStyle={{ textAlign: "right", color: 'red' }}
                            // errorMessage={this.error}
                            onChangeText={(value) => this.setState({ input: value })}
                            clear
                            returnKeyType="search"

                        />
                    </View >

                    <View style={{ flexDirection: "column", alignContent: "center", flex: 3, justifyContent: "center" }}>
                        <CameraComp changeAnimatingT={this.animatingHandlerT} navig={this.props.navigation} changeAnimatingF={this.animatingHandlerF} />
                        <View style={{ flexDirection: "column", alignContent: "center", flex: 1, justifyContent: "center" }}>
                        </View>
                    </View>


                    {this.state.animating &&
                        <View style={styles.loading} >
                            <ActivityIndicator color="#7851A9" animating size='large' />
                        </View>}

                </View >
            </TouchableWithoutFeedback >
            //  </KeyboardAvoidingView > 
            // </KeyboardAvoidingView>
        );
    }
    animatingHandlerT() {
        this.setState({ animating: true });
        console.log("changing to true")
    };
    noPic() {
        this.setState({ animating: false });
        console.log("changing to true")
    };
    animatingHandlerF() {
        this.setState({ animating: false });
        console.log("changing to false")
        // console.log(xx)
        // this.setState({ result: products });
        // this.setState({ show: true });

        // this.props.navigation.navigate({
        //     routeName: 'Result',
        //     params: {
        //         result: xx
        //     }
        // }

        // )
    };
}
const styles = StyleSheet.create({

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "grey",
        opacity: 0.5
    }
})



