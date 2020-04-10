import React from 'react'
import { useSelector } from 'react-redux'
import { FlatList } from 'react-native'
import ProductItem from '../../components/shop/ProductItem'

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
			renderItem={({ item }) => (
				<ProductItem
					product={item}
					onViewDetail={() => {}}
					onAddToCart={() => {}}
				/>
			)}
			keyExtractor={(item) => item.id}
		/>
	)
}

export default ProductOverview
