import {
    StyleSheet,
		Dimensions,
		Platform
  } from 'react-native';
export default styles = StyleSheet.create({
	MainContainer:{
		flex:1,
		flexDirection:'column',
		justifyContent:'center',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height - 24,
	},
	ContentWrapper:{
		width:'100%',
		height:670,
	},
	backgroundImage:{
		zIndex:-1,
		marginTop: Platform.OS == 'ios'? 0: -40,
		width: '100%',
		height: Platform.OS == 'ios'? '60%':'65%',
		alignSelf:'stretch',
	},
	Heading:{
		textAlign: 'left',
		marginTop: 50,
		marginLeft: 50,
		fontSize: 26,
		fontFamily: 'Poppins-Medium',
		color: '#2a3455'
	},
	MainContent:{
		textAlign: 'left',
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
		position:'absolute',
		bottom: '10%',
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
		position:'absolute',
		bottom: '2%',
		width: 180,
		height: 30,
		marginTop: 25,
	},
	BottomText:{
		color:'#707070',
		textAlign: 'center',
		fontSize: 11,
		fontFamily: 'Nexa-Light'
	},
	LoadingOverlay:{
		position:'absolute',
		top:0,
		left:0,
		height:'100%',
		width:'100%',
		backgroundColor:'#ffffff',
		opacity:0.925,
		justifyContent:'center',
		alignItems:'center',
		elevation: 3,
	},
	Loader:{
		width:138,
		height:138,
		borderStyle: 'solid',
		borderColor:'#3d83d9',
		borderWidth:3,
		borderRadius:69,
	}
})

