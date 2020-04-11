import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, Image, ScrollView, StyleSheet, Button } from 'react-native'
import Color from '../../constants/Color'

// Action
import * as cartAction from '../../store/action/cart'

const ProductDetailScreen = ({ navigation, route }) => {
	const dispatch = useDispatch()
	const { id, title } = route.params
	const product = useSelector((state) =>
		state.products.availableProducts.find((product) => product.id === id)
	)

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: title ? title : 'Not Found Data',
		})
	}, [navigation])

	return (
		<ScrollView>
			<Image style={styles.image} source={{ uri: product.imageUrl }} />
			<Button
				color={Color.primary}
				title="Add to Cart"
				onPress={() => {
					dispatch(cartAction.addToCart(product))
				}}
			/>
			<Text style={styles.price}> ${product.price.toFixed(2)} </Text>
			<Text style={styles.description}> ${product.description} </Text>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 300,
	},
	price: {
		fontSize: 20,
		color: '#888888',
		textAlign: 'center',
		marginVertical: 20,
		fontFamily: 'salbo-regular',
	},
	description: {
		fontSize: 14,
		textAlign: 'center',
		marginHorizontal: 20,
		fontFamily: 'pt-sans',
	},
})

export default ProductDetailScreen
