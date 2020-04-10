import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text, FlatList } from 'react-native'

const TitleText = ({ item }) => <Text> {item.title} </Text>

const ProductOverview = ({ navigation }) => {
	const products = useSelector((state) => state.products.products)
	// console.log('Products', products)

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: 'All Products',
		})
	}, [navigation])

	return (
		<FlatList
			data={products}
			renderItem={TitleText}
			keyExtractor={(item) => item.id}
		/>
	)
}

export default ProductOverview
