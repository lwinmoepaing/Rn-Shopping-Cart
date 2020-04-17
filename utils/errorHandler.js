export const errorMessageHandler = (errResData) => {
	switch (errResData.error.message) {
		case 'EMAIL_EXISTS':
			return 'This email exists already.'
		case 'EMAIL_NOT_FOUND':
			return 'This email could not be found.'
		case 'INVALID_PASSWORD':
			return 'This password is not valid.'
		default:
			return 'Something went wrong'
	}
}
