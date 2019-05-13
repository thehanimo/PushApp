import React, {Component} from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Landing from './App/Components/Landing/landing'

const RootStack = createStackNavigator(
  {
    Landing: {screen:Landing},
  },
  {
    navigationOptions: {header:false},
  }
)

const Application = createAppContainer(RootStack);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Application />
    );
  }
}
