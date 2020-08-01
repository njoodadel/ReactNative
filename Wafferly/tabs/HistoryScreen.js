import React from 'react';
import { Divider, Rating } from 'react-native-elements';
import { FlatList, View, Linking, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Html5Entities } from 'html-entities';
import { AsyncStorage } from 'react-native';

export default class HistoryScreen extends React.Component {

    state = {
        // entities: new Html5Entities(),
        products: [],
        refresh: Date(Date.now()).toString(),
    }

    componentWillMount() {
        this.handler();
        // AsyncStorage.clear();

    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', (playload) => {
            this.handler();
            // AsyncStorage.clear();

        });

    }
    handler = async () => {
        const exproducts = await AsyncStorage.getItem('products')
        let newProduct = JSON.parse(exproducts)
        if (newProduct) {
            this.setState({ products: newProduct.reverse() })
        }
    }

    clear() {
        AsyncStorage.clear()
        console.log("in clear")
        this.setState({ lastRefresh: Date(Date.now()).toString() })
    }

    Renderitem = (itemData) => {

        const entities = new Html5Entities();
        return <TouchableOpacity onPress={() => { Linking.openURL(itemData.item.link.replace(/;/g, "&")) }}>
            <View style={this.styles.container} >
                <View style={{ textAlign: 'right', flexDirection: 'row-reverse', flex: 1 }}>
                    <Image style={{ width: 100, height: 100, resizeMode: 'contain' }} source={{ uri: itemData.item.image }} />
                    <View style={{ flexGrow: 1, }}>
                        <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'stretch' }} >
                            <Text style={{ padding: 5, flexGrow: 1, flex: 1, textAlign: 'right' }}>{entities.decode(itemData.item.title)}</Text>
                        </View>
                        <View style={{ alignItems: 'stretch', flexDirection: 'row-reverse' }}>
                            <Text style={{ color: 'grey' }}> متوفر في:</Text>
                            <Text style={{ color: 'grey' }}>{entities.decode(itemData.item.storeName)}</Text>
                        </View>
                    </View>
                </View>



                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View  >
                        <Text >{entities.decode(itemData.item.price) + " SAR"}</Text>
                    </View>
                    <View style={{ justifyContent: 'space-evenly' }}>
                        {/* <View style={{ alignItems: 'stretch', flexDirection: 'row-reverse', paddingTop: 10 }}>
                  <Text> متوفر في:</Text>
                  <Text>{entities.decode(itemData.item.storeName)}</Text>
    
                </View> */}
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Rating
                        style={{}}
                        imageSize={15}
                        readonly
                        startingValue={parseFloat(itemData.item.rating)}
                    />
                    <Text style={{ color: 'grey', fontSize: 11 }}>{"(" + itemData.item.reviews + ")"}</Text>

                </View>

            </View>
            <Divider style={{ height: 2, backgroundColor: '#rgba(000, 000, 000, 0.2)' }} />
        </TouchableOpacity>
    };


    static navigationOptions = {

        headerTitle: 'السجل',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? '#633689' : '#633689',
            height: 100,
        }, headerTitleStyle: {
            fontSize: 25,
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
    };


    render() {

        if (this.state.products.length == 0) {
            console.log("empty")

            return (
                <View style={{ flexDirection: 'column', flex: 1, alignItems: "stretch", backgroundColor: 'white' }}>

                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: 20, color: "gray", textAlign: "center" }}>لم تقم بزيارة منتج بعد</Text>
                    </View>
                    {/* <ActionButton degrees={180} radius={75} position="left" buttonColor="#7851A9" icon={<MaterialCommunityIcons name="delete" style={this.styles.actionButtonIcon} />}
                        onPress={() => this.clear}
                    >
                    </ActionButton> */}

                </View>
            )
        } else {
            console.log("not empty")

            return (

                <View style={{ flexDirection: 'column', flex: 1, alignItems: "stretch", backgroundColor: 'white' }}>


                    <FlatList
                        style={{ marginBottom: 49 }}
                        data={this.state.products}
                        keyExtractor={(x, i) => i.toString()}
                        // onEndReached={this.loadMore}
                        onEndReachedThreshold={0}
                        renderItem={this.Renderitem}

                    />
                    {/* <ActionButton degrees={180} radius={75} position="left" buttonColor="#7851A9" icon={<MaterialCommunityIcons name="delete" style={this.styles.actionButtonIcon} />}
                        onPress={() => this.clear}
                    >
                    </ActionButton> */}
                </View>
            );
        }
    }

    styles = StyleSheet.create({
        text_style: {
            textAlign: 'right'
        },
        container: {
            flexDirection: "column",
            flex: 1,
            padding: 5,
        },
        actionButtonIcon: {
            fontSize: 20,
            height: 22,
            color: 'white',
        }

    })
};

