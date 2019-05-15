import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
	Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Container, Content, Header, Left, Right, Icon, Body } from 'native-base';
import NavigationService from '../../../NavigationService';
import styles from './styles';

type Props = {};
export default class Login extends Component<Props> {
  constructor(props){
		super(props);
		this.state = {
        }
	}
  render() {
    var displayName = this.props.navigation.getParam('displayName', '')
    return (
      <Container>
        <Content style={{marginTop:100}}>
              <Text style={styles.Heading}>Hi {displayName}!</Text>
              <Image source={require('../../assets/images/login1.png')} style={styles.backgroundImage}></Image>
        </Content>
      </Container>
    );
  }
}
