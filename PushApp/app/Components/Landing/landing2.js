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
export default class Landing2 extends Component<Props> {
  constructor(props){
		super(props);
		this.state = {
		}
	}
  render() {
	return (
	  <Container style={{marginTop:100}}>
		  <Content>
				<Image source={require('../../assets/images/landing2.png')} style={styles.backgroundImage}></Image>
				<Text style={styles.Heading}>Get Relevent Content</Text>
				<Text style={styles.MainContent}>Get notified about relevant content from Pushstart anytime, anywhere</Text>
				<TouchableOpacity style={styles.MainButton} onPress={() => this.props.navigation.navigate('Landing3')}><Icon type="MaterialIcons" name="chevron-right" style={styles.MainButtonIcon}/></TouchableOpacity>
				<View style={styles.NavButtons}>
					<TouchableOpacity style={styles.NavButton} onPress={() => this.props.navigation.navigate('Landing1')}></TouchableOpacity>
					<TouchableOpacity style={[styles.NavButton, styles.ActiveNavButton]}></TouchableOpacity>
					<TouchableOpacity style={styles.NavButton} onPress={() => this.props.navigation.navigate('Landing3')}></TouchableOpacity>
				</View>
		  </Content>
	  </Container>
	);
  }
}