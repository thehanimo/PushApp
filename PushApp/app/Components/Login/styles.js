import {
    StyleSheet,
    Dimensions
  } from 'react-native';
export default styles = StyleSheet.create({
	backgroundImage:{
		flex: 1,
		alignSelf: 'stretch',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').width,
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
		marginBottom: 8,
		color: '#807d83',
		fontSize: 16,
		fontFamily: 'Poppins-Light',
	},
	LoginButton: {
		flex: 1,
		flexDirection: 'row',
		alignSelf: 'center',
		marginTop: 38,
		width: 289,
		height: 45,
		elevation: 2,
		borderRadius: 8,
		// boxShadow: '0 0 12 0 rgba(134, 94, 208, 0.2)';
		backgroundColor: '#3d83d9',
		justifyContent: 'center',
		alignItems:'center',
	},
	LinkedInIcon:{
		fontSize: 30,
		textAlign: 'center',
		color: '#ffffff',
	},
	LoginText:{
		fontSize: 18,
		textAlign: 'center',
		color:'#ffffff',
		fontFamily:'Poppins-Light',
		marginLeft: 20,
		marginTop: 5,
	},
	BottomWrapper:{
		flex: 1,
		flexDirection: 'row',
		alignSelf: 'center',
		width: 180,
		height: 30,
		marginTop: 25,
	},
	BottomText:{
		color:'#707070',
		textAlign: 'center',
		fontSize: 11,
		fontFamily: 'Nexa-Light'
	}
})

