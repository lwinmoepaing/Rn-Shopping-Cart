import React, { useState } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TextInput,
	Platform,
} from 'react-native'

// Components
import CustomHeader from '../../components/UI/HeaderButton'

const EditProductScreen = ({ navigation, route }) => {
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
						onPress={() => {}}
					/>
				</HeaderButtons>
			),
		})
	}, [navigation])

	// Props
	const productId = route.params?.productId
	const editProduct = useSelector((state) =>
		state.products.userProducts.find((product) => product.id === productId)
	)

	// State Dependencies
	const [title, setTitle] = useState(editProduct ? editProduct.title : '')
	const [imageUrl, setImageUrl] = useState(
		editProduct ? editProduct.imageUrl : ''
	)
	const [price, setPrice] = useState(editProduct ? editProduct.price : '')
	const [description, setDescription] = useState('')

	return (
		<ScrollView>
			<View style={styles.form}>
				<View style={styles.formControl}>
					<Text style={styles.label}> Title </Text>
					<TextInput
						value={title}
						onChange={(val) => setTitle(val)}
						style={styles.input}
					/>
				</View>
				<View style={styles.formControl}>
					<Text style={styles.label}> Image Url </Text>
					<TextInput
						value={imageUrl}
						onChange={(val) => setImageUrl(val)}
						style={styles.input}
					/>
				</View>
				{editProduct ? null : (
					<View style={styles.formControl}>
						<Text style={styles.label}> Price </Text>
						<TextInput
							value={price}
							onChange={(val) => setPrice(val)}
							style={styles.input}
						/>
					</View>
				)}
				<View style={styles.formControl}>
					<Text style={styles.label}> Description </Text>
					<TextInput
						value={description}
						onChange={(val) => setDescription(val)}
						style={styles.input}
					/>
				</View>
			</View>
		</ScrollView>
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
})

export default EditProductScreen
