import {
    StyleSheet,
    Dimensions
  } from 'react-native';
export default styles = StyleSheet.create({
	backgroundImage:{
		flex: 1,
		alignSelf: 'stretch',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').width - 30,
	},
	Heading:{
		textAlign: 'left',
		marginTop: 16,
		marginLeft: 50,
		fontSize: 26,
		fontFamily: 'Poppins-Medium',
		color: '#2a3455'
	},
	MainContent:{
		textAlign: 'left',
		marginTop: 16,
		marginLeft: 50,
		marginRight: 75,
		color: '#807d83',
		fontSize: 16,
		fontFamily: 'Poppins-Light',
	},
	MainButton: {
		position: 'absolute',
		top: 550,
		left: 241,
		width: 70,
		height: 70,
		elevation: 2,
		borderRadius: 35,
		// boxShadow: '0 0 12 0 rgba(134, 94, 208, 0.2)';
		backgroundColor: '#865ed0',
		justifyContent: 'center',
	},
	MainButtonIcon:{
		fontSize: 30,
		textAlign: 'center',
		color: '#ffffff',
	},
	NavButtons:{
		flex: 1,
		flexDirection: 'row',
		position: 'absolute',
		top: 580,
		left: 51,
		width: 150,
		height: 10,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	NavButtonWrapper:{
		height:'100%',
		justifyContent: 'center',
	},
	NavButton:{
		width: 25,
		height: 4,
		borderRadius: 4,
		backgroundColor: '#CDBCEB',
		marginRight: 10,
	},
	ActiveNavButton:{
		backgroundColor: '#865ed0',
	},
	
})
