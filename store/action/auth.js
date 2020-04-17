import { AsyncStorage } from 'react-native'
import { errorMessageHandler } from '../../utils/errorHandler'

export const AUTHENTICATE = 'AUTHENTICATE'

const url = 'https://identitytoolkit.googleapis.com/v1/accounts'

export const authenticate = (userId, token) => {
	return { type: AUTHENTICATE, userId, token }
}

export const signUp = (email, password) => {
	return async (dispatch) => {
		try {
			const key = 'AIzaSyCPKAe20g6zQ4AbaPu7YSVUcdzQLi0MEGY'
			const response = await fetch(`${url}:signUp?key=${key}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
					returnSecureToken: true,
				}),
			})

			if (!response.ok) {
				const errorResponse = await response.json()
				const message = errorMessageHandler(errorResponse)
				throw new Error(message)
			}

			const resData = await response.json()

			dispatch(authenticate(resData.localId, resData.idToken))

			const expiredMilliSecond =
				new Date().getTime() + parseInt(resData.expiresIn) * 1000
			const expirationDate = new Date(expiredMilliSecond)

			saveDataToStorage(resData.idToken, resData.localId, expirationDate)
		} catch (e) {
			throw e
		}
	}
}

export const login = (email, password) => {
	return async (dispatch) => {
		try {
			const key = 'AIzaSyCPKAe20g6zQ4AbaPu7YSVUcdzQLi0MEGY'
			const response = await fetch(`${url}:signInWithPassword?key=${key}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
					returnSecureToken: true,
				}),
			})

			if (!response.ok) {
				const errorResponse = await response.json()
				const message = errorMessageHandler(errorResponse)
				throw new Error(message)
			}

			const resData = await response.json()

			dispatch(authenticate(resData.localId, resData.idToken))

			const expiredMilliSecond =
				new Date().getTime() + parseInt(resData.expiresIn) * 1000
			const expirationDate = new Date(expiredMilliSecond)

			saveDataToStorage(resData.idToken, resData.localId, expirationDate)
		} catch (e) {
			throw e
		}
	}
}

const saveDataToStorage = (token, userId, expiryDate) => {
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			token,
			userId,
			expiryDate,
		})
	)
}
