import React, { useState, useReducer } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'
import {
	View,
	StyleSheet,
	ScrollView,
	Platform,
	Alert,
	KeyboardAvoidingView,
	Button,
} from 'react-native'

// Actions
import * as productActions from '../../store/action/product'

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
		for (const key in updatedValidaties) {
			updatedFormIsValid = updatedFormIsValid && updatedValidaties[key]
		}

		return {
			...state,
			inputValues: updatedValues,
			inputValidaties: updatedValidaties,
			formIsValid: updatedFormIsValid,
		}
	}

	return state
}

// Components
import CustomHeader from '../../components/UI/HeaderButton'
import Input from '../../components/UI/Input'

const EditProductScreen = ({ navigation, route }) => {
	// Initial
	const dispatch = useDispatch()

	// Props
	const productId = route.params?.productId
	const editProduct = useSelector((state) =>
		state.products.userProducts.find((product) => product.id === productId)
	)

	// State Reducer
	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			title: editProduct ? editProduct.title : '',
			price: editProduct ? editProduct.price : '',
			imageUrl: editProduct ? editProduct.imageUrl : '',
			description: editProduct ? editProduct.description : '',
		},
		inputValidaties: {
			title: editProduct ? true : false,
			price: editProduct ? true : false,
			imageUrl: editProduct ? true : false,
			description: editProduct ? true : false,
		},
		formIsValid: editProduct ? true : false,
	})

	// Validator
	const titleChangeHandler = React.useCallback(
		(inputIdentifier, val, isValid) => {
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				input: inputIdentifier,
				value: val,
				isValid,
			})
		},
		[dispatchFormState]
	)

	// New Create Product / Edit Existing Product
	const submitHandler = React.useCallback(() => {
		if (!formState.formIsValid) {
			Alert.alert('Invalid Form', 'Please Check Your Form Input.', [
				{
					text: 'Ok',
				},
			])
			return
		}

		if (editProduct) {
			dispatch(
				productActions.updateProduct(
					productId,
					formState.inputValues.title,
					formState.inputValues.description,
					formState.inputValues.imageUrl
				)
			)
		} else {
			dispatch(
				productActions.createProduct(
					formState.inputValues.title,
					formState.inputValues.description,
					formState.inputValues.imageUrl,
					+formState.inputValues.price
				)
			)
		}

		navigation.goBack()
	}, [productId, dispatch, formState])

	// Set Navigation
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: 'Edit Product',
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeader}>
					<Item
						title="CheckMark"
						iconName={
							Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
						}
						onPress={submitHandler}
					/>
				</HeaderButtons>
			),
		})
	}, [navigation, productId, dispatch, formState])

	return (
		<KeyboardAvoidingView style={styles.form}>
			<ScrollView>
				<Input
					label="Title"
					keyboardType="default"
					autoCapitalize="sentences"
					autoCorrect
					returnKeyType="next"
					id="title"
					errorText="Please enter a valid title"
					initialValue={formState.inputValues.title}
					initiallyValid={!!editProduct}
					onInputChange={titleChangeHandler}
					required
				/>

				<Input
					label="Image Url"
					keyboardType="default"
					autoCapitalize="sentences"
					autoCorrect
					returnKeyType="next"
					errorText="Please enter a valid Image Url"
					id="imageUrl"
					initialValue={formState.inputValues.imageUrl}
					initiallyValid={!!editProduct}
					onInputChange={titleChangeHandler}
					required
				/>

				{editProduct ? null : (
					<Input
						label="Price"
						keyboardType="decimal-pad"
						autoCapitalize="sentences"
						returnKeyType="next"
						id="price"
						errorText="Please enter a valid price"
						initialValue={formState.inputValues.price}
						initiallyValid={!!editProduct}
						onInputChange={titleChangeHandler}
						required
						min={0.1}
					/>
				)}

				<Input
					label="Description"
					keyboardType="default"
					autoCapitalize="sentences"
					autoCorrect
					id="description"
					errorText="Please enter a valid description"
					initialValue={formState.inputValues.description}
					initiallyValid={!!editProduct}
					onInputChange={titleChangeHandler}
					multiline
					numberOfLines={3}
					required
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
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
	flex: {
		flex: 1,
	},
})

export default EditProductScreen
