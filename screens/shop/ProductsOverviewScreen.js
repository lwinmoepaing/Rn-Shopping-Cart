import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	FlatList,
	Platform,
	Button,
	View,
	ActivityIndicator,
	StyleSheet,
	Text,
	RefreshControl,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

// Theme
import Color from '../../constants/Color'

// Components
import ProductItem from '../../components/shop/ProductItem'
import CustomHeaderButton from '../../components/UI/HeaderButton'

// Action
import * as cartAction from '../../store/action/cart'
import * as productActions from '../../store/action/product'

const ProductOverviewScreen = ({ navigation }) => {
	const [isLoading, setLoading] = useState(true)
	const [isError, setError] = useState(null)

	const products = useSelector((state) => state.products.availableProducts)

	const dispatch = useDispatch()

	const loadProduct = useCallback(async () => {
		setLoading(true)
		setError(null)
		try {
			await dispatch(productActions.setProduct())
		} catch (e) {
			setError(e.message)
		}
		setLoading(false)
	}, [dispatch, setLoading, setError])

	// WillFocus
	useEffect(() => {
		const willFocus = navigation.addListener('focus', loadProduct)
		return () => {
			willFocus.remove()
		}
	}, [navigation, loadProduct])

	// Initial Fetching
	useEffect(() => {
		loadProduct()
		console.log('Loading')
	}, [dispatch, loadProduct])

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

	const onViewDetail = (item) => {
		navigation.navigate('ProductDetail', {
			id: item.id,
			title: item.title,
		})
	}

	// if (isLoading) {
	// 	return (
	// 		<View style={styles.centered}>
	// 			<ActivityIndicator size="large" color={Color.primary} />
	// 		</View>
	// 	)
	// }

	if (isError) {
		return (
			<View style={styles.centered}>
				<Text> Something Wrong Bro </Text>
				<Button title="Try Again" onPress={loadProduct} color={Color.primary} />
			</View>
		)
	}

	if (!isLoading && products.length === 0) {
		return (
			<View style={styles.centered}>
				<Text> No Products Found. </Text>
			</View>
		)
	}

	return (
		<FlatList
			data={products}
			refreshControl={
				<RefreshControl
					refreshing={isLoading}
					onRefresh={loadProduct}
				></RefreshControl>
			}
			renderItem={({ item }) => (
				<ProductItem product={item} onSelect={() => onViewDetail(item)}>
					<Button
						color={Color.primary}
						title="View Detail"
						onPress={() => onViewDetail(item)}
					/>
					<Button
						color={Color.primary}
						title="To Cart"
						onPress={() => {
							dispatch(cartAction.addToCart(item))
						}}
					/>
				</ProductItem>
			)}
			keyExtractor={(item) => item.id}
		/>
	)
}

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default ProductOverviewScreen
