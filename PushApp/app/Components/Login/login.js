import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
	Image,
	TouchableOpacity,
  Dimensions
} from 'react-native';
import { Container, Content, Header, Left, Right, Icon, Body } from 'native-base';
import styles from './styles';

type Props = {};
export default class Login extends Component<Props> {
  constructor(props){
		super(props);
		this.state = {
		}
	}
	MainButtonPress(){
	}
  render() {
	return (
	  <Container style={{marginTop:100}}>
		  <Content>
            <Text style={styles.Heading}>Join Pushstart</Text>
            <Text style={styles.MainContent}>Join the amazing community of Entrepreneurs.</Text>
            <Image source={require('../../assets/images/login1.png')} style={styles.backgroundImage}></Image>
            <TouchableOpacity style={styles.LoginButton}>
                <Icon type="FontAwesome" name="linkedin" style={styles.LinkedInIcon}/>
                <Text style={styles.LoginText}>Login with Linkedin</Text>
            </TouchableOpacity>
            <View style={styles.BottomWrapper}>
                <Text style={styles.BottomText}>By signing up you agree to our <Text style={{fontWeight:'bold'}}>Terms of Use</Text> and <Text style={{fontWeight:'bold'}}>Privacy Policy</Text></Text>
            </View>
		  </Content>
	  </Container>
	);
  }
}
