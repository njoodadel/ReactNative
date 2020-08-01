import React, { Component } from 'react';

import { Container, Header, Content, ListItem, Text, Body, View } from 'native-base';




export default class SorbytScreen extends Component {

  state = {
    one: false,
    two: false,
    s: "p"
  }
  static navigationOptions = {//////////////// ذي تعدل الهدر

    headerTitle: 'التصنيف',
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? '#633689' : '#633689',
      height: 100,
    }, headerTitleStyle: {
      fontSize: 25,
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
  };
  render() {


    return (
      <Container>

        <Content style={{ marginTop: '2%' }}>

          <ListItem value="P" onPress={() => {
            const { navigation } = this.props;
            navigation.goBack();
            navigation.state.params.P();
          }}>
            <Body >
              <Text style={{ textAlign: 'right' }}>التصنيف من الاقل للاعلى سعراً</Text>

              {/* <MaterialCommunityIcons name="sort-ascending" ></MaterialCommunityIcons> */}
            </Body>

            {/* <CheckBox checked={this.state.one} value="P" onPress={this.onepressed} /> */}
          </ListItem>
          <ListItem value="P" onPress={() => {
            const { navigation } = this.props;
            navigation.goBack();
            navigation.state.params.P2();
          }}>
            <Body>
              <Text style={{ textAlign: 'right' }}>التصنيف من الاعلى للاقل سعراً</Text>
            </Body>

            {/* <CheckBox checked={this.state.one} value="P" onPress={this.onepressed} /> */}
          </ListItem>

          <ListItem onPress={() => {
            const { navigation } = this.props;
            navigation.goBack();
            navigation.state.params.R2();
          }}>
            <Body>
              <Text value="D" style={{ textAlign: 'right' }}>التصنيف من الاقل للاعلى تقييمًا</Text>
            </Body>
            {/* <CheckBox checked={this.state.two} onPress={this.twopressed} /> */}
          </ListItem>
          <ListItem onPress={() => {
            const { navigation } = this.props;
            navigation.goBack();
            navigation.state.params.R();
          }}>
            <Body>
              <Text value="D" style={{ textAlign: 'right' }}>التصنيف من الاعلى للاقل تقييمًا </Text>
            </Body>
            {/* <CheckBox checked={this.state.two} onPress={this.twopressed} /> */}
          </ListItem>
          <View>
            {/* <Button onPress={()=>alert(this.state.s)} buttonStyle={{marginRight:'10%',marginLeft:'29%',marginBottom:'-5%', marginTop:'6%',backgroundColor:'#7851A9',borderRadius:5,width:'40%'}} title="تم التحديد"/> */}
          </View>
        </Content>
      </Container>
    );
  }
}