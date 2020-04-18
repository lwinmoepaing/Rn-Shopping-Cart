import React, { useEffect } from 'react'
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	AsyncStorage,
} from 'react-native'
import { useDispatch } from 'react-redux'
// Theme
import Color from '../constants/Color'
// Actions
import * as authActions from '../store/action/auth'

const StartupScreen = ({ setIsStartUp }) => {
	// Dispatch
	const dispatch = useDispatch()

	useEffect(() => {
		const tryLogin = async () => {
			const userData = await AsyncStorage.getItem('userData')
			if (!userData) {
				setIsStartUp(false)
				return
			}

			const transformData = JSON.parse(userData)
			const { token, userId, expiryDate } = transformData
			const expirationDate = new Date(expiryDate)

			if (expirationDate <= new Date() || !token || !userId) {
				setIsStartUp(false)
				return
			}

			const expirationTime = expirationDate.getTime() - new Date().getTime()

			dispatch(authActions.authenticate(userId, token, expirationTime))
			setIsStartUp(false)
		}

		tryLogin()
	}, [])

	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color={Color.primary} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default StartupScreen
