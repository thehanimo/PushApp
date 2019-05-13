import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {StackNavigator} from 'react-navigation';

type Props = {};
export default class Landing extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View>
        <Text> Landing Page </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
