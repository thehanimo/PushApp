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
      loading: false,
      authenticated: false,
    }
	}
  render() {
    var loader = null;
    if(this.props.navigation.getParam('accessToken', '') != '' && this.state.authenticated == false){
      this.authenticate(this.props.navigation.getParam('accessToken', ''));
    }
    if(this.state.loading) loader =  <View style={styles.LoadingOverlay}><View style={styles.Loader}></View></View>
    return (
      <Container>
        <Content style={{marginTop:100}}>
              <Text style={styles.Heading}>Join Pushstart</Text>
              <Text style={styles.MainContent}>Join the amazing community of Entrepreneurs.</Text>
              <Image source={require('../../assets/images/login1.png')} style={styles.backgroundImage}></Image>
              <TouchableOpacity style={styles.LoginButton} onPress={this.loginPress.bind(this)}>
                  <Icon type="FontAwesome" name="linkedin" style={styles.LinkedInIcon}/>
                  <Text style={styles.LoginText}>Login with Linkedin</Text>
              </TouchableOpacity>
              <View style={styles.BottomWrapper}>
                  <Text style={styles.BottomText}>By signing up you agree to our <Text style={{fontWeight:'bold'}}>Terms of Use</Text> and <Text style={{fontWeight:'bold'}}>Privacy Policy</Text></Text>
              </View>
              {loader}
        </Content>
      </Container>
    );
  }
  loginPress(){
    Linking.openURL('http://localhost:3000/auth/app/linkedin');
    this.setState({loading:true});
  }
  authenticate(accessToken){
    return fetch(`http://localhost:3000/auth/linkedin/callback/${accessToken}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }})
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({loading:false,authenticated:true})
      NavigationService.navigate('home',{displayName:responseJson.displayName})
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
