import { errorMessageHandler } from '../../utils/errorHandler'

export const SIGN_UP = 'SIGN_UP'
export const SIGN_IN = 'SIGN_IN'

const url = 'https://identitytoolkit.googleapis.com/v1/accounts'

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

			dispatch({
				type: SIGN_UP,
				token: resData.idToken,
				userId: resData.localId,
			})
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

			dispatch({
				type: SIGN_IN,
				token: resData.idToken,
				userId: resData.localId,
			})
		} catch (e) {
			throw e
		}
	}
}
