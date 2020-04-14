import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList, Button, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

// Theme
import Color from '../../constants/Color'

// Actions
import * as productActions from '../../store/action/product'

// Components
import CustomHeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'

const UserProductScreen = ({ navigation }) => {
	// Navigation Setup
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: 'Your Products',
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
						title="Menu"
						onPress={() => navigation.navigate('EditProduct')}
						iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
					/>
				</HeaderButtons>
			),
		})
	}, [navigation])

	const dispatch = useDispatch()
	const userProducts = useSelector((state) => state.products.userProducts)

	const toEditScreen = (id) => {
		navigation.navigate('EditProduct', {
			productId: id,
		})
	}

	return (
		<FlatList
			data={userProducts}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<ProductItem product={item} onSelect={() => toEditScreen(item.id)}>
					<Button
						color={Color.primary}
						title="Edit"
						onPress={() => toEditScreen(item.id)}
					/>
					<Button
						color={Color.primary}
						title="Delete"
						onPress={() => dispatch(productActions.deleteProduct(item.id))}
					/>
				</ProductItem>
			)}
		/>
	)
}

export default UserProductScreen
