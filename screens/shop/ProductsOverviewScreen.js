import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

// Components
import ProductItem from '../../components/shop/ProductItem'
import CustomHeaderButton from '../../components/UI/HeaderButton'

// Action
import * as cartAction from '../../store/action/cart'

const ProductOverviewScreen = ({ navigation }) => {
	const products = useSelector((state) => state.products.products)

	const dispatch = useDispatch()

	// Navigation Setup
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: 'All Products',
			headerLeft: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title="Menu"
						onPress={() => navigation.toggleDrawer()}
						iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					/>
				</HeaderButtons>
			),
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title="Cart"
						onPress={() => navigation.navigate('Cart')}
						iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
					/>
				</HeaderButtons>
			),
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

export default ProductOverviewScreen
