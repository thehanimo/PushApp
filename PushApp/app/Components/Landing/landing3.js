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
export default class Landing extends Component<Props> {
  constructor(props){
		super(props);
		this.state = {
		}
	}
  render() {
	return (
	  <Container>
		  <Content>
				<View style={styles.MainContainer}>
					<View style={styles.ContentWrapper}>
						<Image source={require('../../assets/images/landing3.png')} style={styles.backgroundImage}></Image>
						<Text style={styles.Heading}>Archive Access</Text>
						<Text style={styles.MainContent}>Access Relevent content from our Archive anytime, anywhere</Text>
						<TouchableOpacity style={styles.MainButton} onPress={() => this.props.navigation.navigate('login')}><Icon type="MaterialIcons" name="done" style={styles.MainButtonIcon}/></TouchableOpacity>
						<View style={styles.NavButtons}>
							<TouchableOpacity style={styles.NavButtonWrapper} onPress={() => this.props.navigation.navigate('Landing1')}>
								<View style={styles.NavButton}></View>
							</TouchableOpacity>
							<TouchableOpacity style={styles.NavButtonWrapper} onPress={() => this.props.navigation.navigate('Landing2')}>
								<View style={styles.NavButton}></View>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.NavButton, styles.ActiveNavButton]}></TouchableOpacity>
						</View>
					</View>
				</View>
		  </Content>
	  </Container>
	);
  }
}