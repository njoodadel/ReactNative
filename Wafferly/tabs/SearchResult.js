//https://linen-hook-253814.appspot.com/
import React, { Component } from 'react';
import { Rating } from 'react-native-elements';
import { FlatList, View, Linking, Text, TouchableOpacity, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { Html5Entities } from 'html-entities';
import HeaderButton from '../component/HeaderButtons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class HomeScreen extends Component {
  state = {
    // entities: new Html5Entities(),
    products: [],
    page: 10,
    animating: true,
    animating2: false,
    active2: false,
    width: 10,
    empty: false,
    errror: false
  }

  name = this.props.navigation.getParam('Name') //////////////// هذي اخذ الانبوت الي جان
  result = this.props.navigation.getParam('result');


  removeDuplicates = (arr, prop) => {
    var obj = {};
    for (var i = 0, len = arr.length; i < len; i++) {
      if (!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
    }
    var newArr = [];
    for (var key in obj) newArr.push(obj[key]);
    return newArr;
  }

  componentWillMount() {
    if (this.name != "") {
      this.handler();
    } else if (this.result != "") {
      this.setState({ animating: false })
      this.setState({ products: this.removeDuplicates(this.props.navigation.getParam('result'), "title") })
    } else {
      this.setState({ animating: false })
      this.setState({ empty: true })

    }

  }

  componentDidMount() {
    this.props.navigation.setParams({
      price: this.SortByPrice.bind(this), rating: this.SortByRating.bind(this),
      price2: this.SortByPrice2.bind(this), rating2: this.SortByRating2.bind(this)
    });

  }
  //////////////////// ////////////////////


  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'المنتجات',

      headerRight: () => (///////////////////////////////////////////////
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Favorite"
            iconName="sort"
            onPress={() => navigation.navigate('sort', { P: navigation.getParam('price'), R: navigation.getParam('rating'), P2: navigation.getParam('price2'), R2: navigation.getParam('rating2') })}
          />
        </HeaderButtons>
      ),///////////////////navigation.navigate({routeName:'sort'})///////////////////////////////////////////////////////////////////////

      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? '#633689' : '#633689',
        height: 100,
      }, headerTitleStyle: {
        fontSize: 25,
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
    };


  };

  SortByPrice = () => {

    const myData = this.state.products.sort((a, b) => (a.price - b.price))

    this.setState({ products: myData })


  }
  SortByPrice2 = () => {

    const myData = [].concat(this.state.products)
      .sort((a, b) => (b.price - a.price))

    this.setState({ products: myData })


  }

  SortByRating = () => {

    const myData = [].concat(this.state.products)
      .sort((a, b) => (b.rating - a.rating))

    this.setState({ products: myData })


  }
  SortByRating2 = () => {

    const myData = [].concat(this.state.products)
      .sort((a, b) => (a.rating - b.rating))

    this.setState({ products: myData })


  }

  indecc = () => {
    if (this.state.products != "") {
      return
    } else if (this.state.errror) {
      return
    } else {
      return (
        <View >

          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20
          }} >
            <ActivityIndicator size="large" color="grey" animating={this.state.animating} />
          </View>
        </View>
      )
    }
  }

  errorout = () => {
    if (this.state.errror) {
      return (<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: "20px", color: "gray", textAlign: "center" }}> لا يوجد اتصال بالانترنت</Text>
        <MaterialCommunityIcons name={"wifi-off"} size={23} color={"grey"} />
      </View>)
    }
    else return
  }
  handler = async () => {

    console.log(this.name)
    response = await fetch("https://www.wafferlyksu.com/SearchC.php", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      , body: JSON.stringify({
        keywords: this.name,
        page: this.state.page
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length === 0) {
          console.log('in if')
          // this.handler();
          if (!this.state.animating) {
            this.setState({ animating2: true })
            this.setState({ active2: false })
          }

        }
        if (responseJson.length > 0) {
          this.setState({ animating: false })
          this.setState({ active2: true })
          this.setState({ errror: false })


          this.setState({ width: 0 })
          if (this.state.animating2) {
            this.setState({ animating2: false })
            this.setState({ active2: true })


          }

          console.log('in if2')
          console.log(responseJson)
          this.setState({ page: this.state.page * 2 })
        }
        // this.setState({ products: [...this.state.products, ...responseJson] });
        this.setState({ products: this.removeDuplicates(responseJson, "title") });
      })
      .catch((error) => {
        this.setState({ errror: true })
        this.setState({ animating: false })
      });




  };
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#rgba(000, 000, 000, 0.2)",
        }}
      />
    );
  }
  loadMore = () => {
    this.setState({ animating2: true })

    this.handler();
  }
  handleLinkOpen = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: ");
      }
    });
  };

  _storeData = async (item) => {
    const exproducts = await AsyncStorage.getItem('products')
    let newProduct = JSON.parse(exproducts)
    let counter = await AsyncStorage.getItem('counter')
    counter = parseInt(counter)

    let found = false
    console.log(counter)

    if (!newProduct) {
      newProduct = []
    }
    counter = 5

    for (var i = 0; i < newProduct.length; i++) {
      if (newProduct[i].title == item.title && newProduct[i].storeName == item.storeName) {
        console.log("in if")
        let temp = newProduct[i]
        newProduct.splice(i, 1);
        newProduct.push(temp)
        found = true
        await AsyncStorage.setItem('products', JSON.stringify(newProduct))
          .then(() => {
            console.log('It was saved successfully')
          })
          .catch(() => {
            console.log('There was an error saving the product')
          })
        break
      }
    }

    if (!found) {
      if (newProduct.length == 5) {
        newProduct.splice(0, 1);
        newProduct.push(item)
      }
      else
        newProduct.push(item)
      // if (newProduct.length == 5) {
      //   counter = 0
      // }
      // newProduct[newProduct.length % counter] = item
      await AsyncStorage.setItem('products', JSON.stringify(newProduct))
      // counter++
      await AsyncStorage.setItem('counter', '' + counter)
        .then(() => {

          console.log('It was saved successfully')
        })
        .catch(() => {
          console.log('There was an error saving the product')
        })
    }

  }
  openLink = async (item) => {
    await this._storeData(item)

    newlink = item.link.replace(/;/g, "&")
    Linking.openURL(newlink.replace("/url?q=", ""))

  }

  Renderitem = (itemData) => {

    const entities = new Html5Entities();
    return <View>
      <TouchableOpacity onPress={() => this.openLink(itemData.item)}>
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
        {/* <Divider style={{ height: 2, backgroundColor: '#rgba(000, 000, 000, 0.2)' }} /> */}

      </TouchableOpacity>

    </View>
  };

  render() {
    const entities = new Html5Entities();

    return (


      <View style={{ flexDirection: 'column', flex: 1, alignItems: "stretch", backgroundColor: 'white' }}>
        {this.state.empty &&

          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: 20, color: "gray", textAlign: "center" }}> لم يتم العثور على نتائج ):</Text>
          </View>

        }
        {/* <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="grey" animating={this.state.animating} />
        </View> */}
        {this.indecc()}
        {this.errorout()}
        <FlatList style={{ marginBottom: 49 }} ItemSeparatorComponent={this.FlatListItemSeparator}
          data={this.state.products}
          keyExtractor={(x, i) => i.toString()}
          // onEndReached={this.loadMore}
          onEndReachedThreshold={0}
          renderItem={this.Renderitem}

        />
        {/* <View style={{ flex: 2, paddingBottom: 10 }}>
          <ActivityIndicator size="large" color="grey" animating={this.state.animating2} />
          {this.state.active2 && (
            <ActionButton degrees={180} radius={10} position="left" buttonColor="#7851A9" icon={<MaterialCommunityIcons name="sort" style={this.styles.actionButtonIcon} />}
              onPress={() => this.props.navigation.navigate('sort', { P: this.props.navigation.getParam('price'), R: this.props.navigation.getParam('rating'), P2: this.props.navigation.getParam('price2'), R2: this.props.navigation.getParam('rating2') })}
            >
            </ActionButton>

          )}

        </View> */}

      </View>
    );
  }
  styles = StyleSheet.create({
    text_style: {
      textAlign: 'right'
    },
    actionButtonIcon: {
      fontSize: 28,
      color: 'white',
    },
    container: {
      flexDirection: "column",
      flex: 1,
      // shadowColor: 'black',
      // shadowOffset: {width: 0, height: 2 },
      // shadowRadius: 6,
      // shadowOpacity: 0.26,
      // elevation: 8,
      //     flexDirection: 'row',
      // alignItems: 'center',
      //     flexGrow: 1,

      // backgroundColor: '#rgba(167, 113, 254, 0.7)',
      padding: 5,
      // borderTopRightRadius:10,
      // borderTopLeftRadius:10

    }

  })
};