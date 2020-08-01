import React from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-circular-action-menu';
import firebase from "../firebase";
import uuid from 'uuid';


export default class CameraComp extends React.Component {
    state = {
        uploading: true,
        image: "",
        animating: false,
        products: []
    }

    // const [tooltip, setTooltip] = useState(true);
    // const [uploading, setUploading] = useState(true);
    // const [image, setImage] = useState("");
    // const [animating, setaAimating] = useState(false);
    verifyPermissionsCamera = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };


    verifyPermissionsCameraRoll = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };
    takeImage = async () => {
        const hasPermission = await this.verifyPermissionsCamera();
        if (!hasPermission) {
            return;
        }
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
        });

        this._handleImagePicked(pickerResult);

    };



    openCameraRoll = async () => {
        const hasPermission = await this.verifyPermissionsCameraRoll();
        if (!hasPermission) {
            return;
        }
        // let pickerResult = await ImagePicker.launchImageLibraryAsync();
        // this._handleImagePicked(pickerResult);
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });
        this._handleImagePicked(pickerResult);

    };

    _handleImagePicked = async pickerResult => {
        try {
            console.log("take")
            // this.setState({ animating: true })
            // setaAimating(true)
            this.props.changeAnimatingT()
            this.setState({ uploading: true })
            // setUploading(true);
            if (!pickerResult.cancelled) {
                const uploadUrl = await this.uploadImageAsync(pickerResult.uri);
                console.log(uploadUrl)
                // setImage(uploadUrl);
                this.setState({ image: uploadUrl })
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            // setUploading(false);
            this.props.changeAnimatingF()
            this.setState({ uploading: false })

        }

    };




    async  uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            // xhr.onerror = function (e) {
            //     console.log(e);
            //     reject(new TypeError('Network request failed'));
            // };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        const ref = firebase
            .storage()
            .ref()
            .child(uuid.v4());
        const snapshot = await ref.put(blob);
        await fetch("https://www.wafferlyksu.com/SearchByImagec.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            , body: JSON.stringify({
                Uri: ref.name
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                // setaAimating(false)

                // if (responseJson != null) {

                //   }
                // }

                console.log("done")

                this.setState({ products: responseJson })
                console.log(this.state.products)
                this.props.navig.navigate({
                    routeName: 'Result',
                    params: {
                        result: responseJson,
                        Name: "",

                    }
                }

                )
            })


        // We're done with the blob, close and release it
        blob.close();

        // this.props.changeAnimatingF("hiiiiiiiii")

        return await snapshot.ref.getDownloadURL();

    }
    render() {
        return (
            // <View style={styles.containerButtons} >
            <View style={{ flex: 1 }}>
                <ActionButton degrees={360} btnOutRange="black" radius={100} position="center" buttonColor="#633689" icon={<Image
                    style={{ width: 40, height: 40 }}
                    source={require('./icon.png')}
                />}  >

                    <ActionButton.Item size={40} buttonColor='#633689' title="التقاط صورة" onPress={this.takeImage}>
                        <Icon name="camera" style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                    <ActionButton.Item buttonColor='#633689' size={40} title="استعراض الالبوم" onPress={this.openCameraRoll}>
                        <Icon name="image" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
                {/* {true &&
                <View style={styles.loading}>
                    <ActivityIndicator color="grey" animating size='large' />
                </View>} */}
            </View >
        );
    }
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
        backgroundColor: "black",
        // opacity: 0.6,
        flex: 1
    },
    containerButtons: {
        flexDirection: 'row',
        flex: 1,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 0,
        backgroundColor: '#rgba(167, 113, 254, 0.7)',
        padding: 20,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,

    },
    Buttonview: {
        flex: 1, alignItems: "center", justifyContent: "center", shadowColor: 'black',
        borderRightWidth: 3, borderRightColor: "rgba(242, 248, 253, 0.5)"
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    }
});

