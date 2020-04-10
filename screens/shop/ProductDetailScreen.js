import React from 'react'
import { useSelector } from 'react-redux'
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native'

const ProductDetail = ({ navigation, route }) => {
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
		<View>
			<Text> Product Detail {product.id} </Text>
		</View>
	)
}

const styles = StyleSheet.create({})

export default ProductDetail
