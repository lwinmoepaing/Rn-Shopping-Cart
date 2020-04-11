import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList } from 'react-native'
import ProductItem from '../../components/shop/ProductItem'

// Action
import * as cartAction from '../../store/action/cart'

const ProductOverview = ({ navigation }) => {
	const products = useSelector((state) => state.products.products)

	const dispatch = useDispatch()

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
					onViewDetail={() => {
						navigation.navigate('ProductDetail', {
							id: item.id,
							title: item.title,
						})
					}}
					onAddToCart={() => {
						dispatch(cartAction.addToCart(item))
					}}
				/>
			)}
			keyExtractor={(item) => item.id}
		/>
	)
}

export default ProductOverview
