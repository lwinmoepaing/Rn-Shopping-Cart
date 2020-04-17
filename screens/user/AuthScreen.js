import React, { useReducer, useCallback, useState, useEffect } from 'react'
import {
	ScrollView,
	KeyboardAvoidingView,
	View,
	StyleSheet,
	Button,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	ActivityIndicator,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
// Theme
import Color from '../../constants/Color'
// Custom Components
import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
// Actions
import * as authActions from '../../store/action/auth'

// Reducer
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value,
		}

		const updatedValidaties = {
			...state.inputValidaties,
			[action.input]: action.isValid,
		}

		let updatedFormIsValid = true
		for (let key in updatedValidaties) {
			updatedFormIsValid = updatedValidaties[key] && updatedFormIsValid
		}

		return {
			...state,
			inputValues: updatedValues,
			inputValidaties: updatedValidaties,
			formIsValid: updatedFormIsValid,
		}
	}
}

const AuthScreen = () => {
	const dispatch = useDispatch()

	// States
	const [isLoading, setIsLoading] = useState(false)
	const [isSignUp, setIsSignUp] = useState(false)
	const [error, setError] = useState(null)

	// Form States
	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: '',
			password: '',
		},
		inputValidaties: {
			email: false,
			password: false,
		},
		formIsValid: false,
	})

	// Input change with Validaties
	const inputChangeHandler = useCallback(
		(inputIdentifier, value, isValid) => {
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				input: inputIdentifier,
				value,
				isValid,
			})
		},
		[dispatchFormState]
	)

	// On Submit
	const authHandler = useCallback(async () => {
		if (!formState.formIsValid) {
			Alert.alert('Invalid Form', 'Please Check Your Form Input.', [
				{
					text: 'Ok',
				},
			])
			return
		}
		let action
		setIsLoading(true)
		setError(null)
		if (isSignUp) {
			action = authActions.signUp(
				formState.inputValues.email,
				formState.inputValues.password
			)
		} else {
			action = authActions.login(
				formState.inputValues.email,
				formState.inputValues.password
			)
		}
		try {
			await dispatch(action)
		} catch (e) {
			setIsLoading(false)
			setError(e.message)
		}
	}, [dispatch, formState])

	// On Error show Alert
	useEffect(() => {
		if (error) {
			Alert.alert('An Error Occur', error, [{ text: 'Okay' }])
		}
	}, [error])

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<LinearGradient style={{ flex: 1 }} colors={['#FF416C', '#FF4B2B']}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={styles.screen}
				>
					<Card style={styles.authContainer}>
						<ScrollView>
							<Input
								id="email"
								label="E-mail"
								keyboardType="email-address"
								required
								email
								autoCapitalize="none"
								errorText="Please enter a valid email address"
								onInputChange={inputChangeHandler}
								initialValue=""
							/>
							<Input
								id="password"
								label="Password"
								keyboardType="default"
								secureTextEntry
								required
								minLength={5}
								autoCapitalize="none"
								errorText="Please enter a valid password "
								onInputChange={inputChangeHandler}
								initialValue=""
							/>

							<View style={styles.buttonContainer}>
								{isLoading ? (
									<ActivityIndicator size="small" color={Color.primary} />
								) : (
									<Button
										title={isSignUp ? 'Register' : 'Login'}
										color={Color.primary}
										onPress={authHandler}
									/>
								)}
							</View>
							<View style={styles.buttonContainer}>
								<Button
									title={isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
									color={Color.accent}
									onPress={() => setIsSignUp((prevState) => !prevState)}
								/>
							</View>
						</ScrollView>
					</Card>
				</KeyboardAvoidingView>
			</LinearGradient>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	authContainer: {
		width: '80%',
		maxWidth: 400,
		height: '50%',
		maxHeight: 340,
		padding: 20,
	},
	buttonContainer: {
		marginTop: 15,
	},
})

export default AuthScreen
