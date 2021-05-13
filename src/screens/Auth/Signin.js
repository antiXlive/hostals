import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StatusBar, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import axiosInstance from '@helpers/axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { setUserEmail, setTempEmail, setTempPassword } from '@actions/authAction.js';
import NotifierBar from '@components/NotifierBar.component';

import { CustomButtonFilled } from '@components/CustomButton.component';
import constants from '@helpers/constants.js';
import { NetworkUtils } from '@helpers/functions.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const Signin = ({ navigation, route }) => {

	const ROLE = route.params.role;
	const passwordRef = useRef();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [notification, setNotification] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [eye, setEye] = useState(true);
	const [validation, setValidation] = useState([{ valid: null, text: null }, { valid: null, text: null }])

	const resetField = () => {
		setEmail(null);
		setPassword(null);
		setValidation([{ valid: null, text: null }, { valid: null, text: null }]);
	}

	const verifyInputs = (field, value) => {
		let validation1 = [...validation];
		switch (field) {
			case "email":
				setEmail(value);
				const normalEmailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (normalEmailValidator.test(String(value).toLowerCase())) {
					validation1[0] = 1;
					setValidation(validation1);
				}
				else {
					validation1[0] = { valid: 0, text: "Not a valid Email" };
					setValidation(validation1);
				}
				break;
			case "password":
				setPassword(value);
				if (ROLE == 1) {
					if (value.length < 5) {
						validation1[1] = { valid: 0, text: "Password can't be less than 5 characters" };
						setValidation(validation1);
					}
					else {
						validation1[1] = 1;
						setValidation(validation1);
					}
				} else {
					if (value.length < 8) {
						validation1[1] = { valid: 0, text: "Roll Number can't be less than 8 characters" };
						setValidation(validation1);
					}
					else {
						validation1[1] = 1;
						setValidation(validation1);
					}
				}
				break;
		}
	}
	const verifyEmail = () => {
		let validation1 = [...validation];
		if (email.length === 0) {
			validation1[0] = { valid: 0, text: "Email Address is required" };
			setValidation(validation1);
		}
		else if (validation[0] === 1) {
			passwordRef.current.focus()
		}
	}
	const verifyPassword = () => {
		let validation1 = [...validation];
		if (ROLE == 1) {
			if (password.length < 5) {
				validation1[1] = { valid: 0, text: "Password can't be less than 5 characters" };
				setValidation(validation1);
			}
			else {
				validation1[1] = 1;
				setValidation(validation1);
			}
		} else {
			if (password.length < 8) {
				validation1[1] = { valid: 0, text: "Roll Number can't be less than 8 characters" };
				setValidation(validation1);
			}
			else {
				validation1[1] = 1;
				setValidation(validation1);
			}
		}
	}

	const handleLogin = async () => {
		const status = await NetworkUtils.isNetworkAvailable();
		let validation1 = [...validation];
		if (validation[0] != 1 || validation[1] != 1) {
			if (email.length === 0) {
				validation1[0] = { valid: 0, text: "Email Address is required" };
			}
			if (password.length === 0) {
				if (ROLE == 1) {
					validation1[1] = { valid: 0, text: "Password is required" };
				} else {
					validation1[1] = { valid: 0, text: "Roll Number is required" };
				}
			}
			setValidation(validation1);
		}
		else {
			setLoading(true);
			if (status) {
				axiosInstance.get("/ping",)
					.then((res) => {
						const data = {
							"email": email,
							"password": password
						}
						axiosInstance.post("/auth/signin", data, {})
							.then((res) => {
								if (res.data.err) {
									resetField();
									setNotification({
										msg1: res.data.err,
										type: "error",
										endsIn: 2000
									})
									setTimeout(() => {
										setNotification(null);
										setLoading(false);
									}, 2500)
								} else {
									dispatch(setUserEmail(email))
									dispatch(setTempEmail(email))
									dispatch(setTempPassword(password))
									setNotification({
										msg1: res.data.msg,
										type: "success",
										endsIn: 2000
									})
									setTimeout(() => {
										setNotification(null);
										setLoading(false);
										navigation.push('otpVerification');
									}, 2500)
								}
							})
							.catch((err) => {
								setNotification({
									msg1: err.response.data.error,
									type: "error",
									endsIn: 3000
								})
								setTimeout(() => {
									setNotification(null);
								}, 3500)
							})
						setLoading(false);
					})
					.catch((err) => {
						setLoading(false);
						setNotification({
							msg1: "Server Unreachable",
							type: "error",
							endsIn: 3000
						})
						setTimeout(() => {
							setNotification(null);
						}, 3500)
					})
			} else {
				setLoading(false);
				setNotification({
					msg1: "No Internet Connection",
					type: "error",
					endsIn: 3000
				})
				setTimeout(() => {
					setNotification(null);
				}, 3500)
			}
		}
	}
	const resetHandler = () => {
		navigation.navigate('forgotPassword');
	}


	return (
		<>
			{
				loading
					? (
						<View style={{ position: 'absolute', top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', height: HEIGHT, width: WIDTH, backgroundColor: '#00000030', zIndex: 100 }}>
							<ActivityIndicator size="large" color={constants.M1} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }} />
						</View>

					)
					: null
			}
			{
				notification
					? (
						<NotifierBar msg1={notification.msg1} type={notification.type} endsIn={notification.endsIn} />
					)
					: null
			}

			<StatusBar backgroundColor={constants.M1} />
			<View style={{ height: HEIGHT, backgroundColor: '#FFF' }}>
				<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-55}>
					<View style={styles.curvedBox}>
						<Text style={{ fontWeight: '500', color: 'white', textAlign: 'center', width: constants.WIDTH, fontSize: 20, transform: [{ rotate: '-4deg' }] }}>Sign In | {ROLE == 1 ? 'Admin' : 'Student'}</Text>
						<Text style={{ letterSpacing: WIDTH * 0.002, fontFamily: 'roboto', fontWeight: '600', color: 'white', position: 'absolute', left: 50, bottom: 70, fontSize: 26, transform: [{ rotate: '-4deg' }] }}>Welcome</Text>
						<Text style={{ letterSpacing: WIDTH * 0.002, fontFamily: 'roboto', fontWeight: '600', color: 'white', position: 'absolute', left: 53, bottom: 35, fontSize: 26, transform: [{ rotate: '-4deg' }] }}>Back</Text>
					</View>

					<View style={{ height: HEIGHT * 0.45, marginTop: HEIGHT * 0.03 }}>
						<View style={{ position: 'relative' }}>
							<Text
								style={[styles.label, validation[0].valid === 0 ? styles.errorLabel : null]}
							>
								Email Addresss
						</Text>
							<View style={[styles.textInput, validation[0].valid === 0 ? styles.errorInput : null, validation[0] === 1 ? styles.successInput : null, { flexDirection: 'row' }]} >
								<MaterialCommunityIcons name="email-outline" size={20} style={{ alignSelf: 'center', width: '8%' }} />
								<TextInput
									value={email}
									autoCorrect={false}
									style={{ width: '84%' }}
									placeholder='andrew@ng.com'
									placeholderTextColor='#00000040'
									onSubmitEditing={() => verifyEmail()}
									onChangeText={(text) => verifyInputs("email", text)}
								/>
							</View>
							{
								validation[0].valid === 0
									?
									(
										<Text style={{ color: 'red', fontSize: 11, position: 'absolute', right: '10%', bottom: '10%', opacity: 0.7 }}>{validation[0].text}</Text>
									)
									:
									null
							}
						</View>

						<View style={{ position: 'relative' }}>
							<Text
								style={[styles.label, validation[1].valid === 0 ? styles.errorLabel : null]}
							>
								{ROLE == 1 ? 'Password' : 'Roll Number'}
							</Text>
							<View style={[styles.textInput, validation[1].valid === 0 ? styles.errorInput : null, validation[1] === 1 ? styles.successInput : null, { flexDirection: 'row' }]}>
								<Octicons name="lock" size={18} style={{ alignSelf: 'center', width: '8%' }} />
								<TextInput
									value={password}
									style={{ width: '82%' }}
									secureTextEntry={ROLE == 1 ? eye : false}
									autoCorrect={false}
									placeholder={ROLE == 1 ? '******' : '18010107'}
									placeholderTextColor='#00000040'
									ref={passwordRef}
									onChangeText={(text) => verifyInputs("password", text)}
									onSubmitEditing={() => verifyPassword()}
								/>
								{
									ROLE == 1 ? (
										<TouchableOpacity style={{ alignSelf: 'center', height: HEIGHT * 0.07, width: WIDTH * 0.08, justifyContent: 'center' }} onPress={() => setEye(!eye)}>
											<MaterialCommunityIcons name={eye ? "eye-outline" : "eye-off-outline"} size={20} style={{ color: '#000' }} />
										</TouchableOpacity>
									) : null
								}
							</View>
							{
								validation[1].valid === 0
									?
									(
										<Text style={{ color: 'red', fontSize: 11, position: 'absolute', right: '10%', bottom: '10%', opacity: 0.7 }}>{validation[1].text}</Text>
									)
									:
									null
							}
						</View>
					</View>
				</KeyboardAvoidingView>
				<View style={{ height: HEIGHT * 0.1, position: 'absolute', width: WIDTH, bottom: 0, justifyContent: 'space-between' }}>
					<CustomButtonFilled label="SIGN IN" click={handleLogin} style={{ width: WIDTH * 0.7, bottom: 10 }} />
				</View>
			</View>
		</>

	)
}

const styles = StyleSheet.create({
	curvedBox: {
		width: WIDTH + 20,
		height: HEIGHT * 0.33,
		backgroundColor: constants.M1,
		paddingTop: 25,
		position: 'relative',
		right: 10,
		top: -15,
		borderBottomLeftRadius: 80,
		borderBottomRightRadius: 55,
		transform: [{ rotate: '4deg' }],
		marginBottom: HEIGHT * 0.02
	},
	textInput: {
		backgroundColor: '#00000010',
		borderRadius: 10,
		width: WIDTH * 0.85,
		marginBottom: 30,
		alignSelf: 'center',
		paddingLeft: 10
	},
	textInput2: {
		height: 200
	},
	label: {
		alignSelf: 'center',
		paddingBottom: 5,
		width: WIDTH * 0.85,
		fontSize: 16,
		opacity: 0.5,
		color: 'black'
	},
	errorLabel: {
		// color:'#FF0000',
		// opacity:1,
	},
	errorInput: {
		borderColor: '#ff0000',
		borderBottomWidth: 2
		// borderWidth:1
	},
	successInput: {
		borderColor: '#71E753',
		borderBottomWidth: 2,
		// borderWidth:1
	}
});

export default Signin;