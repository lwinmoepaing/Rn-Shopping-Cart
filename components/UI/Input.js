import React, { useReducer, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

// SELF Reducer
const UPDATE_VALUE = 'UPDATE_VALUE'
const INPUT_BLUR = 'INPUT_BLUR'
const inputReducer = (state, action) => {
	if (action.type === UPDATE_VALUE) {
		return {
			...state,
			value: action.value,
			isValid: action.isValid,
		}
	}

	if (action.type === INPUT_BLUR) {
		return {
			...state,
			touched: true,
		}
	}

	return state
}

const Input = (props) => {
	const [inputState, inputDispatch] = useReducer(inputReducer, {
		value: props.initialValue ? props.initialValue : '',
		isValid: props.initiallyValid,
		touched: false,
	})

	const { onInputChange, id } = props

	useEffect(() => {
		if (inputState.touched) {
			onInputChange(id, inputState.value, inputState.isValid)
		}
	}, [inputState, id, onInputChange])

	const textChangeHandler = (value) => {
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		let isValid = true

		if (props.required && value.trim().length === 0) {
			isValid = false
		}
		if (props.email && !emailRegex.test(value.toLowerCase())) {
			isValid = false
		}
		if (props.min != null && +value < props.min) {
			isValid = false
		}
		if (props.max != null && +value > props.max) {
			isValid = false
		}
		if (props.minLength != null && value.length < props.minLength) {
			isValid = false
		}

		inputDispatch({
			type: UPDATE_VALUE,
			value,
			isValid,
		})
	}

	const lostFocusHandler = () => {
		inputDispatch({ type: INPUT_BLUR })
	}

	return (
		<View style={styles.formControl}>
			<Text style={styles.label}> {props.label} </Text>
			<TextInput
				{...props}
				style={styles.input}
				value={inputState.value}
				onChangeText={textChangeHandler}
				onBlur={lostFocusHandler}
			/>
			{!inputState.isValid && inputState.touched && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}> {props.errorText} </Text>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	formControl: {
		width: '100%',
	},
	label: {
		fontFamily: 'pt-sans',
		marginVertical: 8,
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
	errorContainer: {
		marginVertical: 5,
	},
	errorText: {
		fontFamily: 'pt-sans',
		color: 'red',
		fontSize: 13,
	},
})

export default Input
